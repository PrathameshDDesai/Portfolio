/**
 * animations.js — Scroll Reveal, Counter Animations & Magnetic Buttons
 */

// ── Scroll Reveal Observer ──
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('visible');

            // Animate skill bar if present inside the revealed element
            const bar = entry.target.querySelector('.skill-level-bar');
            if (bar) bar.style.width = bar.dataset.level + '%';
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ── Scroll Progress Bar ──
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        progressBar.style.width = (scrolled / maxScroll * 100) + '%';
    });
}

// ── Count-Up Stat Counters ──
function animateCounter(el, target, suffix = '+') {
    let current = 0;
    const step = Math.ceil(target / 40);

    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
    }, 40);
}

function initCounters() {
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const statsObserver = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        animateCounter(document.getElementById('stat-projects'), 5);
        animateCounter(document.getElementById('stat-tech'), 12);
        animateCounter(document.getElementById('stat-exp'), 2);
        statsObserver.disconnect();
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ── Magnetic Button Effect ──
function initMagneticButtons() {
    document.querySelectorAll('.magnetic-wrap').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ── Avatar 3D Tilt on Hover ──
function initAvatarTilt() {
    const card = document.getElementById('avatar-tilt');
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
}
