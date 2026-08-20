# ASTRA Lab Frontend

Create the frontend for a project called "ASTRA" — a personal scientific AI research laboratory.




This is like that so works on chrome 109 too with css.




The eventual AI will be a small conversational scientific research agent focused exclusively on mathematics, physics, astronomy, space, and the universe.




For now, ONLY build the frontend UI. Do not create authentication, database, Supabase tables, backend functions, AI APIs, model integrations, web scraping, or training pipelines yet.




Design a polished dark scientific interface with a futuristic but serious research-lab aesthetic.




Create these main areas:




1. CHAT

- Large conversational interface

- User messages and AI responses

- Scientific-looking but clean typography

- Input box at the bottom

- Button to send a message

- Tool/status area showing things such as:

  "Thinking..."

  "Using calculator..."

  "Researching..."

  "Saving scientific memory..."




2. RESEARCH

- A panel where the future AI can inspect a website

- URL input

- "Inspect Source" button

- Display:

  Source name

  Publisher

  Source type

  Scientific relevance

  License/usage status

  Research status

- For now these are visual placeholders only.




3. SCIENTIFIC MEMORY

- Searchable memory list

- Categories:

  Mathematics

  Physics

  Astronomy

  Space

  Scientific Methods

  Hypotheses

- Each memory card should show:

  title

  category

  short description

  source

  confidence

  date learned

- Use realistic placeholder examples, clearly marked as demo data.




4. CALCULATOR

- Scientific calculator interface

- Support standard scientific calculator UI visually:

  numbers, decimals, +, -, ×, ÷, powers, square root, logarithm, trigonometry, parentheses and equals.

- For now it can be frontend-only/demo functionality.




5. INVESTIGATIONS

- List previous scientific investigations

- Each investigation should show:

  question

  observations

  calculations

  hypotheses

  predictions

  status

- Include a clean investigation detail view.




6. HOME/DASHBOARD

- Show the AI's current mission:

  "Understand mathematics and physics and investigate unclear or potentially new phenomena in the universe."

- Show cards for:

  Scientific Memories

  Investigations

  Research Sources

  Calculations

- Include a simple activity timeline.




Navigation should be simple:

HOME

CHAT

RESEARCH

MEMORY

CALCULATOR

INVESTIGATIONS




Make the interface responsive for desktop and mobile.




Important:

This is ONLY the frontend prototype.

Do not invent a backend.

Do not connect Supabase.

Do not create an AI model.

Do not create fake API integrations.

Use local demo data only.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9f920c3e-0882-49f6-8acc-b08eea5e94c7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
