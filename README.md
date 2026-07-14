# Nala

**Earn your first income. Build your first proof of work. Unlock your next opportunity.**

Nala is a South African work-experience engine that converts real small-business work into safe, paid starter tasks and transforms every completed task into verified proof of employability.

## The problem

Young people are often excluded from formal work because employers require experience they have not yet had the chance to build. Small businesses simultaneously carry neglected administrative work that is too small to justify another permanent hire but important enough to affect revenue and operations.

Nala connects these two needs through one complete loop:

`Business need → structured task → worker match → AI-guided completion → business verification → earnings record → proof-of-work passport → next opportunity`

## MVP outcome

A first-time worker can discover what they are capable of, practise a task, complete paid work for a verified business, receive trusted feedback, and leave with portable evidence of experience.

A small business can select a defined outcome, delegate a controlled task, review the result, and re-engage reliable workers without building its own training or workflow system.

## Initial task categories

- Appointment confirmations
- Quote follow-ups
- Invoice-reminder preparation
- Spreadsheet cleanup
- Social-media content preparation

## Product principles

1. AI guides the worker; it does not impersonate or replace them.
2. Every task must create measurable economic or employability value.
3. Safety, fair pay, privacy, and payment certainty precede marketplace growth.
4. Mobile-first, low-data, and understandable on entry-level smartphones.
5. South Africa first, with architecture and terminology that can expand internationally.
6. Nala does not claim partnerships, integrations, qualifications, earnings, or impact that have not been verified.

## Documentation

- [Project blueprint](project.md)
- [Product requirements](docs/PRD.md)
- [MVP specification](docs/MVP.md)
- [Technical architecture](docs/ARCHITECTURE.md)
- [Data model](docs/DATABASE.md)
- [UX and user flows](docs/UX.md)
- [AI system](docs/AI.md)
- [Trust, safety and privacy](docs/SAFETY.md)
- [Delivery roadmap](docs/ROADMAP.md)
- [Business model](docs/BUSINESS.md)
- [FNB App of the Year submission](docs/FNB_SUBMISSION.md)
- [Architecture decisions](docs/DECISIONS.md)
- [Contributing](CONTRIBUTING.md)

## Proposed stack

- Web application: Next.js, TypeScript, Tailwind CSS
- Backend: Supabase Postgres, Auth, Storage, Realtime and Edge Functions
- AI: provider abstraction with structured outputs, evaluations and human-review gates
- Hosting: Vercel
- Monitoring: Sentry-compatible error tracking and privacy-safe product analytics

The stack is a decision baseline, not permission to start coding. Development begins only after the documentation round is accepted.

## Current phase

**Phase 0 — Product definition and repository setup.**

No production application code should be added during this phase.