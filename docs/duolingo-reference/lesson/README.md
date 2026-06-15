# Duolingo first-lesson capture (Spanish, web)

Captured from duolingo.com's `funboarding` → first lesson (`/lesson`) by playing
through the whole session. Screenshots in this folder are the real Duolingo UI
for each challenge type. Used as the reference for the clone's question types.

## Sounds (CDN: `d35aaqx5ub95lt.cloudfront.net/sounds/<hash>.mp3`)

| Effect | File | Wired into clone |
| --- | --- | --- |
| Correct answer | `37d8f0b39dcfe63872192c89653a93f6.mp3` | `public/audio/sfx/correct.mp3` |
| Incorrect answer | `f0b6ab4396d5891241ef4ca73b4de13a.mp3` | `public/audio/sfx/incorrect.mp3` |

Lesson audio is **preloaded up front** and played from cache via Howler, so the
effects don't re-hit the network on each event.

Word/sentence TTS is served separately from
`d1vq87e9lcf771.cloudfront.net/<voice>/<hash>` (voices seen: penelope, oscares,
beaes, miguel, eddyes, lucyes, falstaffes). These are tied to Duolingo's own
sentences, so the clone generates its own Spanish TTS instead — see
`scripts/gen-word-audio.mjs` → `public/audio/es/` + `src/content/word-audio.json`.

## Question types in the first lesson

| Duolingo `data-test` | Prompt | Clone `Exercise.type` |
| --- | --- | --- |
| `challenge-select` | "Which one of these is X?" | `select_image` |
| `challenge-assist` | "Select the correct meaning" | `select_translation` |
| `challenge-translate` | "Write this in English" (word bank) | `word_bank` |
| `challenge-listenTap` | "Tap what you hear" | `listen_tap` (added) |
| `challenge-dialogue` | "Complete the chat" | `dialogue` (added) |

`challenge-translate` was by far the most common (≈half the lesson), with
`select` and `assist` interleaved and `listenTap` / `dialogue` appearing a few
times each. The clone also keeps a `match` ("Tap the pairs") type, which Duolingo
uses in later lessons.
