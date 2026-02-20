export const STOP_WORDS = new Set([
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

// Common irregular past participles (don't end in -ed) used for passive voice detection
export const IRREGULAR_PAST_PARTICIPLES = new Set([
  // -en / -n forms
  'written', 'bitten', 'eaten', 'fallen', 'given', 'hidden', 'risen', 'ridden',
  'driven', 'taken', 'broken', 'chosen', 'frozen', 'spoken', 'stolen', 'woven',
  'forgiven', 'forbidden', 'gotten', 'beaten', 'shaken', 'mistaken', 'undertaken',
  'known', 'grown', 'shown', 'blown', 'thrown', 'drawn', 'worn', 'torn',
  'born', 'sworn', 'borne', 'seen', 'been', 'done', 'gone',
  // -t forms
  'built', 'felt', 'kept', 'left', 'meant', 'dealt', 'slept', 'swept', 'wept',
  'bent', 'lent', 'rent', 'sent', 'spent', 'burnt', 'learnt',
  'brought', 'bought', 'caught', 'taught', 'thought', 'fought', 'sought',
  'told', 'sold', 'held',
  // -d / zero-change forms
  'heard', 'made', 'paid', 'said', 'led', 'met', 'set', 'cut', 'put',
  'let', 'shut', 'hit', 'hurt', 'burst', 'cost', 'lost',
  'found', 'bound', 'wound', 'ground', 'stood', 'understood', 'withstood',
  // -un / -ng forms
  'run', 'won', 'begun', 'sung', 'rung', 'sprung', 'stung', 'swung', 'hung', 'flung',
])

// Stative adjectives ending in -ed that follow be-verbs but are NOT passive voice
export const PASSIVE_EXCLUSIONS = new Set([
  // emotional states
  'tired', 'bored', 'excited', 'interested', 'worried', 'surprised', 'confused',
  'annoyed', 'frustrated', 'disappointed', 'pleased', 'satisfied', 'relaxed',
  'delighted', 'shocked', 'embarrassed', 'scared', 'frightened', 'amused',
  'astonished', 'amazed', 'stunned', 'troubled', 'concerned', 'disgusted',
  'thrilled', 'depressed', 'stressed', 'overwhelmed', 'offended', 'alarmed',
  // descriptive adjectives
  'blessed', 'beloved', 'aged', 'wicked', 'naked', 'ragged', 'wretched',
  'crooked', 'learned', 'alleged', 'supposed', 'supposed',
  // relationship / status
  'married', 'divorced', 'engaged', 'retired',
])

// Words ending in -ly that are NOT adverbs, used to filter false positives
export const ADVERB_EXCLUSIONS = new Set([
  // Nouns
  'family', 'belly', 'jelly', 'folly', 'holly', 'lily', 'molly', 'bully',
  'ally', 'rally', 'tally', 'homily', 'anomaly',
  // Verbs where -ly is part of the root, not an adverb suffix
  'reply', 'apply', 'supply', 'imply', 'comply', 'multiply',
  // Adjectives that do not typically function as adverbs
  'friendly', 'lonely', 'lovely', 'ugly', 'silly', 'holy', 'lively', 'likely', 'timely',
  'sprightly', 'sickly', 'burly', 'curly', 'surly',
  'fatherly', 'motherly', 'brotherly', 'sisterly', 'neighborly', 'cowardly',
  'worldly', 'manly', 'womanly', 'kingly', 'queenly', 'godly',
  'beastly', 'ghostly', 'saintly', 'miserly', 'masterly', 'priestly', 'knightly',
  'homely', 'shapely', 'stately', 'comely', 'courtly', 'lordly', 'princely',
  'scholarly', 'orderly', 'elderly', 'earthly', 'heavenly',
  'northerly', 'southerly', 'easterly', 'westerly',
])

// Perception / cognition verbs that create distance between reader and narrative
export const FILTER_WORDS = new Set([
  // visual
  'see', 'saw', 'look', 'looked', 'glance', 'stare',
  // auditory
  'hear', 'heard', 'listen',
  // tactile
  'feel', 'felt', 'touch', 'touched',
  // olfactory
  'smell', 'whiff',
  // taste
  'taste',
  // cognitive
  'think', 'thought', 'wonder', 'wondered', 'ponder',
  // perception / awareness
  'realize', 'realized', 'notice', 'noticed', 'note', 'recognized',
  // appearance
  'seem', 'seemed', 'appeared',
  // knowledge / belief
  'know', 'knew', 'believe', 'assumed',
  // decision / memory
  'decide', 'decided', 'remember', 'reminded',
  // observation
  'watch', 'watched', 'observed', 'spot', 'spotted',
  // sound
  'sound', 'sounded',
  // experience
  'experience', 'experienced',
  // ability ("be able to" — "able" is the load-bearing token)
  'able', 'can', 'could',
])
