# AI System

## Purpose

AI in Nala helps structure information, coach users and check work. It never replaces authorisation, payment, verification, moderation or final human responsibility.

## Capabilities

### Capability profiler

Input: worker conversation and explicit evidence.

Output:
- structured strengths;
- confidence and provenance;
- eligible task categories;
- readiness gaps;
- user-editable summary.

Guardrails:
- do not infer protected characteristics;
- do not fabricate qualifications;
- distinguish self-claims from verified evidence;
- explain uncertainty.

### Task packaging assistant

Input: approved template plus business fields.

Output:
- worker-facing scope;
- checklist;
- risk flags;
- missing information;
- suggested duration and payment range.

It cannot publish a task or override prohibited-task rules.

### Simulation coach

Scores against a fixed rubric, supplies specific feedback and records uncertainty. Borderline or failed attempts remain retryable and contestable.

### Workbench assistant

Provides templates, drafting support, quality checks and privacy reminders. It must not send messages, contact customers, access accounts or submit work without explicit worker action.

### Submission checker

Checks completeness, rubric coverage, unsafe disclosures and possible copied or deceptive content. It may flag but cannot reject or verify final work autonomously.

### Progression recommender

Uses verified work, assessed capability, preferences and availability. Every recommendation states why it was made and allows user correction.

## Provider abstraction

All model calls run through a server-side gateway with:
- provider-neutral interfaces;
- structured JSON schemas;
- prompt version IDs;
- model and latency metadata;
- token/cost limits;
- retries and timeout;
- deterministic fallback;
- redaction before logging.

## Prompt management

Prompts live in version-controlled modules during coding, not inside UI components. Every material change requires an evaluation run and changelog entry.

## Evaluation suites

### Capability profiling
- factual faithfulness;
- no invented qualifications;
- task eligibility precision;
- language clarity;
- fairness across names, dialects and locations.

### Task packaging
- completeness;
- prohibited-content recall;
- data minimisation;
- duration/payment reasonableness;
- instruction clarity.

### Workbench
- usefulness;
- refusal of unauthorised actions;
- privacy protection;
- preservation of worker agency;
- hallucination rate.

### Progression
- evidence alignment;
- actionable recommendations;
- no protected-trait dependence;
- appropriate uncertainty.

## Human-review gates

Mandatory human authority for:
- business verification;
- task publication after a risk flag;
- dispute resolution;
- final work acceptance;
- payment release state;
- account suspension;
- public proof-of-work publication where confidentiality is uncertain.

## AI disclosure

Users must know:
- when AI is being used;
- what information it uses;
- that outputs may be wrong;
- how to correct or appeal;
- when another person will see AI-assisted material.

## Failure policy

When AI is unavailable or invalid:
- preserve the user's work;
- provide the template or manual path;
- do not silently invent results;
- do not block payment or review solely due to an AI outage.