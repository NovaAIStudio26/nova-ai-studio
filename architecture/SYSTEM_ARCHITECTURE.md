# NOVA AI Studio — System Architecture

## 1. Document Information

- Project: NOVA AI Studio
- Product: AI Movie Maker Studio
- Vision: AI Film Industry Platform
- Phase: 1
- Sub-step: 1.2
- Status: Completed — Approved
- Document Type: System Architecture
- Architecture Approach: Modular, scalable, provider-neutral and extensible
- Related Approved Document: PROJECT_SPECIFICATION.md

## 2. Architecture Goals

The architecture must:

- Support the complete story-to-movie production workflow.
- Support Guided Automatic and Advanced Manual production modes.
- Support projects containing dynamic numbers of characters, scenes, shots and takes.
- Provide reusable character libraries and persistent character identities.
- Support character appearance and continuity management across production assets.
- Organize large numbers of prompts and generation requests.
- Separate application logic from external AI provider integrations.
- Support asynchronous and long-running media generation.
- Support timeline-based film editing and movie assembly.
- Provide a foundation for approximately 1-hour, 2-hour and 3-hour movie projects.
- Preserve project progress, production history and generated assets.
- Support scalable media storage, recovery and export workflows.
- Protect user data, uploaded content and API credentials.
- Support multilingual dialogue, voice and subtitle workflows.
- Allow gradual integration of NOVA's own AI models and services.
- Support progressive development, testing and quality verification.

These goals describe the intended architecture. They do not claim that every capability is already implemented or that external providers can currently generate complete long-form movies.

## 3. Architecture Principles

The architecture will follow these principles:

1. Modular responsibilities: Each major service has a clear responsibility.
2. Separation of concerns: User interfaces, business logic, AI integrations, storage and media processing remain separate.
3. Provider neutrality: Application workflows should not depend unnecessarily on one AI provider.
4. Data ownership: NOVA manages its own project records, character identities, production plans and asset metadata.
5. Persistent identity: Characters and production assets receive stable identifiers.
6. Asynchronous processing: Long-running generation and rendering tasks must not block normal application requests.
7. Recoverability: Completed work should remain available when later jobs fail.
8. Cost awareness: Potentially costly operations require usage tracking and appropriate user controls.
9. Security by design: Credentials, user data and media access must be protected.
10. Replaceable components: Providers and infrastructure components should be replaceable through controlled interfaces.
11. Human review: Users retain control over important creative decisions and approvals.
12. Evidence-based capabilities: A capability is not considered supported until it has been implemented and tested.

## 4. High-Level System Components

The system is divided into these logical components:

1. Frontend Application
2. Backend API and Application Services
3. Authentication and Authorization
4. User and Project Management
5. Story Understanding Service
6. Screenplay and Production Planning Service
7. Character Library Service
8. Character Consistency and Continuity Service
9. Location and Reference Asset Management
10. Scene, Shot and Take Management
11. Prompt and Batch Production Management
12. AI Provider Integration Layer
13. Background Job Orchestration
14. Image and Video Generation Services
15. Audio, Dialogue and Voice Services
16. Film Timeline and Editing Service
17. Movie Assembly and Rendering Service
18. Media and Asset Management
19. Database
20. Media Storage
21. Usage, Cost and Quota Management
22. Monitoring, Logging and Error Handling
23. NOVA AI Engine Integration Layer

These are logical components. Their final deployment boundaries may be implemented as modules, services or workers according to the approved technical stack and actual scaling requirements.

## 5. Frontend Application

The frontend will provide:

- User registration and authentication interfaces.
- Project dashboard and project creation.
- Story input, editing and saving.
- Story analysis review and correction.
- Production mode selection.
- Character library and dynamic character cards.
- Character profile editing and reference image management.
- Location and visual reference management.
- Screenplay, act, sequence and scene editing.
- Shot and take planning.
- Prompt creation, organization and review.
- Image, video, voice and audio generation controls.
- Batch generation controls where supported.
- Job progress, queue status and error messages.
- Generated asset review and approval.
- Timeline-based film editing.
- Video, dialogue, music, sound effect and subtitle tracks.
- Project settings, usage information and export controls.

The frontend must support both Guided Automatic and Advanced Manual workflows.

The frontend must never contain private server-side AI API keys.

Large generation tasks must be handled through backend job services rather than relying on a browser session remaining open.

## 6. Backend API and Application Services

The backend will coordinate:

- Authentication and authorization.
- User and project operations.
- Story analysis requests.
- Character, location and reference asset operations.
- Screenplay, scene, shot and take operations.
- Prompt management and validation.
- Generation requests and job creation.
- Provider selection and capability checks.
- Job status and progress information.
- Media asset metadata.
- Timeline and assembly operations.
- Usage, quota and cost information.
- Export requests.
- Validation and understandable error responses.

The backend will enforce ownership and permissions before accessing projects or assets.

Business rules must remain independent of provider-specific API formats wherever practical.

## 7. Story Understanding and Screenplay Services

### 7.1 Story Understanding

The Story Understanding Service will analyze user-provided stories and identify:

- Main and supporting characters.
- Character relationships and development.
- Ages when provided by the story.
- Locations and important objects.
- Story events and chronology.
- Potential acts, sequences and scenes.
- Dialogue requirements.
- Emotional and narrative changes.
- Continuity information.
- Uncertain or missing story information.

The user must be able to review, correct and approve the analysis.

Uncertain information must not be presented as confirmed story facts.

### 7.2 Screenplay and Production Planning

The production planning service will organize approved story information into:

- Story structure.
- Acts.
- Sequences.
- Scenes.
- Shots.
- Takes and alternate versions.

It should preserve the relationship between the original story, screenplay, scene breakdown and generated media.

Automatic breakdown is an assisted workflow. Users must be able to edit and approve the results.

## 8. Character Library Service

The Character Library Service will provide persistent reusable character profiles.

A character record may contain:

- Stable character ID.
- Character name and aliases.
- Description and personality.
- Story role.
- Age or age range when specified.
- Physical appearance.
- Hair, clothing and identifying details.
- Voice profile references where available.
- Character reference images.
- Approved visual references.
- Continuity instructions.
- Relationships with other characters.
- Version and revision history.
- Creation and update timestamps.
- User approval status.

Requirements:

- Characters can be created, edited, archived and reused.
- Characters can be associated with multiple scenes.
- Character identities must not depend on temporary prompt text.
- Reusable character profiles must remain available across sessions and projects according to user permissions.
- Changes to a character profile must not silently rewrite previously approved production assets.
- Historical versions should be traceable where appropriate.
- Reference images must be stored and accessed securely.

The library must support growing character collections without assuming a fixed maximum number.

## 9. Character Consistency and Continuity Service

This service will help preserve character identity across images, shots and scenes.

It should manage:

- Stable character identifiers.
- Approved reference image sets.
- Appearance descriptions.
- Clothing and appearance state by scene.
- Age and timeline changes where relevant.
- Scene-specific visual instructions.
- Voice identity references where supported.
- Continuity notes.
- Approved and rejected visual versions.
- Links between characters and generated assets.

The service should select suitable character references and pass them to providers that support the required reference capabilities.

It should record which references and generation settings were used for each asset where available.

Character consistency is a quality objective, not a guarantee. Actual results depend on models, reference support, prompt quality and human review.

## 10. Location and Reference Asset Management

The system should support reusable production references such as:

- Locations.
- Buildings and interiors.
- Props and important objects.
- Costumes.
- Visual styles.
- Lighting references.
- Environment references.
- Other production assets.

Each reusable reference should have a stable identifier, description, ownership information and associated media records.

References may be linked to projects, characters, scenes and shots.

## 11. Scene, Shot and Take Management

The production structure should follow this hierarchy:

Project
→ Movie
→ Act
→ Sequence
→ Scene
→ Shot
→ Take
→ Generated Asset

The system should support:

- Scene ordering and numbering.
- Shot types and camera instructions.
- Camera movement and framing notes.
- Scene duration targets.
- Shot duration targets.
- Character and location references.
- Dialogue and action instructions.
- Lighting and visual direction.
- Continuity requirements.
- Multiple takes and alternate versions.
- Approval and rejection status.
- Links to generated image, video and audio assets.

The hierarchy must support large productions and should not depend on a small fixed number of scenes or shots.

## 12. Prompt and Batch Production Management

The Prompt Management Service will organize prompts independently from individual generation providers.

It should support:

- Story-level, character-level, scene-level and shot-level prompts.
- Reusable prompt templates.
- Prompt versions and revision history.
- Prompt variables and structured inputs.
- Character and location reference links.
- Validation before submission.
- Prompt grouping and production batches.
- Individual and batch generation requests.
- Job-to-prompt traceability.
- Retry and recovery tracking.
- Generation status and result review.

The architecture should support projects with hundreds or more prompts, subject to infrastructure, provider limits, processing capacity and cost.

Batch generation must respect provider rate limits and user-configured spending controls.

The system must not silently resubmit completed paid requests.

## 13. AI Provider Integration Layer

AI provider integrations must remain separate from core application logic.

The integration layer should:

- Support configured external providers.
- Normalize requests and responses where practical.
- Maintain provider capability records.
- Check supported models, media types and reference features.
- Handle timeouts, rate limits and provider errors.
- Support appropriate retry policies.
- Track usage, quotas and costs where available.
- Protect credentials.
- Record provider and model information for generated assets.
- Support controlled provider substitution.
- Allow future integration of NOVA-owned models.

Image, video, text, voice, music and sound effects may require different providers.

A capability must not be advertised as supported until its provider requirements and implementation have been verified.

No production provider is finalized by this architecture document.

## 14. Background Job Orchestration

Long-running operations should run as background jobs where appropriate.

Examples include:

- Story analysis.
- Prompt batch processing.
- Image generation.
- Video generation.
- Dialogue and voice generation.
- Music and sound effect generation.
- Media conversion.
- Thumbnail generation.
- Movie rendering and export.

A job should record:

- Unique job identifier.
- Project and asset association.
- Job type.
- Provider and model where applicable.
- Status.
- Creation, start and completion timestamps.
- Progress where available.
- Retry count.
- Cost and usage information where available.
- Error details.
- Result references.

Possible states include:

- queued
- running
- succeeded
- failed
- cancelled
- retry_waiting

The orchestration system should support:

- Concurrency controls.
- Provider-specific rate limits.
- Priority where appropriate.
- Retry policies.
- Cancellation where supported.
- Duplicate request protection.
- Recovery after worker interruption.
- Preservation of completed results.
- Visibility into failed and delayed tasks.

Retries must not unintentionally create duplicate paid operations.

## 15. Image and Video Generation Services

Generation services will coordinate image and video tasks through the provider integration layer.

They should support:

- Character reference images.
- Environment and location images.
- Scene concept images.
- Storyboards and shot references.
- Video clips.
- Supported reference-based generation.
- Generation settings and model information.
- Result validation and asset registration.
- User review and approval.
- Alternate takes and regeneration.

Video generation is expected to produce individual clips or shots where required. Long-form movies will be created through planned production, asset management, editing and assembly workflows rather than assuming one provider generates an entire movie in one request.

Actual duration, resolution, reference limits and generation capabilities depend on the selected provider.

## 16. Audio, Dialogue and Multilingual Services

The audio architecture should support:

- Dialogue text.
- Character voice profile references.
- Voice generation.
- Voice recording uploads.
- Background music.
- Sound effects.
- Audio asset management.
- Subtitle generation and editing.
- Language and locale metadata.
- Audio-to-scene and audio-to-shot associations.
- Timeline synchronization.
- Audio review and replacement.

Voice identity consistency and multilingual quality must be tested with selected providers.

Language availability, pronunciation quality, voice cloning permissions and commercial usage rights must be verified rather than assumed.

## 17. Film Timeline and Editing Service

The editing system should provide a foundation for beginner-friendly timeline editing.

It should support:

- Projects and editable timelines.
- Video tracks.
- Dialogue and voice tracks.
- Music tracks.
- Sound effect tracks.
- Subtitle and caption tracks.
- Clip placement and ordering.
- Trim, split and move operations.
- Track enable and disable controls.
- Clip duration and timing.
- Audio level controls where supported.
- Basic transitions and supported effects.
- Preview and playback.
- Saveable editing state.
- Undo and redo architecture.
- Timeline versioning where appropriate.

The interface should aim for an accessible workflow comparable in ease to familiar consumer video editors.

The final editing feature set and media format support will depend on technical stack selection and testing.

## 18. Movie Assembly and Rendering Service

The assembly service will combine approved media assets according to the saved timeline and export configuration.

Responsibilities include:

- Timeline interpretation.
- Media validation.
- Clip ordering.
- Video and audio synchronization.
- Subtitle integration.
- Supported transitions and effects.
- Resolution and frame-rate configuration.
- Audio encoding and mixing.
- Rendering job creation.
- Export progress and errors.
- Output validation.
- Final movie asset registration.

Rendering must run through appropriate background processing.

Interrupted exports should be recoverable where technically feasible.

The architecture must distinguish an editable project from a rendered movie file.

## 19. Long-Form Movie Production

The architecture should be designed with future support for:

- Approximately 1-hour movie projects.
- Approximately 2-hour movie projects.
- Approximately 3-hour movie projects.

These are long-term production targets, not current verified capabilities.

Long-form production requires:

- Large screenplay and scene structures.
- Character and location continuity.
- Potentially hundreds or thousands of shots.
- Large prompt collections.
- Batch generation and queue management.
- Asset indexing and retrieval.
- Timeline editing.
- Audio and subtitle synchronization.
- Storage capacity planning.
- Rendering and export management.
- Recovery and project backups.
- Cost and time estimates.
- Human review and quality control.

The system must communicate generation time, provider limitations, estimated costs and storage requirements where information is available.

Actual production scale depends on infrastructure, provider limits, generation quality, storage, processing capacity and budget.

## 20. Database Architecture

Structured application data will use a SQL database category.

Potential data groups include:

- Users and authentication records.
- Projects and movies.
- Acts, sequences and scenes.
- Characters and character versions.
- Locations and reusable references.
- Shots and takes.
- Prompts and prompt versions.
- Generation jobs.
- Media asset metadata.
- Timelines and track records.
- Export configurations and records.
- Provider configurations.
- Usage and cost records.
- Approval and audit events.

The exact database engine, tables, relationships, indexes, migrations and retention rules will be selected during later technical design.

Large binary media should not normally be stored directly in ordinary relational database records.

Private credentials must not be stored as ordinary plaintext values.

## 21. Media and Asset Storage

Media may include:

- Character reference images.
- Location and environment images.
- Storyboards.
- Scene images.
- Video clips.
- Dialogue recordings.
- Voice tracks.
- Background music.
- Sound effects.
- Subtitles.
- Project previews.
- Final movie exports.

Asset metadata should be managed separately from media file contents where appropriate.

Asset records should track:

- Stable asset ID.
- Owner and project association.
- Character, scene, shot or take association where relevant.
- Media type and format.
- Storage reference.
- File size and duration where available.
- Creation status.
- Provider and model information where available.
- Creation timestamp.
- Version and approval status.

Storage architecture should consider:

- Large media libraries.
- Efficient upload and download.
- Access control.
- Backup and recovery.
- Asset integrity checks.
- Retention and deletion policies.
- Storage costs.
- Scalable storage providers.

Storage technology and retention policies remain undecided.

## 22. Project Management and Recovery

Projects should preserve:

- Story and screenplay data.
- Character library references.
- Scene and shot structures.
- Prompts and their versions.
- Generation job history.
- Generated assets.
- Editing timelines.
- Export records.
- Approval history.

The system should support:

- Project save and retrieval.
- Draft and approved states.
- Recovery from interrupted tasks where feasible.
- Asset relinking and integrity checks.
- Controlled project deletion.
- Backup and restoration planning.
- Clear project status and production progress.

A completed generation asset must not be lost merely because a later generation or rendering job fails.

## 23. Security and Privacy

The architecture must include:

- Authentication and authorization.
- Project-level access controls.
- Server-side API credential protection.
- Secure secret management.
- Input validation.
- Secure upload and file handling.
- Appropriate protection of user-generated content.
- Clear disclosure of external provider processing.
- Project and asset deletion controls.
- Safe logging without exposing secrets.
- Access-controlled media delivery.
- Security testing before public release.

Credentials must never be exposed in frontend code, public repositories or ordinary logs.

## 24. Usage, Cost and Quota Controls

The system should track provider usage and costs where supported.

Where feasible, it should support:

- Estimated cost before generation.
- User-configured spending limits.
- Confirmation before costly operations.
- Usage history.
- Provider quota monitoring.
- Cost attribution to projects and jobs.
- Handling of billing and quota errors.
- Prevention of duplicate paid requests.

Cost estimates must be labeled as estimates and not guaranteed final charges.

Free, trial and paid provider limits must be represented accurately.

## 25. Monitoring, Reliability and Error Handling

The architecture should support:

- Request validation.
- Understandable errors.
- Structured application logs.
- Operational monitoring.
- Job and worker monitoring.
- Timeouts.
- Rate-limit handling.
- Appropriate retries.
- Duplicate request protection.
- Recovery from interrupted tasks where feasible.
- Preservation of completed assets.
- Automated tests.
- Performance monitoring.
- Provider failure handling.

Errors must be traceable to the relevant project, job and asset without exposing private credentials.

## 26. NOVA AI Engine Integration

The architecture must leave clear boundaries for future NOVA-owned AI models and services.

NOVA may progressively develop its own capabilities for:

- Story understanding.
- Character and continuity assistance.
- Image processing.
- Video-related processing.
- Audio and dialogue processing.
- Other suitable AI tasks.

External providers may be replaced individually only when NOVA's own capabilities meet the required quality, cost, performance, security and reliability standards.

The architecture must not assume that all external providers can immediately be replaced by local models.

Every replacement must be tested and verified before production use.

## 27. High-Level Data Flow

1. User creates a project.
2. User enters and saves a story.
3. Backend validates the story.
4. Story Understanding Service analyzes the content.
5. User reviews and approves the analysis.
6. Character and location records are created or reused.
7. Screenplay, acts, sequences and scenes are prepared.
8. Scenes are broken into shots and takes.
9. Prompts and references are prepared.
10. User approves production inputs.
11. Backend creates generation jobs.
12. Job orchestration schedules suitable tasks.
13. Provider integration calls a configured provider.
14. Generated results are validated and registered as assets.
15. User reviews and approves generated media.
16. Additional image, video and audio tasks are processed.
17. Approved assets are placed into the editing timeline.
18. User edits and reviews the movie.
19. Assembly service renders the configured export.
20. Output is validated and saved.
21. Project history and assets remain available for later work.

Every stage must handle errors without assuming that every provider or media capability is always available.

## 28. Technology Mapping

The original Phase 1 technology mapping is preserved:

- TypeScript: application and integration architecture.
- Python: AI processing architecture.
- SQL: structured data architecture.
- JSON: structured configuration and data exchange.

Additional technology categories may be evaluated later:

- HTML and CSS for web presentation.
- JavaScript and TypeScript for frontend and application logic.
- Bash for development and deployment automation.
- FFmpeg for supported media processing and rendering workflows.
- C++ for future performance-critical components where justified.

Step 1.4 has approved the following technical stack: Next.js and React for the frontend; Node.js and TypeScript for the main backend; Python for AI and media processing; PostgreSQL for structured data; and Drizzle ORM, node-postgres (`pg`), and Drizzle Kit for PostgreSQL integration and migrations. Approval of these technologies does not mean every runtime, deployment, or migration workflow has been verified.

## 29. Architecture Decisions Still Required

The following implementation decisions still require evaluation:

- Detailed frontend application structure and route implementation.
- Backend framework and API design.
- Python service boundaries, framework and runtime.
- Production PostgreSQL hosting provider and configuration.
- Drizzle Kit installation and migration-workflow verification.
- Background job queue and worker design.
- Media storage provider.
- Authentication and session implementation.
- Media processing and rendering implementation.
- Timeline data model.
- Deployment environment and topology.
- Production AI provider and model selection.
- Testing, monitoring and logging tools.
- Backup and recovery strategy.

The selected technologies remain subject to practical compatibility, security, reliability, cost and performance verification.

This architecture does not prematurely finalize the remaining implementation choices.

## 30. Completion Criteria

Step 1.2 requires:

- Defining major system components.
- Explaining component responsibilities.
- Describing high-level data flow.
- Defining the AI provider integration boundary.
- Defining reusable character library responsibilities.
- Addressing character consistency and continuity.
- Defining scene, shot and take management.
- Addressing large prompt and batch production management.
- Defining database and media storage responsibilities.
- Planning background jobs and recovery.
- Defining timeline editing and movie assembly responsibilities.
- Addressing long-form production targets and limitations.
- Addressing audio and multilingual requirements.
- Addressing security, privacy and cost controls.
- Preserving future NOVA AI Engine integration.
- Validating the Markdown and JSON documents against each other.
- Reviewing the architecture before technical stack selection.
- Receiving explicit user approval before marking the step complete.

## 31. Roadmap Boundary

Current step: Phase 1, Sub-step 1.2 — System Architecture.

Next step after approval: Phase 1, Sub-step 1.3 — AI Provider Strategy.

Step 1.2 has passed verification, both architecture documents have passed their audits, and explicit user approval has been received. Step 1.2 is complete and approved.

Step 1.3 must receive its own final review and explicit approval before Phase 1, Sub-step 1.4 — Technical Stack can begin.

Public documentation research does not count as a successful authenticated API test.

Account access, proof-of-concept testing, provider availability, commercial terms and production provider selection remain pending until verified with appropriate project accounts and recorded evidence.

The approved 16-phase roadmap must not be silently reordered, shortened or replanned.
