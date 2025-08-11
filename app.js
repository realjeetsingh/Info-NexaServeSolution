// Combined JS for all pages - No duplicate declarations

(() => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 74, 173, 0.98)';
            } else {
                navbar.style.background = 'rgba(0, 74, 173, 0.95)';
            }
        }
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.addEventListener('DOMContentLoaded', () => {
        // Animate elements for both index and careers pages
        const animateElements = document.querySelectorAll(
            '.service-card, .feature-metric, .contact-item, .benefit-card, .job-card, .stat-item'
        );
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });

        // Animate stats on scroll (for both pages)
        const statElements = document.querySelectorAll('.stat-number, .metric-value');
        const animateStats = (elements) => {
            elements.forEach(el => {
                const finalValue = el.textContent;
                if (!isNaN(parseFloat(finalValue))) {
                    let currentValue = 0;
                    const increment = parseFloat(finalValue) / 50;
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= parseFloat(finalValue)) {
                            clearInterval(timer);
                            el.textContent = finalValue;
                        } else {
                            el.textContent = Math.ceil(currentValue);
                        }
                    }, 50);
                }
            });
        };

        // Trigger stats animation when hero is visible
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => animateStats(statElements), 1000);
                    }
                });
            });
            heroObserver.observe(heroStats);
        }

        // For index.html metrics
        const metricsVisual = document.querySelector('.why-choose-visual');
        if (metricsVisual) {
            const metricsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => animateStats(document.querySelectorAll('.metric-value')), 500);
                    }
                });
            });
            metricsObserver.observe(metricsVisual);
        }
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Initial body opacity
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
})();