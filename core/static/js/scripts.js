document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio website loaded successfully!');

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
        });
    });

    // --- Navbar Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.style.background = window.scrollY > 50
            ? 'rgba(10, 10, 10, 0.98)'
            : 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    });

    // --- Counter Animation ---
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.textContent);
            let current = 0;
            const duration = 1000; // ۱ ثانیه
            const steps = 30;
            const increment = target / steps;
            let stepCount = 0;

            const timer = setInterval(() => {
                stepCount++;
                current += increment;
                if (stepCount >= steps) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, duration / steps);
        });
    }


    // --- Scroll to Top ---
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('show', window.pageYOffset > 300);
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // --- Intersection Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            if (entry.target.classList.contains('hero-section')) animateCounters();
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        });
    }, {threshold: 0.1});
    document.querySelectorAll('section, .service-card, .portfolio-card').forEach(el => observer.observe(el));

    // --- Portfolio Animations ---
    document.querySelectorAll('.portfolio-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.1}s`;
        card.classList.add('new-project');
        card.addEventListener('click', e => {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => card.style.transform = '', 150);
            }
        });
    });


    // --- Auto remove Django messages ---
    document.querySelectorAll('#messages .alert').forEach(alert => {
        setTimeout(() => {
            alert.classList.remove('show');
            alert.classList.add('fade');
            setTimeout(() => alert.remove(), 500);
        }, 3000);
    });
});
