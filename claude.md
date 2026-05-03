# CLAUDE.md — Puzzled

## Starter PRD

Build a web app that helps students and researchers find the right AI tools for their current project, try them one by one, and build their personal AI toolkit over time through reflection.

**The app is called:** Puzzled

**The app is for:** Graduate students and early-career researchers who feel overwhelmed by the number of AI tools available and don't know which ones to actually use for their specific project.

**The core problem it solves:** There are too many AI tools, and no way to know which one actually fits my project right now. Students don't have time for trial and error, and generic recommendations don't help.

---

## Key Features

- **Onboarding (4 questions)** — Ask which tools they already use, what they want to get better at, their budget, and what project they're working on. Show a metrics preview at the end so users know what will be tracked.
- **Puzzle Board** — The main screen. Each recommended AI tool is a puzzle piece — greyed out (TRY) until tried, then activated (DONE) after reflection. Pieces use real interlocking puzzle shapes, not cards. Tool logo visible in all states.
- **Tool Detail Drawer** — Slide-in panel when a piece is clicked. Shows why the tool was recommended for this specific project, a short starter challenge, and a "Try it" button that opens the tool's website in a new tab.
- **Reflection Flow** — After trying a tool, user answers 3 questions: benefit score (1–5), friction score (1–5), would you use it again (Yes/Maybe/No). Optional one-sentence note. Submitting activates the piece — "Snap it in."
- **Dashboard (Trophy Room)** — "Your AI toolkit, earned piece by piece." Shows: Your Toolkit table (top), aggregate scores (pieces unlocked, benefit score, friction score, reuse rate), your projects with puzzle thumbnails, and similar tools to try.
- **Community Browse** — Browse how other users approached similar projects and which tools they used. No rankings or comparisons.

---

## Requirements

- Simple, intuitive user flow — minimize clicks
- Responsive design (mobile + desktop)
- Clean, modern styling with good spacing, typography, and hierarchy
- Include loading states, empty states, and error handling

---

## Pages / Screens

1. **Landing page** — Hero with tagline, puzzle preview, "Start your puzzle" CTA
2. **Onboarding** — 4-step flow (Q1: tools you use → Q2: learning area → Q3: budget → Q4: project input)
3. **Puzzle Board** — Main app screen with puzzle grid, progress, HOW IT WORKS sidebar
4. **Tool Detail Drawer** — Slide-in from puzzle board
5. **Reflection Screen** — Post-try flow with 3 questions + "Snap it in"
6. **Dashboard** — Trophy room with toolkit table, scores, project thumbnails
7. **Community** — Browse feed of similar projects

---

## Data

Use realistic mock data. Structure:

```js
// Tools
{ id, name, category, logo, description, whyItFits, starterChallenge, pricing, url }

// Projects
{ id, name, description, pieces: [{ toolId, status: 'locked'|'unlocked', reflection }] }

// Reflections
{ toolId, benefitScore, frictionScore, reuse, note }

// Community
{ projectName, projectDescription, tools: [toolId], userName }
```

Mock tools to include: Claude, ChatGPT, NotebookLM, Elicit, Perplexity, GitHub Copilot, Midjourney, Grammarly, Notion AI, Cursor

Mock projects: "Master's thesis: civic tech adoption", "Conference paper: AI in UX research", "Qualitative analysis of 30 user interviews"

---

## Tech Expectations

- Scalable structure
- Keep components modular and reusable
- Use React + Tailwind

---

## Bonus

- Puzzle piece snap animation on activation (spring easing)
- Shareable puzzle card — export puzzle board as image with project name + "made with Puzzled"
- "Similar tools you could try" on dashboard based on reflection history
- Make it feel like a real startup product, not a demo

---

## Knowledge Prompt

**Intent:** Help students cut through AI tool overload by matching tools to their specific project, making the learning journey visual and rewarding — without adding pressure or friction.

**Style:**
- Overall aesthetic: warm minimal — clean but human, playful but not childish
- Inspiration: Contractbook, Notion, Duolingo (progress mechanic)
- UI approach: minimal, focused, expressive at key moments
- Layout: puzzle board is the focal point — everything else supports it
- Spacing: generous whitespace
- Color system: warm white base (#ffffff, #f7f7f3) + Energy Gold (#ffba09) as primary accent + Washed Black (#1a1a1a) for text
- Typography: Fraunces or Playfair Display for display headlines; Inter for all UI text
- Components: interlocking puzzle pieces, slide-in drawer panels, pill buttons, dashboard tiles
- Interaction style: smooth, satisfying, warm
- Animations: spring snap on piece activation, fade in on load, subtle hover states
- Depth: flat with soft inset borders — no heavy drop shadows on content cards
- UX tone: friendly, encouraging, not gamified
- Complexity level: simple to start, powerful over time
- Polish level: production-ready, real startup feel — no rough edges

**Design tokens to use (from Contractbook):**
- Page background: #ffffff
- Secondary background: #f7f7f3 (Pearl)
- Input/greyed surfaces: #f0f0ec (Beige)
- Primary text: #1a1a1a (Washed Black)
- Primary CTA + activated pieces: #ffba09 (Energy Gold)
- Button style: pill (999px border-radius)
- Card radius: 24px
- Card border: 1px inset, no drop shadows

**Audience:** Graduate students and early-career researchers — their goal is to figure out which AI tools are actually worth using for their current project, without wasting time on trial and error.

**Build a** production-quality AI tool recommendation app centered around the puzzle board experience, where project-based matching and reflection-driven unlocking makes building an AI toolkit feel structured, visual, and rewarding — without adding friction.
