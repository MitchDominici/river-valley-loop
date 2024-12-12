// ScrollAnimations.js
class ScrollAnimations {
    constructor() {
        this.lastScrollPosition = window.scrollY;
        this.ticking = false;
        this.init();
    }

    init() {
        // Initialize intersection observer for fade-in animations
        this.initIntersectionObserver();

        // Initialize parallax effect for hero section
        this.initParallax();

        // Initialize scroll-triggered animations
        this.initScrollAnimations();


    }

    initIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    entry.target.classList.remove('opacity-0');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            el.classList.add('opacity-0');
            observer.observe(el);
        });
    }

    initParallax() {
        const heroSection = document.querySelector('.hero-section');
        const imageCarousel = document.querySelector('#imageCarousel');

        if (!heroSection || !imageCarousel) return;

        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const speed = 0.5; // Adjust this value to change parallax speed

                    if (imageCarousel) {
                        imageCarousel.style.transform = `translateY(${scrolled * speed}px)`;
                    }

                    this.ticking = false;
                });

                this.ticking = true;
            }
        });
    }

    initScrollAnimations() {
        // Add classes to elements that should animate on scroll
        document.querySelectorAll('.title-animate').forEach((el) => {
            el.classList.add('transition-transform', 'duration-700');
        });

        document.querySelectorAll('.content-animate').forEach((el) => {
            el.classList.add('transition-all', 'duration-700', 'delay-200');
        });

        // Handle scroll events
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    this.ticking = false;
                });

                this.ticking = true;
            }
        });
    }

    updateScrollAnimations() {
        const scrolled = window.scrollY;
        const viewportHeight = window.innerHeight;

        document.querySelectorAll('.scroll-animate').forEach((el) => {
            const elementTop = el.offsetTop;
            const elementVisible = 150; // Adjust this value to change when animations trigger

            if (elementTop < scrolled + viewportHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }
}

// Initialize animations when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new ScrollAnimations();
// });
