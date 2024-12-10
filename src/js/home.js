class HomePage {
    constructor() {
        this.currentSlide = 0;
        const slides = document.querySelectorAll('#imageCarousel > div');
        this.totalSlides = slides.length;
    }

    initialize() {
        setInterval(this.nextSlide, 6500);
    }

    nextSlide() {
        try {
            window.homePage.currentSlide =
                (window.homePage.currentSlide + 1) % window.homePage.totalSlides;
            document.getElementById('imageCarousel').style.transform =
                `translateX(-${window.homePage.currentSlide * 100}%)`;
        } catch (e) {
        }
    }

    destroy() {
        clearInterval(this.nextSlide);
    }
}

window.homePage = new HomePage();
