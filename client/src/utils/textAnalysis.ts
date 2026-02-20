import { STOP_WORDS, FILTER_WORDS, ADVERB_EXCLUSIONS, IRREGULAR_PAST_PARTICIPLES, PASSIVE_EXCLUSIONS } from './wordLists'

export interface WordCount {
  word: string
  count: number
}

function countWords(text: string, include: (word: string) => boolean): WordCount[] {
  // Normalize helps so that we can appropriately process Google Doc text
  const normalized = text.toLowerCase().replace(/[\u2018\u2019]/g, "'")
  const tokens = normalized.match(/[a-z']+/g) ?? []

  const counts = new Map<string, number>()
  for (const raw of tokens) {
    const word = raw.replace(/^'+|'+$/g, '')
    if (!include(word)) continue
    counts.set(word, (counts.get(word) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 30)
}

export function extractWordFrequency(text: string): WordCount[] {
  // This word.length >= 1 predicate guards against theoretical words made of apostrophes ''''
  return countWords(text, (word) => word.length >= 1 && !STOP_WORDS.has(word))
}

export function extractFillerFrequency(text: string): WordCount[] {
  return countWords(text, (word) => STOP_WORDS.has(word))
}

export function extractFilterWordFrequency(text: string): WordCount[] {
  return countWords(text, (word) => FILTER_WORDS.has(word))
}

// Adverb detection: words ending in -ly, excluding known false positives (nouns,
// -ply verbs, and adjectives). Edge cases that can serve as adverbs
// in prose (early, daily, nightly, leisurely) are intentionally kept.
export function extractAdverbFrequency(text: string): WordCount[] {
  return countWords(text, (word) => word.endsWith('ly') && word.length > 3 && !ADVERB_EXCLUSIONS.has(word))
}

const BE_VERBS = new Set(['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being'])

function isPastParticiple(word: string): boolean {
  if (PASSIVE_EXCLUSIONS.has(word)) return false
  if (IRREGULAR_PAST_PARTICIPLES.has(word)) return true
  return word.endsWith('ed') && word.length > 3
}

// Passive voice detection: finds be-verb + past participle constructions,
// optionally with a single adverb in between (e.g. "was quickly eaten").
// Stative adjectives and known false positives are excluded via PASSIVE_EXCLUSIONS.
export function extractPassiveVoice(text: string): WordCount[] {
  const normalized = text.toLowerCase().replace(/[\u2018\u2019]/g, "'")
  const tokens = (normalized.match(/[a-z']+/g) ?? [])
    .map(t => t.replace(/^'+|'+$/g, ''))
    .filter(t => t.length > 0)

  const counts = new Map<string, number>()
  for (let i = 0; i < tokens.length - 1; i++) {
    if (!BE_VERBS.has(tokens[i])) continue

    const next = tokens[i + 1]
    if (isPastParticiple(next)) {
      const phrase = `${tokens[i]} ${next}`
      counts.set(phrase, (counts.get(phrase) ?? 0) + 1)
    } else if (next.endsWith('ly') && i + 2 < tokens.length && isPastParticiple(tokens[i + 2])) {
      // skip one adverb: "was quickly eaten"
      const phrase = `${tokens[i]} ${next} ${tokens[i + 2]}`
      counts.set(phrase, (counts.get(phrase) ?? 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 30)
}

// Repeated phrase detection: counts all bigrams and trigrams, keeping only
// those that appear at least 10 times. Returns the top 30 by frequency.
export function extractRepeatedPhrases(text: string): WordCount[] {
  const normalized = text.toLowerCase().replace(/[\u2018\u2019]/g, "'")
  const tokens = (normalized.match(/[a-z']+/g) ?? [])
    .map(t => t.replace(/^'+|'+$/g, ''))
    .filter(t => t.length > 0)

  const counts = new Map<string, number>()
  for (let i = 0; i < tokens.length; i++) {
    if (i + 1 < tokens.length) {
      const bigram = `${tokens[i]} ${tokens[i + 1]}`
      counts.set(bigram, (counts.get(bigram) ?? 0) + 1)
    }
    if (i + 2 < tokens.length) {
      const trigram = `${tokens[i]} ${tokens[i + 1]} ${tokens[i + 2]}`
      counts.set(trigram, (counts.get(trigram) ?? 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .filter(([phrase, count]) => count >= 10 && phrase.split(' ').some(w => !STOP_WORDS.has(w)))
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 30)
}

function countSentencesIntoBuckets(sentences: string[]) {
  const buckets = [
    { label: '1–5 words',   max: 5,        count: 0 },
    { label: '6–10 words',  max: 10,       count: 0 },
    { label: '11–15 words', max: 15,       count: 0 },
    { label: '16–25 words', max: 25,       count: 0 },
    { label: '26+ words',   max: Infinity, count: 0 },
  ]

  for (const sentence of sentences) {
    const wc = (sentence.match(/\S+/g) ?? []).length
    buckets.find(b => wc <= b.max)!.count++
  }

  return buckets
}

// Sentence length distribution: splits text into sentences and buckets them
// into five length ranges. Returns buckets in ascending order so the bar
// chart reads short → long.
export function extractSentenceLengths(text: string): WordCount[] {
  const sentences = text.trim().replace(/\s+/g, ' ')
    .split(/[.!?]+(?:\s|$)/)
    .map(s => s.trim())
    .filter(s => s.length > 0)

  return countSentencesIntoBuckets(sentences)
    .filter(b => b.count > 0)
    .map(({ label, count }) => ({ word: label, count }))
}
