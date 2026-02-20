const STOP_WORDS = new Set([
  // single letters
  'a', 'i',
  // two-letter function words
  'an', 'as', 'at', 'be', 'by', 'do', 'go', 'he', 'if', 'in',
  'is', 'it', 'me', 'my', 'no', 'of', 'on', 'or', 'so', 'to',
  'up', 'us', 'we',
  // articles / prepositions / conjunctions
  'the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but',
  'from', 'they', 'she', 'her', 'him', 'his', 'one', 'all', 'would', 'there',
  'their', 'what', 'out', 'about', 'who', 'which', 'when', 'been', 'more',
  'will', 'can', 'said', 'each', 'than', 'them', 'then', 'were', 'into',
  'has', 'had', 'its', 'also', 'may', 'just', 'over', 'such', 'even', 'most',
  'after', 'two', 'how', 'our', 'any', 'these', 'could', 'other', 'your',
  'some', 'time', 'very', 'only', 'now', 'come', 'did', 'does', 'get',
  'got', 'let', 'put', 'too', 'use', 'was', 'are',
  // pronoun contractions  (I/he/she/we/they/you + am/is/are/have/had/will/would)
  "i'm", "i've", "i'll", "i'd",
  "he's", "he'd", "he'll",
  "she's", "she'd", "she'll",
  "we're", "we've", "we'll", "we'd",
  "they're", "they've", "they'll", "they'd",
  "you're", "you've", "you'll", "you'd",
  "it's", "that's", "there's", "what's", "who's",
  // negative contractions
  "don't", "doesn't", "didn't",
  "can't", "couldn't", "won't", "wouldn't",
  "shouldn't", "isn't", "aren't", "wasn't", "weren't", "haven't", "hadn't",
])

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
  // This word.length >= 1 predicate guards against theoretical words made of apostophes ''''
  return countWords(text, (word) => word.length >= 1 && !STOP_WORDS.has(word))
}

export function extractFillerFrequency(text: string): WordCount[] {
  return countWords(text, (word) => STOP_WORDS.has(word))
}
