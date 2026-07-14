# Contributing to Nala

## Current phase

The repository is in documentation and setup phase. Application code begins in the next round.

## Working method

- Keep `project.md` and `docs/PRD.md` as the product source of truth.
- Do not expand scope through implementation convenience.
- Build complete vertical slices.
- Use small, reviewable commits.
- Never commit secrets, production personal data or real customer datasets.
- Use synthetic fixtures for development and competition demonstration.

## Branches

- `main` must remain deployable once coding begins.
- Feature branches use `feat/<name>`.
- Fixes use `fix/<name>`.
- Documentation uses `docs/<name>`.

## Commit format

Use conventional prefixes:
- `feat:`
- `fix:`
- `docs:`
- `test:`
- `refactor:`
- `chore:`
- `security:`

## Pull-request checklist

- Requirement and acceptance criterion identified.
- Scope is within MVP or explicitly approved.
- Tests added or updated.
- RLS and server authorisation reviewed.
- Empty, loading and error states included.
- Mobile flow checked.
- Accessibility checked.
- AI schemas, fallbacks and evaluations updated where relevant.
- Safety/privacy impact considered.
- Documentation updated.
- No fake data presented as real impact.

## Database changes

- All schema changes use migrations.
- Never edit production schema manually.
- Add RLS policies in the same change as user-facing tables.
- Add policy tests before depending on the table in UI.
- Financial and audit records are append-only where specified.

## AI changes

- Prompts are version controlled.
- Structured output is validated.
- Provider-specific code stays behind the AI gateway.
- Consequential decisions retain human authority.
- Run the relevant evaluation set before merge.

## Security reporting

Do not open public issues containing exploitable details, credentials or real personal data. Report privately to the repository owner and preserve only the minimum evidence needed.

## Definition of success

A change is not complete because a screen renders. It is complete when the intended user outcome works securely with persisted data, understandable failure states and documented behaviour.