# NOVA AI Studio — AI Provider Strategy

## 1. Document Information
- Project: NOVA AI Studio — AI Movie Maker Studio
- Phase: 1 — Project Foundation & Architecture
- Step: 1.3 — AI Provider Strategy
- Status: Documentation Approved — Practical Verification Pending
- Required Technologies: TypeScript, Python, JSON

## 2. Purpose
Define how NOVA AI Studio will evaluate, integrate, and manage external AI providers while preserving the ability to integrate NOVA's own AI models in the future.

This document defines the evaluation strategy. It does not claim that a provider has been selected, tested, or approved.

## 3. Provider-Neutral Design
- Application features must not depend directly on one provider's proprietary interface.
- Provider-specific requests and responses must be handled by a dedicated integration layer.
- Common internal request and response formats should be defined where practical.
- Provider capabilities, limitations, errors, and usage information should be handled explicitly.
- Provider credentials must remain on the server and must never be exposed in frontend code.
- Replacing or adding a provider should require minimal changes to unrelated application features.

## 4. AI Capability Categories

### 4.1 Story Understanding
Evaluate providers for:
- Story summarization and analysis.
- Character, relationship, and setting extraction.
- Plot structure and scene breakdown.
- Structured JSON output.
- Long-story context limits.
- Reliability, latency, pricing, and error handling.

### 4.2 Image Generation
Evaluate providers for:
- Character reference images and visual development.
- Scene and environment generation.
- Image quality and supported dimensions.
- Reference-image and editing capabilities.
- Character appearance consistency support.
- Usage restrictions, commercial terms, pricing, and latency.

Character consistency must not be promised as perfect. Actual results depend on the selected model, workflow, and testing.

### 4.3 Video Generation
Evaluate providers for:
- Text-to-video and image-to-video capabilities.
- Supported clip duration, resolution, and aspect ratios.
- Reference-image or reference-video support.
- Motion quality and visual continuity.
- Generation time, availability, pricing, and usage restrictions.
- Job status, failures, retries, and asynchronous processing.

### 4.4 Voice, Dialogue, and Audio
Evaluate providers for:
- Text-to-speech quality and supported languages.
- Dialogue generation and voice controls.
- Speech recognition when required.
- Sound effects, music, and audio-generation capabilities.
- Voice-consent requirements and restrictions.
- Commercial usage terms, pricing, latency, and output formats.

### 4.5 Provider Reliability
Evaluate:
- API availability and documented limits.
- Authentication and permission requirements.
- Rate limits and quotas.
- Timeouts, error formats, and retry guidance.
- Background-job support where needed.
- Version changes and deprecation policies.
- Data retention, privacy, and security documentation.

## 5. Cost and Usage Controls
- Check current official pricing before selecting a provider.
- Estimate costs for individual generation tasks where pricing information permits.
- Display estimates as estimates, not guaranteed final charges.
- Track usage by project and generation task where supported.
- Apply configurable limits and prevent unintended repeated requests.
- Handle failed requests carefully to avoid unnecessary duplicate charges.
- Never promise that AI movie generation will be free unless the applicable provider terms support that claim.

## 6. Provider Evaluation Process
For each candidate provider:
1. Identify the exact product, model, and API.
2. Verify capabilities using official documentation.
3. Check current official pricing and usage limits.
4. Review privacy, data handling, security, and commercial-use terms.
5. Record relevant limitations and unsupported features.
6. Design a small, controlled proof of concept where practical.
7. Compare observed results, reliability, and cost.
8. Record the decision and its rationale before production adoption.

Unverified capabilities, prices, and limits must remain marked as unknown.

## 7. TypeScript and Python Responsibilities
- TypeScript: application-side provider contracts, API orchestration, validation, and integration with backend services where appropriate.
- Python: AI workflows, media-processing tasks, and model integrations where appropriate.
- JSON: structured provider configuration and normalized data exchange.
- Responsibilities must be confirmed against the architecture document before implementation.
- Secrets and private credentials must not be stored in public JSON configuration or frontend files.

## 8. Future NOVA AI Engine Integration
- Keep external-provider integrations replaceable.
- Define internal capability contracts independently from individual providers.
- Allow future NOVA models to implement compatible internal contracts.
- Evaluate self-hosting requirements, hardware, model quality, latency, maintenance, and operating costs before migration.
- Support a gradual transition rather than assuming every external provider can immediately be replaced.
- Do not assume that a locally hosted model will match leading hosted models without measured evidence.

## 9. Provider Comparison Record
Each candidate should eventually have a comparison record containing:
- Provider and exact model/API.
- Supported capability categories.
- Official documentation reference.
- Verified pricing reference and verification date.
- Relevant limits and regional availability.
- Privacy and commercial-use findings.
- Test results, if testing has occurred.
- Known gaps and risks.
- Decision: Not Evaluated, Under Evaluation, Approved for Prototype, or Approved for Production.
- Decision rationale.

## 10. Decisions Not Yet Finalized
The following remain open until documented research and evaluation:
- Selected story-understanding provider.
- Selected image-generation provider.
- Selected video-generation provider.
- Selected voice and audio providers.
- Provider combinations and fallback arrangements.
- Initial usage budgets and limits.
- Which tasks should use external services versus future NOVA models.

## 11. Completion Criteria
Step 1.3 can be considered complete only after:
- The strategy covers story, image, video, voice/audio, cost, reliability, and future NOVA integration.
- The strategy is consistent with the approved system architecture.
- Current provider capabilities and official pricing are researched where needed.
- Unknowns and limitations are clearly recorded.
- The Markdown and JSON documents are validated.
- A final review is completed and the step is explicitly approved.

## 12. Roadmap Boundary
This step defines the provider evaluation and integration strategy only. It does not implement provider APIs, generate media, select production providers without evidence, or begin Step 1.4.

Proceed to Step 1.4 only after Step 1.3 has been reviewed and approved.

## 13. Official Provider Research — 2026-10-23

This section records an initial review of official provider documentation. It is research evidence, not final provider approval.

### 13.1 Google Gemini API
- Official pricing: https://ai.google.dev/gemini-api/docs/pricing
- Official video documentation: https://ai.google.dev/gemini-api/docs/video
- Candidate capabilities include story understanding, multimodal inputs, and video generation.
- The pricing page lists Gemini Omni Flash video output at an effective rate of approximately $0.10 per second at 720p, calculated from output-token consumption.
- A 60-second estimate at that rate is approximately $6 for video output alone. This is an estimate, not a guaranteed total charge.
- The reviewed documentation states that Veo 3.1 preview models were scheduled to shut down on 2026-10-22. Do not start a new integration based on those preview model IDs without verifying their current availability.
- Current model availability, account eligibility, regional access, limits, and pricing must be rechecked before implementation.

### 13.2 OpenAI API
- Official pricing: https://developers.openai.com/api/docs/pricing
- Official image-generation guide: https://developers.openai.com/api/docs/guides/tools-image-generation
- Official text-to-speech guide: https://developers.openai.com/api/docs/guides/text-to-speech
- Image generation and editing are documented capabilities.
- Image cost depends on the selected model and generation settings; use the official pricing documentation and calculator for estimates.
- The reviewed text-to-speech documentation lists a shutdown date of 2027-01-06 for certain older TTS models. Verify supported replacement models and their workflow before choosing an integration.
- OpenAI remains a candidate for evaluation, not an approved production provider.

### 13.3 Runway API
- Official API pricing: https://docs.dev.runwayml.com/guides/pricing/
- The documentation describes credit-based generation pricing, with credits priced at $0.01 each on the reviewed page.
- Listed per-second rates vary by model and options, so cost must be calculated using the exact selected model.
- Runway remains a candidate for evaluation, not an approved production provider.

### 13.4 Research Limitations
- Pricing and model availability can change.
- Published prices do not prove that a service is available to every account or region.
- Documentation review does not replace hands-on testing.
- Commercial rights, data handling, rate limits, account requirements, and reliability need separate review.
- No provider has been approved for production by this research entry.
- Recheck official sources immediately before implementation.

### 13.5 Model and Integration Findings

These are research candidates and implementation warnings, not provider selections.

#### Google Gemini
- The reviewed official model documentation identifies `gemini-omni-1.1-flash` as a stable video-generation candidate.
- The reviewed pricing documentation indicates paid-tier video output pricing. At the documented 720p token-consumption rate, approximately USD 0.10 per second is an estimate; a 60-second output would be approximately USD 6 before other tasks, retries, input costs, and applicable changes.
- Do not build a new integration around the reviewed Veo 3.1 Preview model IDs without rechecking their current status. The documentation reviewed for this strategy listed 2026-10-22 as their scheduled shutdown date.
- Confirm model access, current pricing, quotas, regional eligibility, and the exact API workflow immediately before implementation.

#### OpenAI
- Image-generation candidates and their costs must be evaluated against the current official model and pricing documentation. Image costs depend on the model and generation settings.
- The reviewed text-to-speech documentation listed 2027-01-06 as the scheduled shutdown date for certain older TTS models.
- The documented replacement path involves a Realtime API workflow; it must not be treated as a simple model-ID change to the existing speech endpoint.
- The documented voice optimization for English does not establish acceptable Urdu output quality. Urdu pronunciation, dialogue quality, voice consistency, and usable output formats require direct evaluation.

#### Runway
- The reviewed API pricing documentation describes credit-based pricing, with the reviewed page valuing one credit at USD 0.01.
- Video cost varies by model, resolution, duration, and options. Calculate estimates using the exact candidate model and current official price table.
- Account eligibility, regional access, commercial-use terms, and actual API operation have not been verified for this project.

### 13.6 Availability, Language, and Testing Boundaries

- Official country-support documentation reviewed for Google Gemini API and OpenAI API includes Pakistan. This does not guarantee access to every model, feature, billing method, or individual account.
- Runway account-level and regional availability remains unverified.
- Official Google Gemini TTS documentation lists Urdu, Southern Pashto, Punjabi, and Sindhi among supported languages; OpenAI's TTS documentation also lists Urdu. These are documented language capabilities, not proof of Pakistani Urdu accent quality.
- Pakistani Urdu pronunciation, regional accents, natural dialogue, emotional delivery, and consistency across scenes remain untested for this project.
- No live API proof of concept has been performed for this project. No measured quality, latency, reliability, or actual project cost is available yet.
- Before implementation, recheck official documentation, account permissions, current pricing, quotas, privacy/data handling, commercial rights, and model lifecycle status.
- Provider choice must be based on controlled tests and recorded evidence; the model names in this section are candidates only.


### 13.7 Additional Official Research — 2026-10-23

#### Google video generation
- Official video documentation recommends Gemini Omni Flash as the default video-generation candidate.
- The stable model ID documented for this research is `gemini-omni-1.1-flash`.
- Documented output duration is 3–10 seconds per generated video, with listed resolutions including 360p, 720p, 1080p, and 4K at 24 FPS.
- The official pricing page gives an effective Standard-tier estimate of approximately USD 0.10 per second for 720p video output, based on output-token consumption.
- A 60-second final movie would not necessarily be generated in one request. Multiple clips, retries, editing, input tokens, and other services can increase the total cost.
- Official video documentation states that the listed Veo 3.1 Preview IDs are deprecated and scheduled to shut down on 2026-10-22. Do not build a new integration around those Preview IDs. Recheck current official status before implementation.

#### Google voice and audio candidates
- The official model catalog lists `gemini-3.8-flash-tts` and `gemini-3.8-flash-lite-tts` as text-to-speech candidates.
- These are candidates for evaluation only. Urdu pronunciation, expressive dialogue, duration, audio format, cost, account access, and commercial-use terms have not been tested for this project.
- Compare these candidates with other suitable providers before selecting an audio provider.

#### OpenAI text-to-speech
- The current official guide lists Urdu among languages that can be used for speech generation, while noting that the built-in voices are optimized for English.
- The reviewed deprecation notice gives 2027-01-06 as the shutdown date for certain older TTS models.
- The documented migration path to `gpt-realtime-2.1-mini` uses the Realtime API and is not a simple model-ID replacement for the existing `/v1/audio/speech` workflow.
- Evaluate the current documented workflow and alternatives before implementation. Urdu quality and cost remain untested in this project.

#### Runway pricing and account setup
- The current official developer pricing guide describes credit-based pricing at USD 0.01 per credit on the reviewed page.
- Rates differ by model, duration, resolution, audio options, and other generation settings. Use the current table for the exact selected model rather than reusing a rate from an older example.
- Official setup documentation requires a developer account and project/API key. This project's account eligibility, successful authentication, billing status, and API operation remain unverified.

### 13.8 What Public Research Cannot Verify
- Published supported-country lists include Pakistan for Google Gemini API and OpenAI API, but do not establish individual account billing, model entitlements, quotas, or successful requests.
- Runway account-level access and regional eligibility have not been confirmed for this project.
- No live authenticated API request or proof of concept has been run.
- Urdu speech quality, generated-video quality, latency, reliability, actual billable usage, and production behavior have not been measured.
- These items require controlled testing using the project's own provider accounts. Never place API keys in frontend code, public files, or chat messages.
- Production provider selection remains pending until evidence and a recorded comparison justify a decision.

### 13.9 Multilingual and Character-Specific Voice Requirements

These are product requirements, not claims that every language is already verified by a provider.

- Target broad multilingual coverage, with Pakistani Urdu treated as a priority language.
- Include Urdu and its Pakistani regional pronunciation, alongside target languages such as Pashto, Punjabi, Sindhi, Balochi, Arabic, Hindi, and English. Maintain an extensible language registry rather than a hard-coded promise that every provider supports every language.
- Record each provider's documented languages, scripts, locale/accent options, voice capabilities, restrictions, and last verification date.
- Each character must have a saved voice profile: selected provider and voice ID, language, accent/locale where available, perceived voice qualities, speaking pace, emotional style, pronunciation notes, and continuity settings.
- Support multi-character dialogue and reuse of a character's assigned voice across scenes and projects where the provider allows it.
- Where supported, evaluate voice design and voice replication. Voice replication must require appropriate speaker consent and safeguards against impersonation.
- For unsupported languages or accents, clearly report the limitation and offer another eligible provider or a manual audio-import workflow instead of falsely claiming universal support.
- Build a language-and-accent test matrix. Test native-speaker pronunciation, intelligibility, naturalness, emotional expression, dialogue separation, audio format, latency, reliability, cost, and voice consistency.
- Mark a language/accent as verified only after documented tests. Pakistani Urdu remains a priority test case; it is not yet quality-verified.
- Public model documentation can establish listed capabilities, but account access, commercial permissions, and real output quality must still be checked before production selection.

Official references reviewed:
- Google Gemini TTS languages and voice capabilities: https://ai.google.dev/gemini-api/docs/speech-generation
- OpenAI TTS languages and voice limitations: https://developers.openai.com/api/docs/guides/text-to-speech

## 14. Research Status
- Initial official-source review: completed for the sources listed above.
- Initial structured provider comparison: documented, audited, and approved; practical verification pending.
- Account and regional availability checks: pending.
- Proof-of-concept testing: pending.
- Production provider selection: pending.


## 15. Step 1.3A — Structured Provider Comparison

Review date: 2026-10-23
Review type: Official-documentation comparison
Decision status: Candidates only; no production provider approved.

### 15.1 Comparison Method

Compare providers against the same requirements:
- Exact product, model, API workflow, and official documentation.
- Supported capability and documented limitations.
- Published pricing and a clearly labelled cost estimate.
- Account, regional, and billing access.
- Privacy, security, data handling, and commercial-use terms.
- Measured quality, latency, reliability, and actual cost where tests exist.
- Fallback arrangements and future NOVA AI Engine compatibility.

Published documentation is not proof of successful access, suitable output quality,
or production reliability. Do not infer an unlisted capability from a provider name.

### 15.2 Initial Comparison

| Area | Google Gemini | OpenAI | Runway |
|---|---|---|---|
| Story understanding | Candidate; exact workflow and model evaluation pending | Candidate; exact workflow and model evaluation pending | Not established as the primary story-understanding option in this review |
| Image generation | Exact candidate and project-specific cost require verification | Image generation/editing documented; model and cost evaluation pending | Image capabilities and exact candidate require separate verification |
| Video generation | `gemini-omni-1.1-flash` is documented for video generation and editing | A suitable video-generation API was not established by this review | Video-generation API and model-specific prices documented |
| Voice/audio | Gemini TTS candidates require language, quality, cost, and access tests | TTS documents Urdu support; built-in voices are optimized for English | Exact suitable voice/audio workflow requires verification |
| Published cost evidence | Approximately USD 0.10 per second for 720p Omni Flash output under the reviewed Standard pricing | Depends on selected product, model, and usage; check current official pricing | USD 0.01 per credit on the reviewed pricing page; generation rates vary |
| Pakistan/account access | Country support does not prove individual account or model access | Country support does not prove individual billing or model access | Project account, billing, and regional access remain unverified |
| Practical quality tests | Not performed for this project | Not performed for this project | Not performed for this project |
| Production decision | Pending | Pending | Pending |

### 15.3 Illustrative Video Cost Calculations

Google Gemini Omni Flash:
- Reviewed Standard-tier effective 720p estimate: USD 0.10 per second.
- 10 seconds: approximately USD 1.00.
- 60 seconds: approximately USD 6.00.

These are output estimates, not a total movie quote. Input processing, other generation tasks,
retries, editing, storage, and future price changes may add cost.

Runway examples based on the reviewed official credit table:
- Kling 3.0 Standard without audio: 9 credits/second, or approximately USD 0.09/second.
- Kling 3.0 Standard with audio: 13 credits/second, or approximately USD 0.13/second.
- Kling 3.0 Pro without audio: 12 credits/second, or approximately USD 0.12/second.
- Kling 3.0 Pro with audio: 17 credits/second, or approximately USD 0.17/second.

At these listed rates, a 10-second clip would be approximately USD 0.90, USD 1.30,
USD 1.20, or USD 1.70 respectively, before applicable taxes or other charges.
Verify the exact model and current rate before implementation.

No comparable total-movie cost is available yet because the complete workflow and retry rate
have not been measured.

### 15.4 Voice and Multilingual Evaluation

- Urdu being listed in documentation does not prove natural Pakistani Urdu pronunciation.
- Test intelligibility, pronunciation, accent, emotional delivery, dialogue separation,
  audio format, latency, reliability, cost, and continuity across scenes.
- Include native-speaker review before marking Pakistani Urdu quality as verified.
- Do not promise universal support for Urdu, Pashto, Punjabi, Sindhi, Balochi, Arabic,
  Hindi, or English without checking each provider and workflow.
- Require appropriate consent and safeguards for voice replication.

### 15.5 Security, Access, and Reliability Gates

Before production adoption, verify:
- Current API documentation, model lifecycle, pricing, quotas, and rate limits.
- Actual account eligibility, billing, permissions, and authenticated API access.
- Data retention, privacy, security, and commercial-use terms.
- Timeout handling, retry limits, duplicate-charge prevention, and job recovery.
- Quality, latency, reliability, and actual cost using controlled tests.
- Provider fallback behavior and normalized internal request/response contracts.

API keys must remain server-side and must never be committed to public files or exposed
through frontend code.

### 15.6 Official References

- Google Gemini video generation:
  https://ai.google.dev/gemini-api/docs/video
- Google Gemini Omni Flash model:
  https://ai.google.dev/gemini-api/docs/models/gemini-omni-flash
- Google Gemini API pricing:
  https://ai.google.dev/gemini-api/docs/pricing
- Google Gemini speech generation:
  https://ai.google.dev/gemini-api/docs/speech-generation
- OpenAI text-to-speech:
  https://developers.openai.com/api/docs/guides/text-to-speech
- OpenAI API pricing:
  https://developers.openai.com/api/docs/pricing
- OpenAI supported countries:
  https://developers.openai.com/api/docs/supported-countries
- Runway API pricing:
  https://docs.dev.runwayml.com/guides/pricing/
- Runway API setup:
  https://docs.dev.runwayml.com/guides/setup/

Recheck the official pages before implementation because model availability and pricing can change.

### 15.7 Step 1.3A Completion Boundary

Documentation comparison is recorded, but the following remain pending:
- Account and regional access verification.
- Authenticated API requests and proof-of-concept tests.
- Pakistani Urdu voice and native-speaker review.
- Video quality, latency, reliability, and actual-cost measurements.
- Final production provider selection.
- Full Markdown/JSON semantic consistency and final human review.

Step 1.3A must not be described as having passed all practical tests.
Step 1.3 documentation was explicitly approved by the user on 2026-11-01.
Step 1.4 may begin following the user's Step 1.3 documentation approval.


## 16. Fresh Official Verification — 2026-11-01

This section records a fresh official-documentation check performed on
2026-11-01. It supplements the research dated 2026-10-23; it does not
replace that historical record or approve any provider for production.

### 16.1 Google Gemini Omni Flash

- The stable model ID is `gemini-omni-1.1-flash`.
- The stable model is distinct from the older preview endpoint
  `gemini-omni-flash-preview`.
- The documented video output duration is 3–10 seconds per generation.
- Documented output resolutions include 360p, 720p, 1080p, and 4K.
- The model documentation must be rechecked before implementation.
- Individual account access, billing eligibility, production suitability,
  quality, latency, and reliability remain unverified for this project.

Official model documentation:
https://ai.google.dev/gemini-api/docs/models/gemini-omni-flash

Official video documentation:
https://ai.google.dev/gemini-api/docs/video

Official Gemini API pricing:
https://ai.google.dev/gemini-api/docs/pricing

### 16.2 Runway Dev API and Kling 3.0

- Kling 3.0 is a third-party model made available through the Runway Dev API.
  It must not be described as a model created by Runway.
- Runway Dev pricing lists a credit price of USD 0.01 per credit.
- Kling 3.0 Standard: 9 credits/second without audio and 13 credits/second
  with audio.
- Kling 3.0 Pro: 12 credits/second without audio and 17 credits/second
  with audio.
- These are published API pricing examples, not measurements of NOVA's
  actual generation costs.
- Runway account access, billing, regional eligibility, quality, latency,
  reliability, and production suitability remain unverified.

Official Runway Dev pricing:
https://docs.dev.runwayml.com/guides/pricing/

Official Runway Dev API changelog:
https://docs.dev.runwayml.com/changelog/

### 16.3 Important Pricing Attribution

Runway Dev's published pricing lists Gemini Omni Flash 1.1 video generation
at 10 credits per second for the documented 720p route. At USD 0.01 per
credit, this corresponds to approximately USD 0.10 per second through that
Runway Dev route.

This figure is Runway Dev route pricing. It must not be presented as the
verified direct Google Gemini API price. Direct Google API pricing must be
checked independently against Google's current official pricing page.

Illustrative Runway Dev route calculation:
- 10 seconds of generated video: approximately USD 1.00.
- 60 seconds of total generated video: approximately USD 6.00,
  calculated across multiple clips/generations, not one 60-second generation.

These calculations exclude any additional costs, taxes, retries, storage,
audio, editing, rendering, or other workflow charges that may apply.

### 16.4 Research Limitations and Decisions

- This update is documentation research, not an authenticated API test.
- No provider is approved for prototype or production by this update.
- No provider account or billing access has been verified.
- No hands-on generation, Urdu voice test, native-speaker review,
  quality test, latency test, reliability test, or actual-cost measurement
  has been completed.
- Provider selection remains pending.
- Step 1.3 documentation was approved by the user on 2026-11-01.
- Step 1.4 is authorized to begin following Step 1.3 documentation approval.
