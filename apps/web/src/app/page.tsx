const projects = [
  {
    id: "NOVA-001",
    title: "The Last Mountain",
    genre: "Adventure · Drama",
    updated: "Updated recently",
    status: "Processing",
    progress: 68,
    color: "mountain",
    duration: "12 min",
  },
  {
    id: "NOVA-002",
    title: "Beyond the Stars",
    genre: "Sci-Fi · Adventure",
    updated: "Updated today",
    status: "Draft",
    progress: 0,
    color: "stars",
    duration: "25 min",
  },
  {
    id: "NOVA-003",
    title: "Echoes of Tomorrow",
    genre: "Thriller · Mystery",
    updated: "Updated yesterday",
    status: "Completed",
    progress: 100,
    color: "city",
    duration: "18 min",
  },
  {
    id: "NOVA-004",
    title: "The Silent Forest",
    genre: "Fantasy · Drama",
    updated: "Updated 2 days ago",
    status: "Draft",
    progress: 0,
    color: "forest",
    duration: "15 min",
  },
];

const statusItems = [
  {
    label: "Draft Movies",
    count: projects.filter((project) => project.status === "Draft").length,
    className: "draft",
  },
  {
    label: "Processing Movies",
    count: projects.filter((project) => project.status === "Processing").length,
    className: "processing",
  },
  {
    label: "Completed Movies",
    count: projects.filter((project) => project.status === "Completed").length,
    className: "completed",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="project-card">
      <div className={`project-art ${project.color}`}>
        <span className="art-label">NOVA ORIGINAL</span>
        <span className="art-decoration" aria-hidden="true" />
        <span className="art-title">{project.title}</span>
        <span className="art-duration">{project.duration}</span>
      </div>

      <div className="project-info">
        <div className="project-heading">
          <div>
            <h3>{project.title}</h3>
            <p>{project.genre}</p>
          </div>
          <span className={`status-badge ${project.status.toLowerCase()}`}>
            <span className="status-dot" />
            {project.status}
          </span>
        </div>

        <div className="project-progress">
          <div className="progress-label">
            <span>Production progress</span>
            <strong>{project.progress}%</strong>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label={`${project.title} production progress`}
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${project.progress}%` }} />
          </div>
        </div>

        <div className="project-footer">
          <span>{project.id}</span>
          <span>{project.updated}</span>
        </div>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  return (
    <main className="studio-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="NOVA AI Studio home">
          <span className="brand-symbol">N</span>
          <span>
            <strong>NOVA</strong>
            <small>AI STUDIO</small>
          </span>
        </a>

        <div className="sidebar-section">
          <span className="sidebar-label">WORKSPACE</span>
          <a className="nav-link active" href="#dashboard">
            <span className="nav-icon">▦</span>
            Dashboard
          </a>
          <a className="nav-link" href="#recent-projects">
            <span className="nav-icon">▤</span>
            My Movies
          </a>
          <a className="nav-link" href="#movie-status">
            <span className="nav-icon">◷</span>
            Production Status
          </a>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">FILM DEPARTMENTS</span>
          <span className="nav-link muted"><span className="nav-icon">✧</span> Story Studio</span>
          <span className="nav-link muted"><span className="nav-icon">♙</span> Character Studio</span>
          <span className="nav-link muted"><span className="nav-icon">▧</span> Scene Studio</span>
          <span className="nav-link muted"><span className="nav-icon">♫</span> Audio Studio</span>
          <span className="nav-link muted"><span className="nav-icon">▥</span> Film Editor</span>
        </div>

        <div className="sidebar-bottom">
          <a className="nav-link" href="#settings">
            <span className="nav-icon">⚙</span>
            Settings
          </a>
          <div className="studio-version">
            <span className="version-indicator" />
            Studio workspace
            <small>Early development</small>
          </div>
        </div>
      </aside>

      <section className="dashboard-main" id="dashboard">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-divider">/</span>
            <strong>Dashboard</strong>
          </div>
          <div className="topbar-right">
            <span className="environment-label">DEVELOPMENT</span>
            <div className="user-avatar" aria-label="User profile">U</div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-section">
            <div>
              <span className="eyebrow">YOUR CREATIVE COMMAND CENTER</span>
              <h1>Welcome to your studio<span>.</span></h1>
              <p>Your stories. Your vision. Your next great film starts here.</p>
            </div>
            <a className="new-movie-button" href="#new-movie">
              <span>＋</span>
              New Movie
            </a>
          </section>

          <section className="overview-grid" id="movie-status" aria-label="Project overview">
            {statusItems.map((item) => (
              <article className="overview-card" key={item.label}>
                <div className={`overview-icon ${item.className}`}>
                  {item.className === "draft" ? "▤" : item.className === "processing" ? "◷" : "✓"}
                </div>
                <div>
                  <span>{item.label}</span>
                  <strong>{item.count.toString().padStart(2, "0")}</strong>
                </div>
                <span className={`overview-indicator ${item.className}`} />
              </article>
            ))}
          </section>

          <section className="projects-section" id="recent-projects">
            <div className="section-heading">
              <div>
                <span className="eyebrow">YOUR FILM LIBRARY</span>
                <h2>Recent Projects</h2>
                <p>Pick up where your creativity left off.</p>
                <div className="demo-data-notice" role="note">
                  <span className="demo-data-label">DEMO DATA</span>
                  <span>Illustrative projects — not your saved movies.</span>
                </div>
              </div>
              <a className="text-link" href="#recent-projects">View all projects <span>→</span></a>
            </div>

            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section className="new-project-panel" id="new-movie">
            <div className="new-project-symbol">✦</div>
            <div>
              <span className="eyebrow">READY TO CREATE?</span>
              <h2>Every great film begins with an idea.</h2>
              <p>Start a new movie project and bring your imagination to the screen.</p>
            </div>
            <span className="coming-soon-label">PROJECT CREATION · STEP 2.2</span>
          </section>

          <footer className="dashboard-footer">
            <span>© 2026 NOVA AI Studio</span>
            <span>Crafting the future of filmmaking.</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
