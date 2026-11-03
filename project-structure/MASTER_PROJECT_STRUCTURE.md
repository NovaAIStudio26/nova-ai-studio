# NOVA AI Studio — Master Project Structure

## 1. Document Information
- Phase: 1 — Project Foundation & Architecture
- Step: 1.5 — Master Project Structure
- Architecture: Modular Monorepo
- Status: Approved — Pending Final Step 1.5 Review
- Date: 2026-11-01

## 2. Project Purpose

NOVA AI Studio is an integrated AI-powered movie-production platform inspired by the workflow of a professional film industry.

It will combine:
- A public website.
- A complete AI Movie Studio application.
- Story and screenplay development.
- Character Library and visual consistency.
- AI image and video generation.
- Dialogue, voice, music, and sound effects.
- A dedicated multi-track Film Editing Studio.
- Movie assembly, rendering, and export.
- Project and asset management.
- Future film-industry capabilities.

The platform will create long movies through multiple generated clips and shots, followed by editing, assembly, quality checks, and rendering.

## 3. Approved Architectural Approach

The user has approved Modular Monorepo Architecture.

Core principles:

1. Keep the platform in one main repository.
2. Separate applications, backend responsibilities, and processing services.
3. Keep AI and media capabilities modular.
4. Share reusable components and common types.
5. Keep large media files outside the relational database.
6. Use replaceable AI provider adapters.
7. Design long-running generation and rendering workflows for background execution.
8. Support Android/Termux development where practical.
9. Use suitable Linux and cloud infrastructure for heavy workloads.
10. Preserve the approved 16-phase roadmap.

This approval does not finalize a workspace manager, Python framework, job queue, cloud provider, storage provider, paid API, or GPU provider.


## 4. Proposed Root Directory Structure

```text
nova-ai-studio/
├── apps/                       # User-facing applications
├── services/                   # AI and media-processing services
├── packages/                   # Reusable shared packages
├── database/                   # Database resources
├── docs/                       # Developer and module documentation
├── infrastructure/             # Development and cloud infrastructure
├── scripts/                    # Repeatable project operations
├── tests/                      # Automated testing
├── architecture/               # Approved architecture documents
├── ai-provider-strategy/       # AI provider strategy documents
├── technical-stack/            # Approved technology documentation
├── project-structure/          # Master project structure documents
├── PROJECT_SPECIFICATION.md
├── project-specification.json
├── package.json
└── package-lock.json
```

Existing files, backups, dependencies, and unknown files must be preserved. No existing documentation will be moved or deleted merely to match this proposal.


## 5. Applications — apps/

The apps/ directory contains the proposed user-facing applications and the main backend API.

### 5.1 Integrated Next.js Application — apps/web/

The public website, authentication interfaces, and complete AI Movie Studio will be parts of one Next.js application.

Proposed route organization:

- `src/app/(public)/` — Public website, product information, tutorials, documentation links, and SEO pages.
- `src/app/(auth)/` — Registration, sign-in, and authentication-related interfaces.
- `src/app/(studio)/` — Authenticated movie-production workspace and project dashboards.

Responsibilities:

- Introduce NOVA AI Studio to visitors and explain its capabilities.
- Support search-engine discovery and technical SEO.
- Display pricing information only after pricing is finalized.
- Provide registration and sign-in entry points.
- Connect the five film-industry departments.
- Provide Story, Character Library, Image, Video, and Audio workspaces.
- Provide the dedicated multi-track Film Editing Studio.
- Support movie assembly, rendering, and export workflows.
- Display generation progress, errors, approvals, and project status.
- Support both Guided Automatic and Advanced Manual workflows.

These route groups organize one frontend application; they are not separate deployable applications.

### 5.2 Backend API — apps/api/

Responsibilities:

- Authenticate and authorize application requests.
- Manage projects, users, and production metadata.
- Coordinate AI provider adapters securely.
- Manage generation and rendering job requests.
- Connect application modules with database and storage layers.
- Enforce server-side validation, security, and usage limits.

These are proposed application boundaries. Their deployment model and workspace tooling are not finalized.



## 6. AI and Media Services — services/

The services/ directory organizes the platform's AI and media-processing responsibilities into modular domains. These are logical modules initially; separate deployment as microservices is not required or approved at this stage.

### 6.1 AI Orchestrator — services/ai-orchestrator/

- Coordinate requests between application modules and AI providers.
- Select configured provider adapters.
- Track generation requests, results, failures, and retries.
- Apply usage limits and provider-specific rules.

### 6.2 Story Engine — services/story-engine/

- Analyze user ideas, concepts, and story submissions.
- Develop story structures, characters, and screenplay content.
- Maintain story context and approved revisions.

### 6.3 Character Engine — services/character-engine/

- Create and update character profiles.
- Manage approved character references.
- Support visual identity and continuity across scenes.
- Connect character information with shot and scene planning.

### 6.4 Image Engine — services/image-engine/

- Coordinate AI image-generation requests.
- Generate character, location, costume, prop, and storyboard visuals.
- Track image versions and approvals.

### 6.5 Video Engine — services/video-engine/

- Coordinate video-generation requests.
- Generate planned shots and short clips.
- Track clip status, versions, and generation failures.
- Support character and scene continuity where provider capabilities allow.

### 6.6 Audio Engine — services/audio-engine/

- Coordinate dialogue and voice generation.
- Manage music and sound-effect assets.
- Support subtitles and audio synchronization workflows.

### 6.7 Rendering Engine — services/rendering-engine/

- Coordinate movie assembly and rendering.
- Combine approved video, audio, titles, and subtitles.
- Track render progress, errors, and output versions.
- Support final movie export workflows.

### 6.8 Shared Python Utilities — services/python-common/

Proposed location for reusable Python utilities shared by compatible Python processing modules. This is a shared utility area, not a standalone AI service. A Python framework and service runtime have not been selected.



## 7. Shared Packages — packages/

The packages/ directory contains reusable code shared by NOVA applications and compatible services.

### 7.1 Shared UI — packages/ui/

- Reusable interface components.
- Shared design tokens, themes, and visual styles.
- Consistent controls, forms, and layout elements.

### 7.2 Shared Types — packages/types/

- Common TypeScript types and interfaces.
- Project, character, scene, shot, asset, and job data contracts.
- Shared API request and response definitions.

### 7.3 Database Package — packages/database/

- Shared database connection and configuration code.
- Drizzle ORM schema and query modules.
- Common database access utilities.

### 7.4 Shared Configuration — packages/config/

- Reusable application configuration.
- Shared linting, formatting, and development conventions when selected.

### 7.5 Film Core — packages/film-core/

- Shared film-production domain rules.
- Common movie, department, scene, shot, and timeline concepts.
- Reusable validation and production workflow logic.

Root-level database/ resources will hold migration, seed, and database-operation resources, while packages/database/ will hold reusable application database code. Their exact implementation will be finalized during the relevant development steps.

No workspace manager or package build system has been selected yet.



## 8. Database Resources — database/

The database/ directory contains database resources used during development, testing, and future deployment.

### 8.1 Schema Resources — database/schema/

- Organize database schema documentation and related resources.
- Define relationships between users, projects, characters, scenes, shots, assets, and production jobs.
- Keep schema design aligned with the approved system architecture.

### 8.2 Migrations — database/migrations/

- Store version-controlled database structure changes.
- Track changes in a repeatable and reviewable way.
- Preserve migration history.

### 8.3 Seed Data — database/seeds/

- Store optional development and testing data.
- Provide sample projects and production records where useful.
- Never place real user passwords, API keys, or private data in seed files.

### 8.4 Database Operations — database/operations/

- Document backup and recovery procedures.
- Document database maintenance and verification tasks.
- Keep operational instructions separate from application code.

The existing PostgreSQL development database nova_ai_dev remains separate from this proposed directory structure. This document does not authorize database deletion, recreation, or migration.



## 9. Documentation — docs/

The docs/ directory is the proposed central location for future developer and module documentation.

### 9.1 Product Documentation — docs/product/

- Product vision, platform capabilities, and user workflows.
- User-facing feature explanations and guidance.

### 9.2 Architecture Documentation — docs/architecture/

- Architecture diagrams and technical design notes.
- Module relationships and system communication.

### 9.3 AI Provider Documentation — docs/ai-providers/

- Provider integration guides and adapter documentation.
- Model capabilities, limitations, and verification results.

### 9.4 Technical Stack Documentation — docs/technical-stack/

- Implementation guides for approved technologies.
- Development setup and compatibility notes.

### 9.5 Module Documentation — docs/modules/

- Responsibilities, inputs, outputs, and boundaries of each NOVA module.
- Module integration and testing guidance.

### 9.6 Development Documentation — docs/development/

- Development workflow and coding conventions.
- Setup, troubleshooting, and verification instructions.

Existing approved documents in architecture/, ai-provider-strategy/, and technical-stack/ remain in their current locations. This proposed docs/ structure does not authorize moving, deleting, or duplicating those documents.



## 10. Infrastructure — infrastructure/

The infrastructure/ directory organizes infrastructure configuration and operational resources for development and future deployment.

### 10.1 Development Infrastructure — infrastructure/development/

- Local development environment configuration.
- Development database and service setup guidance.
- Local testing and troubleshooting resources.

### 10.2 Cloud Infrastructure — infrastructure/cloud/

- Future cloud environment configuration.
- Server and compute resource definitions.
- Environment-specific infrastructure documentation.

### 10.3 Storage Infrastructure — infrastructure/storage/

- Object and media storage configuration.
- Asset access and storage lifecycle guidance.
- Storage security and backup documentation.

### 10.4 Deployment Infrastructure — infrastructure/deployment/

- Deployment configuration and release resources.
- Environment setup and deployment verification.
- Rollback and recovery guidance.

No cloud provider, GPU provider, hosting plan, or paid infrastructure service is selected or approved by this structure.



## 11. Scripts — scripts/

The scripts/ directory contains reusable automation and maintenance scripts.

### 11.1 Development Scripts — scripts/development/

- Development environment setup and verification.
- Safe local development helper commands.

### 11.2 Database Scripts — scripts/database/

- Database backup and restore helpers.
- Database health and connectivity checks.
- Migration support scripts after the migration workflow is approved.

### 11.3 Media Scripts — scripts/media/

- Media metadata inspection and validation.
- Video, image, and audio processing helpers.

### 11.4 Deployment Scripts — scripts/deployment/

- Deployment preparation and release automation.
- Deployment health checks and verification.

Scripts must use safe defaults, clearly document destructive operations, and must not expose passwords, API keys, or other secrets.



## 12. Testing — tests/

The tests/ directory organizes automated and manual verification resources for NOVA AI Studio.

### 12.1 Unit Tests — tests/unit/

- Verify individual functions and components.
- Test business rules and module-level logic.

### 12.2 Integration Tests — tests/integration/

- Verify communication between modules and services.
- Test database, AI provider adapters, and storage integrations.

### 12.3 End-to-End Tests — tests/end-to-end/

- Verify complete user workflows.
- Test story-to-movie production journeys and editing workflows.

### 12.4 Performance Tests — tests/performance/

- Evaluate response times, resource usage, and system behavior under load.
- Test media-processing and rendering workflows where suitable infrastructure is available.

Tests must use safe test data and must not expose real user information or credentials.



## 13. Film Industry Department Mapping

NOVA AI Studio organizes its capabilities around a real-world film production workflow. These departments represent logical product responsibilities and do not require separate servers or independently deployed services.

### 13.1 Development Department

- Idea and concept development.
- Story research and story understanding.
- Screenplay and narrative development.
- Creative planning and project approval.

### 13.2 Pre-Production Department

- Character profiles and Character Library.
- Location, costume, and prop planning.
- Storyboards and visual references.
- Scene breakdown and shot planning.

### 13.3 Production Department

- AI image and visual generation.
- AI video shot and scene generation.
- Camera-angle and shot variations.
- Character appearance and visual continuity checks.

### 13.4 Post-Production Department

- Film editing and timeline management.
- Dialogue, voice, music, and sound effects.
- Subtitles, visual effects, and color correction.
- Audio and visual quality review.

### 13.5 Movie Assembly and Delivery Department

- Scene and shot assembly.
- Final movie rendering.
- Technical and playback quality checks.
- Export and delivery of the finished movie.

Each department must work with shared project data, approved assets, and clear handoff points so the complete production workflow remains connected.



## 14. Long-Form Movie Production

NOVA must support a production workflow capable of assembling long-form movies from multiple individually generated shots and clips.

### 14.1 Production Planning

- Break approved screenplays into scenes and individual shots.
- Maintain shot descriptions, duration targets, camera instructions, and continuity requirements.
- Track production progress and approval status.

### 14.2 Short-Clip Generation

- Generate video clips according to approved shot plans.
- Reuse approved character and visual references wherever supported.
- Allow failed or unsuitable shots to be reviewed and regenerated.
- Track clip versions and generation status.

### 14.3 Continuity and Asset Management

- Maintain character appearance and scene continuity references.
- Associate generated clips with their projects, scenes, and shots.
- Preserve approved assets and their version history.

### 14.4 Movie Assembly

- Arrange approved clips on the editing timeline.
- Synchronize dialogue, music, sound effects, and subtitles.
- Support transitions and other post-production operations.

### 14.5 Long-Form Rendering and Delivery

- Assemble multiple scenes into longer movie projects.
- Render the final movie using available processing infrastructure.
- Verify output integrity, playback, synchronization, and export quality.

Long-form movie creation depends on provider duration limits, generation quality, retries, processing capacity, storage, rendering time, and available resources. Support for one-, two-, or three-hour movies is a long-term platform capability, not a guarantee of instant or one-click generation.



## 15. Data and Media Storage Boundary

NOVA separates structured application data from large media files.

### 15.1 PostgreSQL Database

PostgreSQL stores structured records and relationships, including:

- User accounts and project metadata.
- Characters, scenes, shots, and production jobs.
- Asset metadata, file references, and version information.
- Editing timelines, workflow states, and approval records.

### 15.2 Media and Object Storage

A dedicated media or object storage system is intended for large binary files, including:

- Generated and uploaded videos.
- Character reference images and other visual assets.
- Dialogue, voice recordings, music, and sound effects.
- Rendered movie exports and intermediate media files.

### 15.3 Database-to-Storage Relationship

- Store media file references and relevant metadata in PostgreSQL.
- Keep large media binaries outside ordinary database records.
- Associate each stored asset with its owning project and relevant production records.
- Apply suitable access control and lifecycle policies.

### 15.4 Backup and Recovery

- Define database backup and restoration procedures.
- Protect important media assets and their references.
- Plan recovery verification for both structured data and stored media.

The exact production storage provider and service are not selected or approved at this stage.



## 16. Security Boundaries

Security must be built into every application, service, package, and infrastructure boundary.

### 16.1 User and Account Security

- Protect user authentication and account information.
- Enforce authorization and project-level access permissions.
- Prevent users from accessing other users' private projects and assets.

### 16.2 API and Credential Security

- Keep AI provider API keys and service credentials on trusted server-side environments.
- Never expose private credentials in frontend code, public repositories, logs, or documentation.
- Use environment-based secret configuration and controlled access.

### 16.3 Media and Asset Security

- Restrict access to private uploaded and generated media.
- Validate uploaded files and enforce appropriate file-access policies.
- Protect media references and download permissions.

### 16.4 Application and Database Security

- Validate untrusted input at application boundaries.
- Use secure database access and least-privilege permissions.
- Protect sensitive data during transmission and storage.

### 16.5 Privacy and Operational Safety

- Define data retention and deletion procedures.
- Avoid logging passwords, API keys, or unnecessary private information.
- Maintain security checks, backups, and incident recovery procedures.

Detailed security implementation will be developed in accordance with Phase 12 of the approved roadmap.



## 17. Development and Deployment Strategy

NOVA follows the approved Phone + Cloud Development Architecture.

### 17.1 Phone-Based Development

- Use Android and Termux for coding, documentation, and project management.
- Perform basic development checks and lightweight testing where compatible.
- Keep project files and backups organized.

### 17.2 Laptop-Based Development

- Use a laptop for development tasks supported by its hardware and operating system.
- Perform heavier local testing and development when practical.
- Do not assume that every AI or media-processing workload can run locally.

### 17.3 Cloud-Based Infrastructure

- Plan cloud infrastructure for production backend services.
- Use suitable cloud resources for database hosting, media storage, and heavy processing.
- Select compute resources according to actual workload and budget.

### 17.4 Environment Separation

- Keep development, testing, and production configurations separate.
- Protect production credentials and user data.
- Verify changes before production deployment.

### 17.5 Deployment Principles

- Follow controlled release and deployment procedures.
- Verify application health after deployment.
- Maintain backup and recovery procedures.

Cloud infrastructure is a strategy across the roadmap, not an additional project phase. No cloud vendor, GPU provider, or paid infrastructure plan is approved yet.



## 18. Decisions Not Finalized

The following decisions remain open and must not be treated as approved selections:

- Workspace and monorepo management tooling.
- Python application framework and service runtime.
- Background job and task queue technology.
- Cloud infrastructure vendor and deployment platform.
- GPU and media-processing infrastructure provider.
- Production AI providers and their final model assignments.
- Paid API plans, cloud subscriptions, and other paid services.
- Production storage and delivery provider.
- Final application deployment topology.
- Production PostgreSQL configuration and migration-workflow verification.
- Authentication and session implementation details.
- Video rendering and transcoding implementation.
- Production monitoring and logging services.
- Billing and payment integration.

Each decision must be evaluated against project requirements, technical compatibility, security, reliability, scalability, and budget before approval.

No unselected tool, vendor, framework, or paid service may be introduced as an approved project decision without explicit user approval.



## 19. Exact Approved 16-Phase Roadmap

NOVA AI Studio will follow the exact approved 16-phase roadmap:

1. Project Foundation & Architecture
2. AI Movie Studio Interface
3. Story Input & Story Understanding Engine
4. Dynamic Character Cards System
5. AI Image Generation & Visual Design
6. Screenplay & Scene Breakdown Engine
7. AI Video Generation Engine
8. AI Audio, Dialogue & Voice Studio
9. Film Editor & Movie Assembly
10. One-Click Automatic Movie Creation
11. Projects, Database & Asset Management
12. Security, Privacy & API Cost Controls
13. Performance, Reliability & Quality Assurance
14. Deployment & Initial Release
15. NOVA AI Engine Integration
16. Future Film Industry Capabilities

This roadmap is fixed and approved. Its phase names, order, and total count must not be changed, reordered, or expanded without explicit user authorization.



## 20. Implementation Boundary

The directory structure defines logical application, service, package, and infrastructure boundaries.

- A separate directory does not automatically mean a separately deployed service.
- AI and media engines may initially operate as modular components within a suitable application architecture.
- Separate deployment or service extraction must be justified by workload, scalability, reliability, security, and operational requirements.
- Shared types, database access, and common functionality should have clear ownership and controlled dependencies.
- Implementation must follow the approved architecture and technical stack while respecting unresolved decisions.
- New modules and capabilities must be added without unnecessarily disrupting existing approved components.

The actual deployment topology and implementation details will be finalized during the relevant roadmap phases.



## 21. Step 1.5 Approval Criteria

The Master Project Structure may be approved only after the following checks:

- The proposed directory structure supports the approved modular monorepo architecture.
- All required film-production departments and platform modules have clear logical locations.
- The structure supports short-shot production and long-form movie assembly.
- Character profiles, reusable assets, editing timelines, and project data have appropriate ownership.
- Application code, shared packages, database resources, documentation, infrastructure, and tests have clear boundaries.
- Existing approved documents, dependencies, backups, and unrelated files are preserved.
- The exact approved 16-phase roadmap remains unchanged.
- Unfinalized technology, provider, deployment, and paid-service decisions remain explicitly open.
- The structure is practical for the approved Phone + Cloud development approach.

Approval of this document will approve the documented project structure, not automatically authorize implementation, installation of additional tools, paid services, or changes to existing files.



## 22. Next Step

After completing this draft:

1. Review the complete Master Project Structure document.
2. Audit the proposed directory tree against the approved system architecture and technical stack.
3. Identify any duplication, missing ownership, or unnecessary complexity.
4. Review unresolved structural choices with the user.
5. Prepare the matching machine-readable JSON document after the Markdown structure is reviewed.
6. Run document, JSON, roadmap, and cross-document consistency checks.
7. Obtain explicit user approval before marking Step 1.5 complete.

No existing project files or directories will be moved, renamed, or deleted as part of this documentation review.
