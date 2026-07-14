# Architecture and Product Decisions

## ADR-001 — Mobile-first web before native

**Decision:** Build a responsive progressive web application with Next.js before Flutter or React Native.

**Reason:** Fastest route to a usable competition product, one codebase, Vercel deployment, link-based judge access and no app-store dependency.

**Revisit when:** device capabilities, offline requirements or proven retention justify native investment.

## ADR-002 — Supabase as system of record

**Decision:** Use Supabase Postgres, Auth, Storage and Edge Functions.

**Reason:** Existing team familiarity, strong R0-friendly stack and ability to enforce Row Level Security close to the data.

## ADR-003 — Fixed task templates

**Decision:** Businesses cannot publish arbitrary gig descriptions in the MVP.

**Reason:** Templates improve safety, pricing clarity, matching, training and quality assurance while preventing an unmoderated low-trust marketplace.

## ADR-004 — One worker per task

**Decision:** A task has one active assignment in the MVP.

**Reason:** Simplifies ownership, payment, evidence, disputes and verification. Multi-worker jobs are deferred.

## ADR-005 — AI provider abstraction

**Decision:** No product domain depends directly on one AI vendor SDK.

**Reason:** Cost, reliability, capability and terms can change. Structured interfaces allow replacement and testing.

## ADR-006 — Human authority over consequential states

**Decision:** AI cannot independently verify a business, approve work, release payment, resolve disputes, suspend accounts or publish confidential portfolio evidence.

**Reason:** These are consequential trust decisions requiring accountable rules and human review.

## ADR-007 — Earnings ledger, not wallet

**Decision:** MVP records payment state but does not claim to store funds.

**Reason:** Avoid misleading users and introducing unnecessary financial-regulatory complexity before a legitimate payment partner exists.

## ADR-008 — Proof provenance

**Decision:** Passport evidence is visibly classified as verified work, assessed practice or self-declared capability.

**Reason:** Trust depends on never presenting an AI inference or self-claim as employer-verified experience.

## ADR-009 — Core-loop vertical slices

**Decision:** Build task lifecycle slices end to end rather than completing every worker screen and then every business screen.

**Reason:** Reduces the risk of a polished but non-functional competition prototype.

## ADR-010 — Synthetic customer data for the competition demo

**Decision:** Demo tasks use realistic synthetic data until lawful real-customer pilots are established.

**Reason:** Protects privacy while allowing the complete product flow to be demonstrated.