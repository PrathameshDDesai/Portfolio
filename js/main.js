/**
 * main.js — Entry Point
 * Injects skills and project cards into the DOM, then boots all modules.
 */

// ── Inject Skills ──
function renderSkills() {
  const grid = document.querySelector('.skills-grid');
  if (!grid) return;

  SKILLS.forEach((skill, i) => {
    grid.innerHTML += `
      <div class="skill-card reveal" style="transition-delay: ${i * 0.05}s">
        <div class="skill-icon">${skill.icon}</div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-level">
          <div class="skill-level-bar" data-level="${skill.level}"></div>
        </div>
      </div>`;
  });
}

// ── Inject Project Cards ──
function renderProjects() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  PROJECTS.forEach((p) => {
    const techBadges = p.tech
      .map((t) => `<span class="tech-badge">${t}</span>`)
      .join('');

    grid.innerHTML += `
      <div class="project-card reveal">
        <div class="project-card-inner">

          <!-- Front -->
          <div class="project-front">
            <div class="project-bg-pattern"></div>
            <div class="project-num">${p.num}</div>
            <div class="project-tag">${p.tag}</div>
            <div class="project-title">${p.title}</div>
            <div class="project-tech">${techBadges}</div>
          </div>

          <!-- Back (revealed on hover) -->
          <div class="project-back">
            <div class="project-title">${p.title}</div>
            <div class="project-desc">${p.desc}</div>
            <a href="${p.link}" class="btn" style="background:#fff;color:var(--accent);clip-path:none;">
              View Project →
            </a>
          </div>

        </div>
      </div>`;
  });
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  // 1. Render dynamic content
  renderSkills();
  renderProjects();

  // 2. Three.js background
  initThreeBackground();

  // 3. Cursor & trail
  initCursor();
  initMouseTrail();

  // 4. Scroll & animation effects
  initScrollReveal();
  initScrollProgress();
  initCounters();
  initMagneticButtons();
  initAvatarTilt();

  // 5. UI state
  initLoader();
  initNavScroll();
  initThemeToggle();
  initScrollTop();
  initTypewriter();
  initContactForm();
  initCvDownload();
});
