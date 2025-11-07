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

    // --- Notification System ---
    window.showNotification = function (message, type = 'success') {
        const alert = document.createElement('div');
        const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
        const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        const bg = type === 'success' ? 'rgba(0,200,83,0.1)' : 'rgba(244,67,54,0.1)';
        const border = type === 'success' ? 'rgba(0,200,83,0.3)' : 'rgba(244,67,54,0.3)';

        alert.className = `custom-alert alert ${alertClass} position-fixed fade show`;
        alert.style.cssText = `
            top: 100px; right: 20px; z-index: 9999;
            background: ${bg}; border: 1px solid ${border};
            color: #fff; border-radius: 12px; backdrop-filter: blur(10px);
            min-width: 300px; max-width: 400px;
            opacity: 0; transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        alert.innerHTML = `
            <div class="d-flex align-items-center p-3">
                <i class="${icon} me-2" style="font-size: 1.2rem;"></i>
                <span style="flex: 1;">${message}</span>
                <button type="button" class="btn-close btn-close-white ms-3"></button>
            </div>
        `;
        document.body.appendChild(alert);

        // show animation
        requestAnimationFrame(() => {
            alert.style.opacity = '1';
            alert.style.transform = 'translateX(0)';
        });

        // close button
        alert.querySelector('button').addEventListener('click', () => {
            alert.remove();
        });

        // auto remove
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100px)';
            setTimeout(() => alert.remove(), 300);
        }, 4000);
    };

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

    // --- Contact Form ---
    const contactForm = document.querySelector('.contact-form-card');
    if (contactForm) {
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const loadingSpinner = document.getElementById('loadingSpinner');

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            document.querySelectorAll('.form-error').forEach(el => {
                el.textContent = '';
                el.style.display = 'none';
            });

            const formData = new FormData(this);
            formData.append('csrfmiddlewaretoken', document.querySelector('[name=csrfmiddlewaretoken]').value);

            submitBtn.disabled = true;
            submitText.textContent = 'در حال ارسال...';
            loadingSpinner.style.display = 'inline-block';

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                }
            })
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(data => {
                if (data.success) {
                    showNotification(data.message, 'success');
                    contactForm.reset();
                } else {
                    Object.entries(data.errors).forEach(([field, msgs]) => {
                        const el = document.querySelector(`[data-error-for="${field}"]`);
                        if (el) {
                            el.textContent = Array.isArray(msgs) ? msgs[0] : msgs;
                            el.style.display = 'block';
                        }
                    });
                }
            })
            .catch(() => showNotification('خطا در ارتباط با سرور.', 'error'))
            .finally(() => {
                submitBtn.disabled = false;
                submitText.textContent = 'ارسال پیام';
                loadingSpinner.style.display = 'none';
            });
        });
    }

    // --- Global Error Handling ---
    window.addEventListener('error', e => {
        console.error('Global JS Error:', e.error);
        showNotification('خطایی در صفحه رخ داد.', 'error');
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
