class TownsPage {
    constructor() {
        this.towns = [
            {
                name: "Hermann",
                image: "https://mitchdominici.github.io/river-valley-loop/images/towns/hermann/hermann-6.jpg",
                description: "Founded by German settlers in 1837, Hermann is renowned for its wineries and historic architecture. The town's German heritage is beautifully preserved in its brick buildings, wine cellars, and cultural festivals.",
                images: [
                    "https://mitchdominici.github.io/river-valley-loop/images/towns/hermann/hermann-1.jpg",
                    "https://mitchdominici.github.io/river-valley-loop/images/towns/hermann/hermann-2.jpg",
                    "https://mitchdominici.github.io/river-valley-loop/images/towns/hermann/hermann-3.jpg"
                ],
                sponsors: [
                    {name: "Stone Hill Winery", type: "Winery"},
                    {name: "Tin Mill Brewery", type: "Brewery"},
                    {name: "Hermann Crown Suites", type: "Lodging"}
                ]
            },
            {
                name: "New Haven",
                image: "https://mitchdominici.github.io/river-valley-loop/images/towns/new-haven/new-haven-4.jpg",
                description: "New Haven, established in 1856, sits gracefully along the Missouri River. Known for its artistic community and riverside charm, the town offers a perfect blend of historic preservation and modern creativity.",
                images: [
                    "https://mitchdominici.github.io/river-valley-loop/images/towns/new-haven/new-haven-1.jpg",
                    "https://mitchdominici.github.io/river-valley-loop/images/towns/new-haven/new-haven-2.jpg",
                    "https://mitchdominici.github.io/river-valley-loop/images/towns/new-haven/new-haven-3.jpg"
                ],
                sponsors: [
                    {name: "Robller Vineyard", type: "Winery"},
                    {name: "Cedar Creek Resort", type: "Lodging"}
                ]
            }
        ];
        this.currentTown = null;
        this.currentImageIndex = 0;
    }

    initialize() {
        this.townGrid = document.getElementById('townGrid');
        this.modal = document.getElementById('townModal');
        this.modalContent = document.getElementById('modalContent');
        this.renderTownGrid();
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.towns.forEach(town => {
            const card = document.querySelector(`[data-town="${town.name}"]`);
            if (card) {
                card.addEventListener('click', () => this.showTownDetails(town.name));
            }
        });

        const closeButton = document.getElementById('closeTownModal');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeTownModal());
        }
    }

    renderTownGrid() {
        const townCards = this.towns.map(town => `
            <div data-town="${town.name}" class="cursor-pointer group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <img src="${town.image}" alt="${town.name}" class="w-full h-32 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                <h2 class="absolute bottom-4 left-4 text-white text-2xl font-bold">${town.name}</h2>
            </div>
        `).join('');

        this.townGrid.innerHTML = townCards;
        this.attachEventListeners();
    }

    showTownDetails(townName) {
        this.currentTown = this.towns.find(t => t.name === townName);
        this.currentImageIndex = 0;
        this.renderTownModal();
        this.modal.classList.remove('hidden');
    }

    closeTownModal() {
        this.modal.classList.add('hidden');
    }

    changeImage(direction) {
        const imagesLength = this.currentTown.images.length;
        this.currentImageIndex = (this.currentImageIndex + direction + imagesLength) % imagesLength;
        const carouselImage = document.getElementById('carouselImage');
        if (carouselImage) {
            carouselImage.src = this.currentTown.images[this.currentImageIndex];
        }
    }

    renderTownModal() {
        this.modalContent.innerHTML = `
            <h2 class="text-3xl font-bold mb-4">${this.currentTown.name}</h2>
            <p class="text-gray-700 mb-6">${this.currentTown.description}</p>
            
            <div class="relative mb-8">
                <img id="carouselImage" src="${this.currentTown.images[this.currentImageIndex]}" 
                     class="w-full h-44 object-cover rounded-lg">
                <button onclick="window.townsPage.changeImage(-1)" 
                        class="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                    ←
                </button>
                <button onclick="window.townsPage.changeImage(1)" 
                        class="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                    →
                </button>
            </div>

            <div class="border-t pt-6">
                <h3 class="text-2xl font-bold mb-4">Local Sponsors</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${this.currentTown.sponsors.map(sponsor => `
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <h4 class="font-bold">${sponsor.name}</h4>
                            <p class="text-gray-600">${sponsor.type}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

window.townsPage = new TownsPage();