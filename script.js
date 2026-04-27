// ─── HERO CANVAS ─────────────────────────────────────────────────────
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

        // Base: very dark near-black with red tint
        ctx.fillStyle = '#070005';
        ctx.fillRect(0, 0, w, h);

        // Main warm red-orange glow — centered slightly left like n8n
        const cx = w * 0.42;
        const cy = h * 0.52;
        const r  = Math.max(w, h) * 0.65;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0,    'rgba(160, 40, 5,  0.55)');
        grad.addColorStop(0.15, 'rgba(130, 20, 8,  0.38)');
        grad.addColorStop(0.35, 'rgba(90,  10, 30, 0.22)');
        grad.addColorStop(0.60, 'rgba(40,   5, 25, 0.08)');
        grad.addColorStop(1,    'rgba(7,    0,  5, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Small secondary purple glow top-right
        const grad2 = ctx.createRadialGradient(w * 0.85, h * 0.15, 0, w * 0.85, h * 0.15, w * 0.28);
        grad2.addColorStop(0,   'rgba(80, 15, 120, 0.22)');
        grad2.addColorStop(0.5, 'rgba(40,  8,  80, 0.08)');
        grad2.addColorStop(1,   'rgba(7,   0,   5, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, w, h);
    }

    resize();
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 100);
    });
}

// ─── HEADER SCROLL EFFECT ─────────────────────────────────────────────
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.background = 'rgba(7,0,5,0.98)';
            header.style.boxShadow  = '0 2px 20px rgba(0,0,0,0.6)';
        } else {
            header.style.background = 'rgba(8,2,4,0.9)';
            header.style.boxShadow  = 'none';
        }
    }, { passive: true });
}

// ─── MOBILE MENU (full-screen overlay) ───────────────────────────────
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('active');
        // Animate hamburger → X
        const spans = btn.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'translateY(7px) rotate(45deg)';
            spans[1].style.opacity   = '0';
            spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
            document.body.style.overflow = 'hidden'; // prevent scroll behind overlay
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity   = '';
            spans[2].style.transform = '';
            document.body.style.overflow = '';
        }
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-list a').forEach(a => {
        a.addEventListener('click', () => {
            nav.classList.remove('active');
            const spans = btn.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity   = '';
            spans[2].style.transform = '';
            document.body.style.overflow = '';
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const check = () => {
        const vh = window.innerHeight;
        els.forEach(el => {
            if (el.getBoundingClientRect().top < vh - 60) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', check, { passive: true });
    check(); // run once on load
}

// ─── SMOOTH ANCHOR SCROLL ─────────────────────────────────────────────
// Uses scroll-margin-top on sections (set in CSS) + native scrollIntoView
// This is more reliable across devices than manual offset calculation.
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────
function initForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn  = form.querySelector('button[type="submit"]');
        const orig = btn.textContent;
        btn.textContent  = 'Enviando...';
        btn.style.opacity = '0.6';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent  = '¡Solicitud Recibida! ✓';
            btn.style.background = '#1b5e20';
            btn.style.opacity    = '1';
            form.reset();
            setTimeout(() => {
                btn.textContent  = orig;
                btn.style.background = '';
                btn.disabled = false;
            }, 3500);
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
