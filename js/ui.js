/**
 * ui.js — UI State & Interactions
 * Handles: Loader, Nav scroll state, Theme toggle,
 *          Scroll-to-top button, Typewriter effect, Contact form.
 */

// ── Page Loader ──
function initLoader() {
    const bar = document.getElementById('loader-bar');
    const loader = document.getElementById('loader');

    setTimeout(() => { bar.style.width = '100%'; }, 100);
    setTimeout(() => { loader.classList.add('hidden'); }, 2000);
}

// ── Nav Scroll State ──
function initNavScroll() {
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// ── Dark / Light Theme Toggle ──
function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('portfolio-theme');

    // Restore preference on load
    if (saved === 'light') {
        document.body.classList.add('light');
        btn.textContent = '☀️';
    }

    btn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light');
        btn.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    });
}

// ── Scroll-to-Top Button ──
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Typewriter Cycling Text ──
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const roles = [
        'Full Stack Developer',
        'Node.js Engineer',
        'MongoDB Expert',
        'REST API Builder',
        'Problem Solver',
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function typeLoop() {
        const current = roles[roleIdx];

        el.textContent = deleting
            ? current.slice(0, charIdx--)
            : current.slice(0, charIdx++);

        // Finished typing — pause, then delete
        if (!deleting && charIdx > current.length) {
            deleting = true;
            setTimeout(typeLoop, 1400);
            return;
        }

        // Finished deleting — move to next role
        if (deleting && charIdx < 0) {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            charIdx = 0;
        }

        setTimeout(typeLoop, deleting ? 45 : 90);
    }

    // Start after loader finishes (2.2 s)
    setTimeout(typeLoop, 2200);
}

// ── Download CV ──
function initCvDownload() {
    const btn = document.getElementById('cv-btn');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        try {
            const response = await fetch('resume.pdf', { method: 'HEAD' });

            if (response.ok) {
                // File exists — trigger download
                const a = document.createElement('a');
                a.href = 'resume.pdf';
                a.download = 'Prathmesh_Desai_Resume.pdf';
                a.click();
            } else {
                showCvToast();
            }
        } catch {
            showCvToast();
        }
    });
}

function showCvToast() {
    // Remove any existing toast
    document.getElementById('cv-toast')?.remove();

    const toast = document.createElement('div');
    toast.id = 'cv-toast';
    toast.textContent = '📂 Add your resume.pdf to the portfolio/ folder';
    toast.style.cssText = `
    position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
    background: var(--surface); border: 1px solid var(--accent);
    color: var(--text); padding: 12px 24px; font-size: 0.85rem;
    z-index: 9999; clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
    opacity: 0; transition: opacity 0.3s ease;
  `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ── Contact Form — powered by EmailJS ──
//
// SETUP (free, 3 minutes on emailjs.com):
//   1. Sign up at https://emailjs.com
//   2. Add Email Service (use Gmail) → copy Service ID
//   3. Create Email Template with vars: {{from_name}}, {{reply_to}}, {{message}}
//      → copy Template ID
//   4. Account → API Keys → copy Public Key
//   5. Paste your 3 keys into the constants below
//
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // ← replace
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';   // ← replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← replace

function initContactForm() {
    const form = document.querySelector('.contact-form');
    const submitBtn = form?.querySelector('button[type="submit"]');
    if (!form || !submitBtn) return;

    // Initialise EmailJS with public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Guard: alert user to set up keys first
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            showFormToast('⚠️ Set your EmailJS keys in js/ui.js first!', '#ff3c00');
            return;
        }

        // Loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;

        try {
            await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

            submitBtn.textContent = 'Sent! ✓';
            submitBtn.style.background = '#00c851';
            showFormToast('✅ Message sent! I\'ll reply soon.', '#00c851');
            form.reset();

        } catch (err) {
            console.error('EmailJS error:', err);
            submitBtn.textContent = 'Failed — try again';
            submitBtn.style.background = '#ff3c00';
            showFormToast('❌ Failed. Email me at prathameshd667@gmail.com', '#ff3c00');
        }

        // Reset button after 3 s
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

function showFormToast(message, borderColor = 'var(--accent)') {
    document.getElementById('form-toast')?.remove();

    const toast = document.createElement('div');
    toast.id = 'form-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
        background: var(--surface); border: 1px solid ${borderColor};
        color: var(--text); padding: 14px 28px; font-size: 0.85rem;
        z-index: 9999; clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
        opacity: 0; transition: opacity 0.3s ease; white-space: nowrap;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}
