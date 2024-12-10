class HomePage {
    constructor() {
        this.currentSlide = 0;
        this.intervalId = null;
        const slides = document.querySelectorAll('#imageCarousel > div');
        this.totalSlides = slides.length;
        // Bind the method to preserve context
        this.nextSlide = this.nextSlide.bind(this);
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
