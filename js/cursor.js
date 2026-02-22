/**
 * cursor.js — Custom Cursor & Mouse Trail
 * Replaces the default cursor with a dot + ring combo and spawns
 * orange/gold trail particles on movement.
 */

function initCursor() {
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');

    let cursorX = 0, cursorY = 0;   // Dot — snaps instantly
    let ringX = 0, ringY = 0;   // Ring — lags behind

    // ── Dot: snap to mouse immediately ──
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    });

    // ── Ring: lerp (smooth follow) ──
    function animateRing() {
        ringX += (cursorX - ringX) * 0.12;
        ringY += (cursorY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();
}

function initMouseTrail() {
    let lastTime = 0;
    const THROTTLE_MS = 40;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < THROTTLE_MS) return;
        lastTime = now;

        const dot = document.createElement('div');
        const size = (Math.random() * 4 + 3) + 'px';

        dot.className = 'trail-dot';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        dot.style.width = size;
        dot.style.height = size;
        dot.style.background = Math.random() > 0.5
            ? 'var(--accent)'
            : 'var(--accent2)';

        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 700);
    });
}
