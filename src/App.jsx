import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import {
  awards,
  competitions,
  education,
  entrepreneurship,
  experience,
  languages,
  leadership,
  profile,
  projects,
  publicationGroups,
  publications,
  references,
  sections,
  siteMeta,
  timelineEvents
} from "./content/index.js";
import {
  fallbackTitleIcon,
  getActionIcon,
  newsIconMap,
  profileIconMap,
  publicationGroupIconMap,
  sectionIconMap,
  statusIconMap,
  venueIcon
} from "./icons.js";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeTab, setActiveTab] = useState(getInitialHash);

  useEffect(() => {
    document.title = siteMeta.title;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveTab(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navItems = useMemo(
    () => sections.map((section) => ({ id: section.id, href: `#${section.id}`, label: section.nav })),
    []
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Mobile Nav Backdrop */}
      {menuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      {/* Mobile Nav Drawer (Root level for reliable mobile rendering) */}
      <aside className={`mobile-nav-drawer ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
        <div className="mobile-nav-header">
          <span>Navigation Menu</span>
          <button type="button" className="mobile-nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <div className="mobile-nav-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeTab === item.id ? "active" : ""}
              onClick={() => {
                setActiveTab(item.id);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </aside>

      {/* Header Bar */}
      <header className="site-header">
        <a className="brand" href="#hero" onClick={() => setActiveTab("hero")} aria-label="Aditya S Maller home">
          <div className="brand-badge">ASM</div>
          <span className="brand-name">{siteMeta.brand}</span>
          <span className="brand-affiliation">SPIRE Lab — IISc</span>
        </a>

        {/* Desktop Primary Nav */}
        <nav className="primary-nav desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeTab === item.id ? "active" : ""}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-button"
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          >
            <i className={theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"} aria-hidden="true" />
          </button>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="page-shell">
        {/* Sidebar Profile Card */}
        <aside className="profile-sidebar" aria-label="Profile Card">
          <SidebarProfile />
        </aside>

        {/* Main Content Area */}
        <main className="content-main" id="main-content">
          {/* 1. Hero / Executive Overview Section */}
          <section className="section hero-section" id="hero">
            <ExecutiveHero />
          </section>

          {/* 2. Technical Snapshot (Grouped Skills) */}
          <section className="section snapshot-section" id="snapshot">
            <SectionTitle title="Technical Snapshot" note="Core engineering capabilities, model domains, and production technology stack." />
            <TechnicalSnapshot />
          </section>

          {/* 3. Key Evidence Highlights */}
          <section className="section highlights-section" id="highlights">
            <SectionTitle title="Key Evidence Highlights" note="Strongest empirical research findings, engineered systems, and affiliations." />
            <EvidenceHighlights />
          </section>

          {/* 4. Research & Publications */}
          <section className="section publications-section" id="publications">
            <SectionTitle title="Research & Publications" note="Peer-reviewed paper publications, preprints, and empirical evaluation metrics." />
            <PublicationsList />
          </section>

          {/* 5. Engineered Systems / Projects */}
          <section className="section projects-section" id="projects">
            <SectionTitle title="Engineered Systems & Projects" note="Full-stack AI architectures, production backend pipelines, and system benchmarks." />
            <ProjectsList />
          </section>

          {/* 6. Experience & Internships */}
          <section className="section experience-section" id="experience">
            <SectionTitle title="Internship Experience" note="Research internships, production software engineering, and industry project roles." />
            <ExperienceTimeline />
          </section>

          {/* 7. Leadership & Organization Building */}
          <section className="section leadership-section" id="leadership">
            <SectionTitle title="Leadership & Community" note="Founding Vice President of RUDRA (Data Science & AI Club), scaling 0 to 300+ active members." />
            <LeadershipList />
          </section>

          {/* 8. Competitions & Hackathons */}
          <section className="section competitions-section" id="competitions">
            <SectionTitle title="Competitions & Hackathons" note="1st Place Website Makeathon, 2nd Place Analytica, TAARA SIEM Malware Hackathon, and Shravan Multimodal AI." />
            <CompetitionsGrid />
          </section>

          {/* 9. Entrepreneurship */}
          <section className="section entrepreneurship-section" id="entrepreneurship">
            <SectionTitle title="Entrepreneurship & Product Thinking" note="Goodwinsun CFO partnership, FKCCI Manthan Finalist, Elevate Karnataka pitching, and product commercialization." />
            <EntrepreneurshipList />
          </section>

          {/* 11. About & Philosophy */}
          <section className="section about-section" id="about">
            <SectionTitle title="Background & Philosophy" note="Education background, technical interests, and engineering approach." />
            <AboutSection />
          </section>

          {/* 12. References & Academic Network */}
          <section className="section references-section" id="references">
            <SectionTitle title="Academic Network & References" note="Research mentors and academic advisors." />
            <ReferencesGrid />
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="section footer-inner">
          <div>
            <strong>Aditya S Maller</strong> — AI/ML Research Engineer
            <p className="footer-subtext">SPIRE Lab, IISc &bull; RV University &bull; Bengaluru, India</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/Aditya-Maller/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github" aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/aditya-s-maller-851895292/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a href="#hero" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <i className="fa-solid fa-arrow-up" aria-hidden="true" />
              <span>Back to Top</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

/* Sidebar Component */
function SidebarProfile() {
  return (
    <div className="sidebar-card">
      <div className="sidebar-avatar-frame">
        <div className="sidebar-avatar sidebar-avatar-placeholder">
          <span>ASM</span>
        </div>
      </div>
      <div className="sidebar-identity">
        <h1>{profile.name}</h1>
        <p className="sidebar-title">{profile.nativeName}</p>
        <div className="iisc-badge">
          <i className="fa-solid fa-building-columns" aria-hidden="true" />
          <span>SPIRE Lab — IISc</span>
        </div>
      </div>
      <div className="sidebar-meta">
        <span>
          <i className="fa-solid fa-location-dot" aria-hidden="true" />
          {profile.location}
        </span>
        <span>
          <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
          RV University (B.Tech CSE AI/ML)
        </span>
      </div>

      <div className="profile-links">
        {profile.links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" title={link.label} aria-label={link.label}>
            <i className={profileIconMap[link.icon] ?? "fa-solid fa-link"} aria-hidden="true" />
          </a>
        ))}
      </div>
      <a className="btn btn-outline sidebar-resume-btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">
        <i className="fa-solid fa-file-pdf" aria-hidden="true" /> View Resume (PDF)
      </a>

      <div className="sidebar-block">
        <h2>Primary Focus</h2>
        <div className="focus-tags">
          {profile.focus.map((item) => (
            <span key={item} className="focus-chip">{item}</span>
          ))}
        </div>
      </div>

      <div className="sidebar-block">
        <h2>Timeline of Key Events</h2>
        <div className="sidebar-timeline">
          {timelineEvents.map((item) => (
            <a key={item.title} href={item.href} className="sidebar-timeline-item">
              <div className="timeline-item-head">
                <span className={`timeline-type-pill ${item.type.toLowerCase()}`}>{item.type}</span>
                <time>{item.date}</time>
              </div>
              <strong className="timeline-item-title">{item.title}</strong>
              <span className="sidebar-timeline-gist">{item.gist}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 1. Executive Hero */
function ExecutiveHero() {
  return (
    <div className="hero-box">
      <div className="hero-badge-strip">
        <span className="hero-tag hero-tag-iisc">
          <i className="fa-solid fa-building-columns" aria-hidden="true" /> SPIRE Lab, IISc Intern
        </span>
        <span className="hero-tag">
          <i className="fa-solid fa-code-branch" aria-hidden="true" /> AI/ML Systems Engineer
        </span>
      </div>

      <h1 className="hero-headline">Aditya S Maller</h1>
      <p className="hero-subheadline">
        AI/ML Research Engineer who builds what the business needs.
      </p>

      <p className="hero-summary">
        Operating at the intersection of <strong>Machine Learning</strong>, <strong>Generative AI / LLMs</strong>, <strong>Speech & Audio Signal Processing</strong>, and <strong>High-Performance AI Systems Engineering</strong>. Currently researching speech ML, regional Kannada dialect classification, and model quantization at SPIRE Lab, Indian Institute of Science (IISc).
      </p>

      <div className="hero-actions">
        <a className="btn btn-primary" href="#publications">
          <i className="fa-solid fa-file-lines" aria-hidden="true" /> View Research
        </a>
        <a className="btn btn-secondary" href="#projects">
          <i className="fa-solid fa-code" aria-hidden="true" /> View Systems Built
        </a>
        <a className="btn btn-gold" href={profile.resumeUrl} target="_blank" rel="noreferrer">
          <i className="fa-solid fa-file-pdf" aria-hidden="true" /> Resume (PDF)
        </a>
        <a className="btn btn-outline" href="https://github.com/Aditya-Maller/" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-github" aria-hidden="true" /> GitHub
        </a>
        <a className="btn btn-outline" href="https://www.linkedin.com/in/aditya-s-maller-851895292/" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-linkedin-in" aria-hidden="true" /> LinkedIn
        </a>
      </div>
    </div>
  );
}

/* 2. Technical Snapshot (Grouped Skills) */
function TechnicalSnapshot() {
  const categories = [
    {
      title: "AI & Machine Learning",
      icon: "fa-solid fa-brain",
      skills: ["Machine Learning", "Deep Learning", "Generative AI", "LLMs", "Transformer Representations", "Quantum ML", "NLP"]
    },
    {
      title: "Speech & Audio ML",
      icon: "fa-solid fa-waveform",
      skills: ["Speech Signal Processing", "Audio ML", "Dialect Classification", "Model Quantization", "NVIDIA NeMo", "RESPIN Framework"]
    },
    {
      title: "Systems & Engineering",
      icon: "fa-solid fa-server",
      skills: ["Python", "PyTorch", "FastAPI (Async)", "MongoDB (Vector Retrieval)", "Redis Caching", "Celery Async Tasks", "Docker", "LightGBM", "Flask", "React"]
    },
    {
      title: "Evaluation & Methodology",
      icon: "fa-solid fa-chart-line",
      skills: ["Static PE Feature Extraction", "EMBER Dataset", "Feature Engineering", "Model Benchmarking", "ROUGE-L / BERTScore", "Quantum Entropy Metrics"]
    }
  ];

  return (
    <div className="snapshot-grid">
      {categories.map((cat) => (
        <div key={cat.title} className="snapshot-card">
          <div className="snapshot-card-head">
            <i className={cat.icon} aria-hidden="true" />
            <h3>{cat.title}</h3>
          </div>
          <div className="snapshot-skills">
            {cat.skills.map((s) => (
              <span key={s} className="skill-chip">{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 3. Evidence-Based Key Highlights */
function EvidenceHighlights() {
  const highlights = [
    {
      title: "SPIRE Lab — IISc Research Internship",
      badge: "IISc Research Role",
      desc: "Machine Learning Research Intern at SPIRE Lab, Indian Institute of Science (IISc). Working on speech/audio ML, Kannada regional dialect classification, and deep learning model quantization for resource-constrained speech recognition.",
      link: "#experience"
    },
    {
      title: "FastRAG Backend Architecture",
      badge: "GenAI Production System",
      desc: "Independent full-stack asynchronous RAG system with FastAPI, MongoDB native vector similarity retrieval, Gemini synthesis, Redis caching, Celery task queues, and multi-stage Docker containerization.",
      link: "#projects"
    },
    {
      title: "Adaptive Decoding Temperature Prediction",
      badge: "+10.9% ROUGE-L | +5.7% BERTScore",
      desc: "Published/presented research dynamically predicting token decoding temperature per query using internal transformer layer representations and statistical text features over static baselines.",
      link: "#publications"
    },
    {
      title: "Quantum LLM Hallucination Mitigation",
      badge: "Springer Published Research",
      desc: "Springer-published research using quantum entropy indicators and adaptive temperature scaling for LLM hallucination mitigation (-26.7% reported hallucination rate, +178.6% uncertainty score).",
      link: "#publications"
    },
    {
      title: "LightGBM Static Malware Interception",
      badge: "~92% Accuracy | ~0.91 Recall",
      desc: "Machine learning cybersecurity engine analyzing 526 static PE metadata features on the EMBER dataset with real-time download interception for Windows desktop environments.",
      link: "#projects"
    }
  ];

  return (
    <div className="highlights-grid">
      {highlights.map((h, i) => (
        <a key={h.title} href={h.link} className="highlight-card">
          <div className="highlight-num">0{i + 1}</div>
          <div className="highlight-content">
            <span className="highlight-badge">{h.badge}</span>
            <h3>{h.title}</h3>
            <p>{h.desc}</p>
          </div>
          <i className="fa-solid fa-arrow-right highlight-arrow" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

/* 4. Publications List */
function PublicationsList() {
  return (
    <div className="publications-list">
      {publications.map((pub) => (
        <article key={pub.title} className="pub-card">
          <div className="pub-header">
            <span className="pub-venue">{pub.venue} &bull; {pub.year}</span>
            {pub.metricsBadge && <span className="pub-metrics-badge">{pub.metricsBadge}</span>}
          </div>
          <h3 className="pub-title">{pub.title}</h3>
          <p className="pub-authors">{pub.authors}</p>
          <p className="pub-summary">{pub.summary}</p>
          <div className="pub-tags">
            {pub.tags?.map((t) => (
              <span key={t} className="tag-chip">{t}</span>
            ))}
          </div>
          <div className="pub-links">
            {pub.links?.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                <i className={getActionIcon(link)} aria-hidden="true" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

/* 5. Projects List */
function ProjectsList() {
  return (
    <div className="projects-grid">
      {projects.map((proj) => (
        <article key={proj.title} className="project-card">
          <div className="project-head">
            <div>
              <span className="project-category">{proj.category}</span>
              <h3>{proj.title}</h3>
            </div>
            <span className="project-status">{proj.status}</span>
          </div>

          <p className="project-summary">{proj.summary}</p>

          {proj.architecture?.length && (
            <div className="project-arch">
              <strong>Technical Architecture & Decisions:</strong>
              <ul>
                {proj.architecture.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {proj.metrics && (
            <div className="project-metrics">
              <i className="fa-solid fa-chart-line" aria-hidden="true" />
              <span>{proj.metrics}</span>
            </div>
          )}

          <div className="project-tags">
            {proj.tags?.map((t) => (
              <span key={t} className="tag-chip">{t}</span>
            ))}
          </div>

          <div className="project-links">
            {proj.links?.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                <i className={getActionIcon(link)} aria-hidden="true" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

/* 6. Experience Timeline */
function ExperienceTimeline() {
  return (
    <div className="timeline-container">
      {experience.map((exp, idx) => (
        <div key={`${exp.title}-${idx}`} className={`timeline-card ${exp.featured ? "timeline-featured" : ""}`}>
          <div className="timeline-badge-column">
            <span className="timeline-year">{exp.period}</span>
            {exp.featured && <span className="timeline-flag">Primary Role</span>}
          </div>
          <div className="timeline-content">
            <h3 className="timeline-title">{exp.title}</h3>
            <a className="timeline-place" href={exp.href} target="_blank" rel="noreferrer">
              <i className="fa-solid fa-building" aria-hidden="true" /> {exp.place}
            </a>
            <p className="timeline-detail">{exp.detail}</p>
            <div className="timeline-tags">
              {exp.tags?.map((t) => (
                <span key={t} className="tag-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 7. Leadership List */
function LeadershipList() {
  return (
    <div className="leadership-list">
      {leadership.map((item) => (
        <article key={item.organization} className="leadership-card">
          <div className="leadership-head">
            <div>
              <h3>{item.role}</h3>
              <span className="leadership-org">{item.organization}</span>
            </div>
            <span className="leadership-period">{item.period}</span>
          </div>
          <p className="leadership-summary">{item.summary}</p>
          <div className="leadership-activities">
            <strong>Key Organizational Responsibilities:</strong>
            <ul>
              {item.keyActivities.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

/* 8. Competitions Grid */
function CompetitionsGrid() {
  return (
    <div className="competitions-grid">
      {competitions.map((comp) => (
        <div key={comp.title} className="competition-card">
          <div className="competition-header">
            <span className="competition-result">{comp.result}</span>
            <span className="competition-year">{comp.year}</span>
          </div>
          <h3>{comp.title}</h3>
          <span className="competition-org">{comp.organizer}</span>
          <p>{comp.detail}</p>
        </div>
      ))}
    </div>
  );
}

/* 9. Public Good List */
function PublicGoodList() {
  return (
    <div className="public-good-grid">
      {publicGood.map((pg) => (
        <div key={pg.title} className="pg-card">
          <span className="pg-type">{pg.type}</span>
          <h3>{pg.title}</h3>
          <p className="pg-summary">{pg.summary}</p>
          <div className="pg-impact">
            <strong>Community & Technical Impact:</strong> {pg.impact}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 10. Entrepreneurship List */
function EntrepreneurshipList() {
  return (
    <div className="entrepreneurship-list">
      {entrepreneurship.map((ent) => (
        <div key={ent.title} className="ent-card">
          <div className="ent-head">
            <h3>{ent.title}</h3>
            <span className="ent-context">{ent.context}</span>
          </div>
          {ent.team && <p className="ent-team"><strong>Team:</strong> {ent.team}</p>}
          {ent.mentors && <p className="ent-mentors"><strong>Faculty Mentors:</strong> {ent.mentors}</p>}
          <p className="ent-summary">{ent.summary}</p>
          <div className="ent-learnings">
            <strong>Key Execution & Business Insights:</strong>
            <ul>
              {ent.learnings.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 11. About Section & Philosophy */
function AboutSection() {
  return (
    <div className="about-wrapper">
      {/* Life & Personal Philosophy Hero Card */}
      <div className="philosophy-card">
        <div className="philosophy-quote-header">
          <i className="fa-solid fa-quote-left philosophy-quote-icon" aria-hidden="true" />
          <span className="philosophy-badge">Core Life & Engineering Philosophy</span>
        </div>
        
        <blockquote className="philosophy-quote">
          &ldquo;You can escape reality, but you cannot escape the consequences of escaping reality.&rdquo;
        </blockquote>
        <p className="philosophy-subquote">
          Achievement is rarely accidental. It requires taking bold, calculated risks, making decisive choices, and standing fully accountable for every outcome.
        </p>

        <div className="philosophy-pillars">
          <div className="pillar-item">
            <div className="pillar-icon">
              <i className="fa-solid fa-bolt" aria-hidden="true" />
            </div>
            <div>
              <strong>Calculated Risk & Bold Execution</strong>
              <p>Progress favors the decisive. Embrace uncertainty, evaluate trade-offs, and execute with urgency to achieve meaningful breakthroughs.</p>
            </div>
          </div>
          <div className="pillar-item">
            <div className="pillar-icon">
              <i className="fa-solid fa-shield-halved" aria-hidden="true" />
            </div>
            <div>
              <strong>Radical Ownership of Outcomes</strong>
              <p>Own the decisions you make and face their consequences squarely. Never substitute wishful thinking or hype for empirical feedback.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Education Breakdown & Languages Card */}
      <div className="about-box">
        <h3>Education & Background</h3>
        
        <div className="education-list">
          {education.map((edu) => (
            <div key={edu.title} className="edu-card">
              <div className="edu-head">
                <strong>{edu.title}</strong>
                <span className="edu-period">{edu.period}</span>
              </div>
              <p className="edu-place">{edu.place}</p>
              <p className="edu-detail">{edu.detail}</p>
              <div className="edu-tags">
                {edu.tags?.map((t) => (
                  <span key={t} className="tag-chip">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="languages-title">Languages Spoken</h3>
        <div className="languages-chips">
          {languages.map((lang) => (
            <span key={lang} className="skill-chip language-chip">
              <i className="fa-solid fa-language" aria-hidden="true" /> {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 12. References Grid */
function ReferencesGrid() {
  return (
    <div className="references-grid">
      {references.map((ref) => (
        <div key={ref.name} className="ref-card">
          <h3>{ref.name}</h3>
          <p className="ref-title">{ref.title}</p>
          <p className="ref-inst">{ref.institution}</p>
          <div className="ref-meta">
            <span className="ref-role">{ref.role}</span>
            <span className="ref-domain">Domain: {ref.domain}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Helpers */
function SectionTitle({ title, note }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}

function getInitialTheme() {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "dark"; // Default to dark mode for sleek technical aesthetic
  }
  return "dark";
}

function getInitialHash() {
  if (typeof window !== "undefined" && window.location.hash) {
    return window.location.hash.replace("#", "");
  }
  return "hero";
}

export default App;
