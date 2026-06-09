# DUOLINGO
## Product Requirements Document: Net New Build

**Build name:** Duolingo
**Owner:** Bath Bilissalou & Jason Zeng
**Date:** June 2026

---

## 1. Problem

People around the world want to learn a new language, but the dominant options force a brutal trade-off between cost and quality. High-quality instruction (private tutors, Rosetta Stone, immersion programs) costs hundreds of dollars, putting it out of reach for the people who would benefit most — the roughly 1 billion learners in developing economies for whom a new language is a path to a better job. Meanwhile, free or cheap alternatives are boring, unstructured, and easy to abandon. The result: most people who start learning a language quit within weeks, having paid too much, learned too little, or simply lost motivation.

### Supporting Context

- There are an estimated 1.2 billion people learning a foreign language worldwide, and the overwhelming majority are doing so to improve their economic prospects.
- Premium software like Rosetta Stone can cost $500+, and private tutoring runs $20–$50 per hour — prohibitive for most of the global learner population.
- Language learning has a notorious drop-off problem: motivation, not access to content, is the primary reason learners quit. Existing tools treat learning as a chore, not a habit.
- Mobile penetration is exploding even in low-income regions, creating a channel to reach learners who could never afford traditional methods.

### 1a. Opportunity

If we make high-quality language education completely free and as habit-forming as a game, we can reach hundreds of millions of learners who are currently priced out — and build the largest language-learning platform in the world. Rather than charging learners, we monetize indirectly (e.g., crowdsourced translation, and later optional subscriptions and ads), aligning our incentive with keeping the core product free forever.

**Market Opportunity**

- ~1.2 billion people are learning a language globally; the language-learning market is worth tens of billions of dollars annually and growing.
- No dominant free, mobile-first, gamified player exists — incumbents (Rosetta Stone, Babbel, classroom textbooks) are expensive, desktop-bound, or both.
- Smartphone adoption in emerging markets opens a distribution channel that bypasses traditional education infrastructure entirely.

### 1b. Users & Needs

**Primary user(s):** Self-motivated adult learners who want to pick up a new language for work, travel, study, or personal growth but can't or won't pay for expensive courses. They have a few spare minutes a day (commute, lunch break, before bed) and a smartphone, and they need something free, structured, and motivating enough to keep them coming back.

**Secondary users:** Casual / hobby learners refreshing a language they once studied; educators and students looking for a free supplement to classroom learning.

**Key User Needs**

- As a learner on a budget, I need a genuinely free, high-quality course because I can't afford tutors or premium software but still want to actually learn.
- As a busy person, I need bite-sized lessons I can do in 5 minutes because I don't have time for hour-long study sessions.
- As someone who has quit language apps before, I need the experience to be fun and rewarding because motivation — not content — is what makes me give up.
- As a beginner, I need a clear, structured path from zero because I don't know what to study or in what order.
- As a returning learner, I need to be placed at the right level because starting over from "hello" is demotivating.

---

## 2. Proposed Solution

Duolingo is a free mobile and web app that teaches languages through short, game-like lessons. Users pick a language and work through a structured tree of bite-sized exercises — translating sentences, matching words, listening, and speaking — earning points and leveling up as they go. The app uses a streak counter, hearts, points (XP), and friendly feedback to turn daily practice into a habit, and it adapts to each learner by revisiting words they get wrong. As a result, anyone with a smartphone can learn a language a few minutes at a time, for free, and actually stick with it.

### 2a. Value Proposition

Aspiring language learners who struggle with the cost and boredom of traditional methods use Duolingo, a free mobile app, to learn a language in short daily lessons that feel like a game. Unlike expensive software and tutors or dull free alternatives, it's completely free, fits into five spare minutes a day, and uses streaks and game mechanics to keep learners motivated — helping them build a real learning habit and make steady progress without paying a cent.

### 2b. Top 3 MVP Value Props

- **The Vitamin (must-have baseline):** A structured, well-sequenced course that takes a complete beginner from zero to functional vocabulary and grammar.
- **The Painkiller (solves the core pain):** Completely free, high-quality lessons in bite-sized chunks — removing both the cost barrier and the time barrier that make people quit.
- **The Steroid (the magic moment):** Game mechanics — streaks, points, and instant feedback — that make a five-minute lesson genuinely fun and addictive to come back to every day.

### 2c. Goals & Non-Goals

**Goals**

- Make high-quality language learning free and accessible to anyone with a smartphone.
- Build a daily learning habit — get learners to return day after day rather than abandoning within weeks.
- Take a complete beginner to meaningful, usable proficiency through a clear, structured path.
- Reach a large, global base of active learners and establish Duolingo as the default free way to learn a language.

**Non-Goals**

- Full conversational fluency or live human tutoring — out of scope for the MVP; we focus on foundational reading, listening, and writing.
- Charging learners for the core course — the product stays free; paid offerings are deferred.
- Supporting every language at launch — we start with a small number of high-demand languages and expand later.

### 2d. Success Metrics

| Goal | Signal | Metric | Target |
|------|--------|--------|--------|
| Habit / Retention | Learners come back day after day | Day-7 retention of new users | >30% of new users active on day 7 |
| Engagement | Learners practice daily | Daily active users / streak maintenance | >15% of MAU maintain a 7-day streak |
| Adoption | Learners find it valuable and sign up | Registered learners | >1M registered users within 12 months |
| Learning efficacy | Learners actually progress | Lessons completed per active user / week | >10 lessons/week per active learner |

---

## 3. Requirements

### User Journey 1: A beginner learning a new language from scratch

**Context:** This is the core experience. A new learner needs to get into a lesson fast, feel a sense of progress, and want to come back tomorrow. We optimize for low friction to start and high motivation to continue.

#### Sub-journey: Getting started

- `[P0]` User can choose a language to learn from the available courses.
- `[P0]` User can start their first lesson immediately without creating an account.
- `[P0]` User can set a daily goal (e.g., casual / regular / serious) that sets a target XP per day.
- `[P1]` User can take a placement test to skip ahead if they already know some of the language.
- `[P1]` User can create an account (email or social) to save progress across devices.
- `[P2]` User can select a reason for learning (travel, work, school) to personalize messaging.

#### Sub-journey: Completing a lesson

- `[P0]` User can work through a lesson made of short exercises: translate, match pairs, fill in the blank, and listening.
- `[P0]` User receives immediate feedback on whether each answer is right or wrong, with the correct answer shown.
- `[P0]` User earns points (XP) for completing a lesson.
- `[P1]` User loses a "heart" / life for wrong answers and the lesson ends if they run out, encouraging careful practice.
- `[P0]` User can hear audio for words and sentences.
- `[P1]` User can tap a word to see a hint / translation while answering.
- `[P1]` User can complete speaking exercises by repeating a phrase aloud (with an option to skip).
- `[P2]` User can report a problem with a specific question (e.g., "my answer should be accepted").

#### Sub-journey: Progressing through the course

- `[P0]` User can see a structured "skill tree" showing lessons in order, with locked and unlocked skills.
- `[P0]` User unlocks the next skill by completing the prerequisite skills.
- `[P0]` User can see how much of the course they've completed (progress per skill).
- `[P1]` User is prompted to "strengthen" / review skills that have weakened over time.
- `[P2]` User can test out of a skill to advance faster.

---

### User Journey 2: A learner building and keeping a daily habit

**Context:** Retention is everything — motivation is why people quit. These mechanics are the "magic moment" that turns a one-time user into a daily learner. We optimize for return visits and emotional reward.

#### Sub-journey: Building a streak and staying motivated

- `[P0]` User builds a daily streak by hitting their daily goal each day.
- `[P0]` User can see their current streak count prominently.
- `[P0]` User receives reminders / notifications encouraging them to complete their daily lesson.
- `[P1]` User receives encouraging messages and celebrations at milestones (e.g., 7-day, 30-day streak).
- `[P2]` User can earn badges / achievements for reaching milestones.

#### Sub-journey: Competing and connecting

- `[P0]` User can see their total XP and level.
- `[P1]` User can add friends and see a leaderboard of XP among friends.
- `[P1]` User can follow another learner's progress.
- `[P2]` User can share progress or invite friends to join.

---

### User Journey 3: A returning learner resuming progress

**Context:** Learners switch devices and take breaks. They must be able to pick up exactly where they left off, on any device, without losing their streak or progress.

#### Sub-journey: Resuming and syncing

- `[P0]` User can log in and have their full progress, XP, and streak restored.
- `[P0]` User's progress syncs between mobile app and web.
- `[P1]` User is shown a quick review if they've been away for a while.
- `[P2]` User can use a "streak freeze" to protect a streak on a missed day.

---

## 4. Appendix

**Founding research:** Luis von Ahn & Severin Hacker (Carnegie Mellon University) — origins of the free, gamified, crowdsourced-translation language learning concept.

**Open question:** Which language pairs should launch first? (Leading candidates: Spanish, French, German, English for Spanish speakers.)

**Open question:** Monetization roadmap — crowdsourced translation as initial revenue vs. later subscription/ads. To be validated post-launch.

**Designs / wireframes:** [Link to early skill-tree and lesson mockups]

**Technical:** Speech and audio infrastructure, adaptive review algorithm (spaced repetition) specs — [Link]
