import { describe, it, expect } from 'vitest'
import { extractWordFrequency, extractFillerFrequency } from './textAnalysis'

describe('extractWordFrequency', () => {
  it('returns content words from text', () => {
    const result = extractWordFrequency('cat cat dog')
    expect(result[0]).toEqual({ word: 'cat', count: 2 })
    expect(result[1]).toEqual({ word: 'dog', count: 1 })
  })

  it('excludes stop words', () => {
    const result = extractWordFrequency('the cat sat on the mat')
    const words = result.map((r) => r.word)
    expect(words).not.toContain('the')
    expect(words).not.toContain('on')
    expect(words).toContain('cat')
    expect(words).toContain('sat')
    expect(words).toContain('mat')
  })

  it('is case-insensitive', () => {
    const result = extractWordFrequency('Apple apple APPLE')
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({ word: 'apple', count: 3 })
  })

  it('sorts results descending by count', () => {
    const result = extractWordFrequency('bird bird bird cat cat dog')
    expect(result[0].word).toBe('bird')
    expect(result[1].word).toBe('cat')
    expect(result[2].word).toBe('dog')
  })

  it('returns at most 30 entries', () => {
    // 31 distinct content words
    const words = Array.from({ length: 31 }, (_, i) => `word${i}`).join(' ')
    const result = extractWordFrequency(words)
    expect(result.length).toBeLessThanOrEqual(30)
  })

  it('returns empty array for empty string', () => {
    expect(extractWordFrequency('')).toEqual([])
  })

  it('returns empty array when text is only stop words', () => {
    const result = extractWordFrequency('the and is it')
    expect(result).toEqual([])
  })

  it('normalizes curly/smart apostrophes before tokenizing', () => {
    // U+2019 right single quotation mark (from Google Docs / Word)
    const result = extractWordFrequency('She doesn\u2019t like rain')
    const words = result.map((r) => r.word)
    // "doesn't" is a stop word — should not appear
    expect(words).not.toContain('doesn')
    expect(words).not.toContain("doesn't")
    expect(words).toContain('like')
    expect(words).toContain('rain')
  })

  it('strips leading and trailing apostrophes from tokens', () => {
    const result = extractWordFrequency("'hello' world")
    const words = result.map((r) => r.word)
    expect(words).toContain('hello')
    expect(words).not.toContain("'hello'")
  })

  it('produces no output for pure-apostrophe tokens', () => {
    const result = extractWordFrequency("'''' ''' cat")
    const words = result.map((r) => r.word)
    expect(words).not.toContain('')
    expect(words).toContain('cat')
  })

  it('treats contractions as single stop words (i\u2019m)', () => {
    // U+2019 curly apostrophe — should normalize and match stop list
    const result = extractWordFrequency("I\u2019m going home home home")
    const words = result.map((r) => r.word)
    expect(words).not.toContain("i'm")
    expect(words).not.toContain('im')
    expect(words).toContain('going')
    expect(words).toContain('home')
  })
})

describe('extractFillerFrequency', () => {
  it('returns stop words from text', () => {
    const result = extractFillerFrequency('the cat sat on the mat')
    const words = result.map((r) => r.word)
    expect(words).toContain('the')
    expect(words).toContain('on')
  })

  it('excludes content words', () => {
    const result = extractFillerFrequency('the cat sat on the mat')
    const words = result.map((r) => r.word)
    expect(words).not.toContain('cat')
    expect(words).not.toContain('sat')
    expect(words).not.toContain('mat')
  })

  it('counts stop word occurrences correctly', () => {
    const result = extractFillerFrequency('the dog and the cat and the bird')
    const the = result.find((r) => r.word === 'the')
    const and = result.find((r) => r.word === 'and')
    expect(the?.count).toBe(3)
    expect(and?.count).toBe(2)
  })

  it('returns empty array for empty string', () => {
    expect(extractFillerFrequency('')).toEqual([])
  })

  it('returns empty array when text has no stop words', () => {
    const result = extractFillerFrequency('python javascript typescript')
    expect(result).toEqual([])
  })

  it('handles negative contractions as stop words', () => {
    const result = extractFillerFrequency("I can't stop won't stop")
    const words = result.map((r) => r.word)
    expect(words).toContain("can't")
    expect(words).toContain("won't")
  })

  it('normalizes curly apostrophes in contractions', () => {
    const result = extractFillerFrequency("I can\u2019t stop")
    const words = result.map((r) => r.word)
    expect(words).toContain("can't")
  })
})
