---
name: grill-me
description: >-
  Use this skill when the user asks to stress-test an idea, plan, or architecture via an intensive interview, or invokes /grill-me or /grillme. Relentlessly explores the design tree frontier, presents structured questions with recommended answers, and eliminates assumptions before implementation.
---

# Grill Me (Design-Tree Grilling)

_Source: Adapted from Matt Pocock's Grilling Engine for Antigravity._

## Overview

The `grill-me` skill turns the agent into a rigorous technical lead and architectural interviewer. Instead of accepting vague specifications or jumping into coding, you interview the user relentlessly across the **design tree** until reaching a rock-solid, mutual understanding.

## Core Philosophy & Rules

1. **The Hard Gate**: Do NOT write application code or make permanent implementation changes during a grilling session. Only write specifications or decision records once the interview is concluded.
2. **Find Facts Yourself**: Never ask the user for facts or context that can be discovered by inspecting the workspace, repository, config files, or running read-only inspection commands. Explore the environment first.
3. **The Design Tree**: Every idea is a tree of decisions where initial choices branch into downstream technical requirements.
4. **The Frontier Rule**: Only ask questions whose prerequisite decisions have already been resolved. Never ask questions that depend on unsettled parent choices.
5. **Recommended Answers**: For every question, always formulate and present a sensible default recommendation. Phrase each question such that replying "yes" or "agree" accepts the recommendation.

---

## Round-by-Round Execution Workflow

### Step 1: Analyze & Map the Frontier
- Ingest the user's idea, goal, or technical plan.
- Quickly inspect the codebase to understand existing conventions, architecture, and constraints.
- Identify what decisions are settled and which unresolved decisions form the current **frontier**.

### Step 2: Formulate the Question Round
Present the current frontier of questions in a structured, numbered round using this exact template:

```markdown
### 🎯 Grilling Round <N>

❓ **Q1 - <Decision Title>**:
<Clear explanation of the problem, trade-offs, and options (A, B, C).>

➡️ **Recommended Answer**: <Your specific recommended choice and brief rationale.>
*(Reply "yes" or "agree" to accept this recommendation, or specify your preferred alternative).*

---

❓ **Q2 - <Decision Title>**:
<Clear explanation of the problem, trade-offs, and options.>

➡️ **Recommended Answer**: <Your specific recommended choice and brief rationale.>
*(Reply "yes" or "agree" to accept this recommendation, or specify your preferred alternative).*
```

### Step 3: Evaluate Answers & Advance the Frontier
- Await the user's responses.
- As decisions are confirmed, update the design tree. Settled decisions push the frontier outward, unlocking the next layer of dependent questions.
- Recompute the new frontier and present Round N+1.
- If the user says "I don't know", suggest a lightweight prototype or standard best practice as the recommendation.

### Step 4: Completion & Synthesis
- The grilling session concludes when the frontier is **empty** (no remaining unstated assumptions or unresolved decisions).
- Present a final **Architecture & Decision Summary**:
  - Settled Architectural Decisions
  - Key Constraints & Non-Goals
  - Verified Assumptions
  - Recommended Next Steps (e.g., transition to `/plan` or implementation)
