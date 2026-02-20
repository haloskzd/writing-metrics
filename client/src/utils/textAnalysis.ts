import { STOP_WORDS, FILTER_WORDS, ADVERB_EXCLUSIONS } from './wordLists'

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
