document.addEventListener("DOMContentLoaded", () => {
    console.log("⚡ GSAP High-End Animations Loaded!");

    gsap.registerPlugin(ScrollTrigger);

    /* =====================================================
       Hero Intro Animation (on page load)
       ===================================================== */
    gsap.from(".hero-title", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out"
    });

    gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 40,
        delay: 0.3,
        duration: 1.2,
        ease: "power3.out"
    });

    gsap.from(".hero-stats .stat-item", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.2,
        ease: "power2.out"
    });


    /* =====================================================
       Smooth Animated Counter (GSAP powered)
       ===================================================== */
    const counterElements = document.querySelectorAll(".stat-number");

    counterElements.forEach((el) => {
        const target = +el.textContent.replace("+", "") || 0;

        gsap.fromTo(
            el,
            {innerText: 0},
            {
                innerText: target,
                duration: 2,
                ease: "power1.inOut",
                snap: {innerText: 1},
                scrollTrigger: {
                    trigger: ".hero-stats",
                    start: "top 80%",
                },
                onUpdate: function () {
                    el.innerText = Math.round(el.innerText) + "+";
                }
            }
        );
    });


    /* =====================================================
       Navigation Shrink on Scroll
       ===================================================== */
    gsap.to(".navbar", {
        padding: "5px 0",
        duration: 0.3,
        scrollTrigger: {
            trigger: document.body,
            start: "top -10",
            toggleClass: {targets: ".navbar", className: "navbar-scrolled"}
        }
    });


    /* =====================================================
       Section Reveal Animations (super smooth)
       ===================================================== */
    gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "bottom 20%",
                once: true
            }
        });
    });


    /* =====================================================
       Service Cards Floating Reveal
       ===================================================== */
    gsap.utils.toArray(".service-card").forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true
            }
        });
    });


    /* =====================================================
       Portfolio Cinematic Reveal (React-like stagger)
       ===================================================== */
    gsap.utils.toArray(".portfolio-card").forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 80,
            scale: 0.95,
            duration: 1.1,
            delay: i * 0.12,
            ease: "power4.out",
            scrollTrigger: {
                trigger: card,
                start: "top 95%",
                once: true
            }
        });
    });


    /* =====================================================
       Contact Card Reveal
       ===================================================== */
    gsap.from(".contact-card, .contact-form-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 85%",
            once: true
        }
    });


    /* =====================================================
       Scroll To Top Button
       ===================================================== */
    const scrollBtn = document.createElement("button");
    scrollBtn.className = "scroll-to-top";
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    });

    ScrollTrigger.create({
        start: "top -400",
        onEnter: () => scrollBtn.classList.add("show"),
        onLeaveBack: () => scrollBtn.classList.remove("show"),
    });

    /* =====================================================
       Auto Remove Django Messages
       ===================================================== */
    document.querySelectorAll("#messages .alert").forEach((alert) => {
        setTimeout(() => {
            alert.classList.add("fade");
            setTimeout(() => alert.remove(), 600);
        }, 3000);
    });
});
