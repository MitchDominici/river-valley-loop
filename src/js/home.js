class HomePage {
    constructor() {
        this.currentSlide = 0;
        const slides = document.querySelectorAll('#imageCarousel > div');
        this.totalSlides = slides.length;
    }

    initialize() {
        setInterval(this.nextSlide, 5000);
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
}

window.homePage = new HomePage();
