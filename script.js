// ─── HERO CANVAS ─────────────────────────────────────────────────────
// Draws the massive warm red-orange radial glow exactly like n8n's hero
function drawHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        draw();
    }

    function draw() {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Base fill — very dark near-black with slight red tint
        ctx.fillStyle = '#070005';
        ctx.fillRect(0, 0, w, h);

        // Primary large warm glow — centered left, like n8n screenshot 2
        // Covers roughly 80% of the hero height, offset to center-left
        const cx = w * 0.42;
        const cy = h * 0.52;
        const r  = Math.max(w, h) * 0.65;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0,    'rgba(160, 40, 5,  0.55)');  // darker core
        grad.addColorStop(0.15, 'rgba(130, 20, 8,  0.38)');
        grad.addColorStop(0.35, 'rgba(90,  10, 30, 0.22)');
        grad.addColorStop(0.60, 'rgba(40,   5, 25, 0.08)');
        grad.addColorStop(1,    'rgba(7,    0,  5, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Subtle secondary glow — top right, deep purple
        const grad2 = ctx.createRadialGradient(w * 0.85, h * 0.15, 0, w * 0.85, h * 0.15, w * 0.28);
        grad2.addColorStop(0,   'rgba(80, 15, 120, 0.22)');
        grad2.addColorStop(0.5, 'rgba(40,  8,  80, 0.08)');
        grad2.addColorStop(1,   'rgba(7,   0,   5, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, w, h);
    }

    resize();
    window.addEventListener('resize', resize);
}

// ─── HEADER SCROLL EFFECT ─────────────────────────────────────────────
function initHeader() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.background = 'rgba(8,2,4,0.97)';
            header.style.boxShadow  = '0 4px 30px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(8,2,4,0.85)';
            header.style.boxShadow  = 'none';
        }
    });
}

// ─── MOBILE MENU ──────────────────────────────────────────────────────
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (!btn) return;
    btn.addEventListener('click', () => nav.classList.toggle('active'));
    document.querySelectorAll('.nav-list a').forEach(a =>
        a.addEventListener('click', () => nav.classList.remove('active'))
    );
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const check = () => {
        const vh = window.innerHeight;
        els.forEach(el => {
            if (el.getBoundingClientRect().top < vh - 80) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
}

// ─── SMOOTH ANCHOR SCROLL ─────────────────────────────────────────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });
}

// ─── FORM ─────────────────────────────────────────────────────────────
function initForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const orig = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.style.opacity = '.7';
        setTimeout(() => {
            btn.textContent = '¡Solicitud Recibida!';
            btn.style.background = '#2e7d32';
            btn.style.opacity = '1';
            form.reset();
            setTimeout(() => {
                btn.textContent = orig;
                btn.style.background = '';
            }, 3000);
        }, 1400);
    });
}

// ─── INIT ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    drawHeroCanvas();
    initHeader();
    initMobileMenu();
    initReveal();
    initSmoothScroll();
    initForm();
});
