class HomePage {
    constructor() {
        this.currentSlide = 0;
        this.intervalId = null;
        const slides = document.querySelectorAll('#imageCarousel > div');
        this.totalSlides = slides.length;
        // Bind the method to preserve context
        this.nextSlide = this.nextSlide.bind(this);

        new ScrollAnimations();

        const townPositions = [
            {name: 'Hermann', left: '20%', top: '40%'},
            {name: 'New Haven', left: '90%', top: '50%'},
            {name: 'Berger', left: '80%', top: '45%'}
        ];

        townPositions.forEach(town => {
            const marker = document.querySelector(`[data-town="${town.name}"]`);
            if (marker) {
                marker.style.left = town.left;
                marker.style.top = town.top;
            }
        });
    }

    initialize() {
        this.intervalId = setInterval(this.nextSlide, 7500);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        const carousel = document.getElementById('imageCarousel');
        if (carousel) {
            carousel.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        }
    }

    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
    }
    }
}

// Add to your existing home.js or create a new script
// document.addEventListener('DOMContentLoaded', () => {
//     const observerOptions = {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.1,
//     };
//
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 entry.target.style.opacity = '1';
//                 entry.target.style.transform = 'translateY(0)';
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, observerOptions);
//
//     // Observe all sections with data-scroll-animate
//     document.querySelectorAll('[data-scroll-animate]').forEach((el) => {
//         observer.observe(el);
//     });
// });
