document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top to prevent browser scroll restoration landing on lower sections
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // === Elements ===
    const overlay = document.getElementById('opening-overlay');
    const brandText = document.getElementById('opening-brand');
    const sloganText = document.getElementById('opening-slogan');
    const heroContent = document.querySelector('.hero-content');
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const scrollReveals = document.querySelectorAll('.scroll-reveal');
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    // === Helper: Async Delay ===
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // === Opening Sequence (Optimized) ===
    const runOpeningSequence = async () => {
        // 1. Initial Delay
        await wait(500);

        // 2. Animate Brand Name In (Gold)
        brandText.style.opacity = '1';
        brandText.style.transform = 'scale(1)';

        // 3. Animate Slogan In (White/Silver)
        await wait(1500);
        sloganText.style.opacity = '1';
        sloganText.style.transform = 'translateY(0)';

        // 4. Fade Overlay & Reveal
        await wait(2500);
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';

        await wait(500);
        heroContent.classList.remove('hidden');
        heroContent.classList.add('visible');
        navbar.classList.remove('hidden');
        navbar.classList.add('visible');
    };

    runOpeningSequence();

    // === Mobile Menu Toggle ===
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });
    }

    // === Scroll Animation (IntersectionObserver) ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger slightly earlier for smoother feel
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Performance: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollReveals.forEach(el => observer.observe(el));

    // === Parallax Effect (Optimized with requestAnimationFrame) ===
    const heroBg = document.querySelector('.hero-bg');
    let ticking = false;

    document.addEventListener('mousemove', (e) => {
        if (!ticking && window.scrollY < window.innerHeight) {
            window.requestAnimationFrame(() => {
                const x = (window.innerWidth / 2 - e.clientX) / 50;
                const y = (window.innerHeight / 2 - e.clientY) / 50;
                // Critical Fix: Preserve centering translate(-50%, -50%)
                heroBg.style.transform = `translate(-50%, -50%) scale(1.1) translate(${x}px, ${y}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });

    // === Form Handling (Disabled for FormSubmit.co) ===
    /*
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Gather Data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries()); // Cleaner conversion

            // 2. Add Metadata
            data.submittedAt = new Date().toISOString();

            // 3. Simulate API Call
            console.log('--- FORM SUBMISSION DATA (JSON) ---', data);

            // 4. UI Feedback
            const btn = contactForm.querySelector('button');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = 'Sending... <span class="zh-btn">傳送中...</span>';
            btn.disabled = true;

            // Simulate network delay
            setTimeout(() => {
                btn.innerHTML = 'Sent Successfully <span class="zh-btn">發送成功</span>';
                btn.style.backgroundColor = '#4CAF50';
                formFeedback.innerText = 'Thank you. We will be in touch shortly. 感謝您的聯繫。';

                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    formFeedback.innerText = '';
                }, 5000);
            }, 1000);
        });
    }
    */

});
