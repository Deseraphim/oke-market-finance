# Implementation Plan - Voice Commands & AI Business Advice

Add voice-controlled navigation/actions and an AI-driven "Business Advice" card to the dashboard to help users track their business performance and navigate the app easily.

## User Request
- **Voice Button:** Speech-to-text for commands like "record sale" or "show my balance".
- **Text-to-Speech:** Read back key numbers/data points.
- **Business Advice Card:** Analyze sales, profit, and debt data to provide simple advice (e.g., "Profit is falling" or "Debts are rising").

## Scope
- Voice recognition utility (Browser SpeechRecognition API).
- Text-to-speech utility (Browser SpeechSynthesis API).
- AI analysis logic (Heuristic-based for now, or mock AI if no LLM endpoint is provided, using existing local data).
- Dashboard UI update for the Advice Card and Voice Button.

## Auth & RLS model
**Auth in scope:** no (Using existing PIN/localStorage model).
**Model:** no_auth_public_read
**RLS strategy:** N/A
**Frontend implication:** Data for AI analysis will be pulled from `localStorage` (sales, debtors, loans).

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** not_applicable

## Affected Areas
- `src/components/dashboard/Home.tsx`: Add Voice Button and Advice Card.
- `src/App.tsx`: Handle voice-triggered view changes.
- `src/components/features/BusinessSummary.tsx`: Source of truth for sales/profit analysis.
- `src/components/features/MyDebtors.tsx` & `MyLoans.tsx`: Source of truth for debt analysis.

## Phases

### Phase 1: Voice Utilities
- **Goal:** Create hooks or utilities for STT and TTS.
- **Tasks:**
  - Implement `useVoiceRecognition` hook.
  - Implement `useTextToSpeech` hook.
  - Map keywords ("record", "sale", "balance", "loan", "debtor") to view names or data readouts.

### Phase 2: AI Business Advice Logic
- **Goal:** Analyze local data and generate advice strings.
- **Tasks:**
  - Create `analyzeBusinessData` utility.
  - Compare recent sales vs. older sales (if timestamps available) or simply check debt-to-income ratios.
  - Flag rising debt (if `oke_debtors` or `oke_loans` length/total increases).

### Phase 3: UI Integration
- **Goal:** Update the Dashboard.
- **Tasks:**
  - Add a floating or prominent "Mic" button to `Home.tsx`.
  - Add the "Business Advice" card above "Quick Stats" or "Actions".
  - Connect voice commands to `setView` in `App.tsx`.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Implement voice functionality and advice card.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3
- **Scope:**
  - Implement voice command recognition in `src/components/dashboard/Home.tsx` using the Web Speech API.
  - Commands to support: "record sale" (nav to record-sale), "show my balance" (read out today's sales and total loans), "show debtors" (nav to debtors).
  - Use `window.speechSynthesis` to read back data points.
  - Create a "Business Advice" component in `src/components/dashboard/Home.tsx` that:
    - Reads `oke_loans`, `oke_debtors`, and `oke_sales` (if exists) from `localStorage`.
    - Generates 1-2 sentences of advice (e.g., "Your debt is higher than your sales this week. Try to collect from debtors.").
  - Add a visual feedback/indicator when the mic is active.
- **Files:**
  - `src/components/dashboard/Home.tsx`
  - `src/App.tsx` (to pass voice-triggered view changes)
- **Depends on:** none (Uses browser APIs)
- **Acceptance criteria:**
  - Clicking the voice button and saying "Record sale" changes the view.
  - The "Business Advice" card displays a relevant tip based on `localStorage` data.
  - Numbers are read aloud when requested via voice.
