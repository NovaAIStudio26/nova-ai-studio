# NOVA AI Studio — Technical Stack

## 1. Document Information

- Project: NOVA AI Studio
- Phase: 1 — Project Foundation & Architecture
- Step: 1.4 — Technical Stack
- Status: Documentation Approved — Practical Verification Pending
- Last updated: 2026-11-01
- Related approved documents:
  - `PROJECT_SPECIFICATION.md`
  - `architecture/SYSTEM_ARCHITECTURE.md`
  - `architecture/system-architecture.json`
  - `ai-provider-strategy/AI_PROVIDER_STRATEGY.md`
  - `ai-provider-strategy/ai-provider-strategy.json`

This document records approved technology choices, observed environment details, practical test results, compatibility limitations, and pending decisions. A selected technology is not automatically considered production-ready.

## 2. Technical Stack Objectives

The technology stack must support:

1. A public, search-engine-friendly website.
2. A complete AI movie-production application and dashboard.
3. Story development, screenplay, characters, locations, scenes, shots, and takes.
4. AI image, video, dialogue, voice, music, and sound-effect workflows.
5. A user-friendly film editor with an interactive timeline.
6. Movie assembly, rendering, quality checks, and final export.
7. Long-form movie production through multiple generated clips and shots.
8. Background processing for long-running AI and rendering jobs.
9. Secure user accounts, projects, assets, usage limits, and future billing.
10. Modular architecture that can grow without rebuilding the whole platform.
11. Development that can begin on Android/Termux while production workloads use suitable Linux infrastructure.

## 3. Approved Technical Stack

| Layer | Selected technology | Decision |
|---|---|---|
| Frontend framework | Next.js | Approved |
| UI library | React | Approved |
| Main backend runtime | Node.js | Approved |
| Backend language | TypeScript | Approved |
| AI and media processing | Python | Approved |
| Main relational database | PostgreSQL | Approved |
| PostgreSQL Node.js driver | node-postgres (`pg`) | Approved |
| Database ORM | Drizzle ORM | Approved |
| Database tooling | Drizzle Kit | Selected; Termux installation unresolved |
| Development database | Local PostgreSQL in Termux | Installed and tested |
| Production database | Cloud-hosted PostgreSQL | Strategy approved; provider not selected |
| AI providers | Provider-neutral integration layer | Approved strategy; no provider approved for production |
| Heavy media processing | Suitable Linux/cloud workers | Recommended; implementation pending |

## 4. Frontend — Next.js and React

### 4.1 Decision

Next.js with React is the approved frontend direction.

### 4.2 Responsibilities

- Public website and search-engine-friendly pages.
- User registration and sign-in interfaces.
- NOVA AI Studio dashboard.
- Movie project workspace.
- Story, character, location, scene, and shot interfaces.
- Image and video generation controls.
- Audio and dialogue interfaces.
- Interactive film editor and timeline.
- Project status, asset library, and export interfaces.

### 4.3 Architecture notes

React provides reusable interface components and interactive UI behavior. Next.js provides the application framework and public website capabilities.

A professional timeline editor requires suitable editor components, media handling, state management, and performance optimization. Selecting Next.js and React does not by itself provide a finished video editor.

Long-running video generation, rendering, and large media operations must not block ordinary frontend requests.

### 4.4 Compatibility findings

Package metadata inspected in the Termux environment showed:

- Next.js registry version observed: `16.4.3`
- Node.js engine requirement observed: `>=20.9.0`
- React registry version observed: `19.3.1`
- The inspected Next.js peer dependency range included React 19.

The installed Node.js version meets the declared minimum. This metadata check does not prove that a complete Next.js application builds and runs reliably on Android/Termux.

Next.js official development documentation lists environments such as macOS, Windows (WSL), and Linux. Android/Termux is not listed as an officially documented development platform. Practical Termux compatibility remains to be tested.

## 5. Main Backend — Node.js and TypeScript

### 5.1 Decision

Node.js with TypeScript is the approved main backend stack.

### 5.2 Responsibilities

- Application APIs and business logic.
- User, session, and project workflows.
- Database access and business rules.
- AI-provider request coordination.
- Background job submission and status tracking.
- Asset metadata and storage references.
- Usage limits and cost controls.
- Secure communication between frontend and processing services.

### 5.3 Architecture boundary

The main backend should coordinate work rather than perform resource-intensive movie rendering inside ordinary API requests. Long-running work should be dispatched to background workers.

TypeScript improves development-time consistency but does not replace runtime validation, authorization, or security controls.

## 6. AI and Media Processing — Python

### 6.1 Decision

Python is the approved language for specialized AI and media-processing services.

### 6.2 Responsibilities

- AI and machine-learning integrations where Python libraries are suitable.
- Image and video processing.
- Media analysis and quality checks.
- Specialized visual and audio processing.
- Processing workers and service integrations.
- Future NOVA AI Engine integration.

### 6.3 Termux compatibility findings

Observed environment:

- Python: `3.13.13`
- pip: `26.1.2`
- Platform: Android / Termux
- Architecture: `aarch64`

Pure-Python wheels for FastAPI, Uvicorn, and Starlette were successfully downloaded for compatibility inspection. They were not installed.

Binary-only downloads for `pydantic-core` versions `2.50.2` and `2.41.5` did not find compatible Android wheels. A previous FastAPI/Pydantic dry-run also encountered a source-build dependency and network failure.

These findings do not prove Python 3.13 itself is incompatible. They show that the complete FastAPI/Pydantic installation and runtime have not been verified in this Termux environment.

### 6.4 Deployment recommendation

Use Termux for basic Python development and suitable lightweight tests. Plan to verify and run complete Python AI/media services in a compatible Linux environment.

No Python packages were installed during the compatibility checks.

## 7. Database — PostgreSQL

### 7.1 Decision

PostgreSQL is the approved primary relational database.

### 7.2 Intended data

The database will store structured application information, including:

- Users and account records.
- Projects and production status.
- Story and screenplay metadata.
- Characters and continuity records.
- Locations and reference asset metadata.
- Scenes, shots, takes, and prompts.
- Generation jobs and provider metadata.
- Editing timeline and version information.
- Asset references and storage metadata.
- Usage, quota, and future billing-related records.

Large video, image, and audio binaries should normally be stored in suitable media/object storage. PostgreSQL should store metadata, ownership, status, and storage references rather than act as the main repository for large media files.

### 7.3 Development database

A local PostgreSQL 18.2 server was installed and initialized in Termux.

Verified configuration:

- Database: `nova_ai_dev`
- Application role: `nova_app`
- Administrative role: `u0_a250`
- Database owner: `nova_app`
- Encoding: UTF8
- Server binding: `127.0.0.1`
- Authentication: SCRAM-SHA-256
- Application role is not a superuser or administrator.

### 7.4 Verification results

The following checks passed:

1. PostgreSQL server started successfully.
2. Administrative TCP login succeeded.
3. Application-role TCP login succeeded.
4. The application role connected to `nova_ai_dev`.
5. A temporary table creation and insert permission test succeeded inside a transaction.
6. The test transaction was rolled back, leaving no permanent test table.

The database is a local development database, not a public production database.

### 7.5 Production direction

A cloud-hosted PostgreSQL database is the approved future production strategy. No hosting provider, paid plan, or production database has been selected or authorized.

## 8. PostgreSQL Integration — Drizzle ORM, pg, and Drizzle Kit

### 8.1 Decision

The approved Node.js-to-PostgreSQL integration approach is:

- Drizzle ORM for typed database schema and query integration.
- node-postgres (`pg`) as the PostgreSQL driver.
- Drizzle Kit for schema-related tooling and migrations.

The user explicitly approved this technology choice on 2026-11-01.

### 8.2 Package installation findings

Successfully installed:

- `drizzle-orm@0.45.4`
- `pg@8.23.1`

The project `package.json` records these packages as dependencies.

Selected Drizzle Kit version:

- `drizzle-kit@0.31.11`

Its installation attempt failed in Termux due to a nested esbuild Android ARM64 executable problem.

Observed failure details:

- Nested package: `esbuild@0.28.2`
- Location: `node_modules/tsx/node_modules/esbuild`
- Reported error: executable had an invalid offset/size of its `.dynamic` section.

Drizzle Kit is not currently installed. This is an observed Termux installation issue, not proof that Drizzle Kit cannot run in a supported Linux environment.

### 8.3 Actual database connection test

A real Node.js connection test was executed using:

- `pg` Pool.
- `drizzle-orm/node-postgres`.
- The `nova_app` role.
- The `nova_ai_dev` database.
- A password supplied through a temporary environment variable.

The query returned:

- `current_user`: `nova_app`
- `current_database`: `nova_ai_dev`

**Result: Drizzle ORM + pg connection to local PostgreSQL — PASS.**

The password was not included in the command text or shared in chat.

### 8.4 Current status

- Drizzle ORM installed: PASS.
- `pg` installed: PASS.
- Actual Drizzle ORM connection to PostgreSQL: PASS.
- Drizzle Kit installation on Termux: BLOCKED / unresolved.
- Drizzle Kit migration workflow: NOT TESTED.
- Linux installation and migration verification: PENDING.

The selected stack remains Drizzle ORM + `pg` + Drizzle Kit. Do not silently replace the selected tooling. Resolve the Termux limitation or verify the tooling in the intended Linux environment before declaring the complete integration verified.

## 9. AI Provider Integration

NOVA must use a provider-neutral integration layer.

The application should avoid coupling its core project, character, scene, shot, and asset records directly to one AI provider.

Provider-specific adapters should handle:

- Authentication and secure credentials.
- Model and capability selection.
- Request and response normalization.
- Generation status and errors.
- Retries and timeouts.
- Usage and cost recording.
- Provider-specific limits.
- Asset retrieval and storage references.

The AI Provider Strategy is documented separately in `ai-provider-strategy/`.

Step 1.3 documentation was approved on 2026-11-01, but practical provider testing remains pending. No AI provider has been approved for production.

## 10. Media Storage and Background Processing

### 10.1 Media storage

The architecture should separate media binaries from database metadata.

Media storage must eventually support:

- Original and generated images.
- Video clips and takes.
- Dialogue and voice files.
- Music and sound effects.
- Subtitles and project exports.
- Previews and thumbnails.
- Versioned and intermediate render files.

The final storage provider and pricing have not been selected.

### 10.2 Background jobs

Generation, transcoding, rendering, and long-running processing should use background jobs.

The job architecture should support:

- Queues and worker processes.
- Job status and progress.
- Retry and failure handling.
- Cancellation where safe.
- Concurrency and resource limits.
- Usage and cost tracking.
- Recovery after worker or server interruption.

The specific queue technology has not yet been approved.

## 11. Development and Production Environment Strategy

### 11.1 Current development environment

Observed environment:

- Android 15.
- Termux.
- Linux kernel 5.15.
- Architecture: ARM64 / `aarch64`.
- Node.js: `v26.3.1`.
- npm: `11.17.0`.
- npx: `11.17.0`.
- Python: `3.13.13`.
- pip: `26.1.2`.
- PostgreSQL: `18.2`.

Observed device resource snapshot:

- RAM total: approximately 3.7 GiB.
- Available RAM at inspection: approximately 1.3 GiB.
- Storage filesystem: approximately 49 GiB total.
- Free storage at inspection: approximately 7.4 GiB.

These are point-in-time observations, not permanent specifications or guaranteed available resources.

### 11.2 Appropriate phone-based work

The phone can be used for:

- Editing source code and documentation.
- Frontend component development.
- Basic Node.js and TypeScript work.
- Database schema and query development.
- Local PostgreSQL tests.
- Lightweight Python development.
- Git operations and project inspection.

### 11.3 Work better suited to Linux/cloud infrastructure

Plan to use suitable external infrastructure for:

- Full production backend deployment.
- Complete Python AI-service dependencies.
- Background workers.
- Large media storage.
- Video transcoding and rendering.
- Long-form movie assembly.
- Resource-intensive generation and quality checks.

This is an architecture recommendation based on the observed device and compatibility findings. It does not mean all development is impossible on Android.

## 12. Security and Configuration

The implementation must follow these principles:

1. Keep API keys and provider credentials on the server.
2. Never expose private credentials in frontend JavaScript.
3. Do not commit secrets to Git.
4. Use environment variables or suitable secret management.
5. Keep database access limited to the permissions required by each service.
6. Use secure authentication and authorization checks.
7. Validate untrusted input at runtime.
8. Protect user projects and media assets from unauthorized access.
9. Apply quotas, rate limits, and cost controls to generation endpoints.
10. Use encrypted connections for production services.
11. Keep development and production credentials separate.
12. Never request that the user paste private API keys or database passwords into chat.

Actual application security implementation and penetration testing are pending later roadmap work.

## 13. Package and Compatibility Evidence

| Component | Observed version or result | Current evidence |
|---|---|---|
| Node.js | 26.3.1 | Installed and available |
| npm | 11.17.0 | Installed; registry ping passed |
| Next.js metadata | 16.4.3 | Registry metadata inspected; runtime not tested |
| React metadata | 19.3.1 | Registry metadata inspected |
| Python | 3.13.13 | Installed and available |
| pip | 26.1.2 | Installed and available |
| PostgreSQL | 18.2 | Installed; login and permission tests passed |
| Drizzle ORM | 0.45.4 | Installed; actual database connection passed |
| pg | 8.23.1 | Installed; actual database connection passed |
| Drizzle Kit | 0.31.11 selected | Termux installation unresolved |
| FastAPI | 0.162.0 wheel downloaded | Download only; not installed |
| Uvicorn | 0.54.0 wheel downloaded | Download only; not installed |
| Starlette | 1.10.0 wheel downloaded | Download only; not installed |
| Pydantic Core | Android wheel not found for tested versions | Full Python stack unresolved |

Downloaded wheel files are inspection artifacts. They are not proof that the packages are installed or operational.

## 14. Decisions Still Pending

The following choices must be made at the appropriate roadmap stage:

- Linux development and production hosting provider.
- Production cloud PostgreSQL provider.
- Object/media storage provider.
- Background job queue technology.
- Authentication and session implementation details.
- Production deployment architecture.
- Video rendering and transcoding implementation.
- Specific AI providers and models for production.
- Production monitoring and logging services.
- Billing provider and payment integration.

No paid provider or service is approved merely because it appears in this document.

## 15. Verification Status

### Passed

- [x] Frontend and backend technology choices approved.
- [x] Python selected for specialized AI/media services.
- [x] PostgreSQL selected and installed locally.
- [x] Dedicated database and limited-permission application role created.
- [x] Application-role login and basic database write permissions tested.
- [x] Drizzle ORM and `pg` installed.
- [x] Actual Drizzle ORM connection to local PostgreSQL tested.
- [x] Python and pip availability inspected.
- [x] Pure-Python package wheel downloads inspected.
- [x] Existing architecture and AI Provider Strategy structures inspected.
- [x] Final Technical Stack documentation audit completed.
- [x] User explicitly approved Step 1.4 documentation.

### Pending or unresolved

- [ ] Drizzle Kit installation and migration workflow.
- [ ] Complete FastAPI/Pydantic installation and runtime verification.
- [ ] Linux environment compatibility verification.
- [ ] Next.js application build and runtime verification.
- [ ] Full TypeScript backend build and API verification.

A pending check must not be marked PASS without evidence.

## 16. Step 1.4 Completion Criteria

Step 1.4 can be submitted for approval only when:

1. The selected stack is documented consistently.
2. Approved decisions are distinguished from recommendations and pending choices.
3. Termux compatibility findings and limitations are accurately recorded.
4. PostgreSQL and Drizzle connection evidence is preserved.
5. Drizzle Kit's unresolved installation issue is documented with a verification plan.
6. Python package/runtime limitations are documented with a Linux verification plan.
7. Both Markdown and JSON documents pass structural and consistency checks.
8. The user reviews the result and explicitly approves Step 1.4.

Approval of this document does not mean every future production service is deployed or every later roadmap phase is complete.

## 17. Roadmap Boundary

This document belongs only to Phase 1, Step 1.4 — Technical Stack.

It does not replace or modify the approved system architecture or AI Provider Strategy. It does not implement the complete frontend, backend, editor, AI generation, rendering, billing, deployment, or production infrastructure.

The next Phase 1 work item after Step 1.4 approval is Step 1.5 — Master Project Structure.

## 18. User Approval Record

- Approval status: Documentation approved.
- Approval date: 2026-11-01.
- Approval scope: The documented technology choices are approved by the user.
- Practical verification: Still pending for Drizzle Kit, Python dependencies/runtime, Linux compatibility, Next.js build/runtime, and TypeScript backend build/API.
- Cloud provider and paid services: Not selected or approved by this record.
- Next step: Phase 1, Step 1.5 — Master Project Structure.
