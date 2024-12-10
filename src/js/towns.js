class TownsPage {
    constructor() {
        // TODO find a less tedious way to manage this data
        this.towns = [
            {
                name: 'Hermann',
                image:
                    'https://mitchdominici.github.io/river-valley-loop/images/towns/hermann/hermann-6.jpg',
                description:
                    "Founded by German settlers in 1837, Hermann is renowned for its wineries and historic architecture. The town's German heritage is beautifully preserved in its brick buildings, wine cellars, and cultural festivals.",
                images: Array.from(
                    {length: 3},
                    (_, i) =>
                        `https://mitchdominici.github.io/river-valley-loop/images/towns/hermann/hermann-${i + 1}.jpg`
                ),
                sponsors: [
                    {name: 'Stone Hill Winery', type: 'Winery'},
                    {name: 'Tin Mill Brewery', type: 'Brewery'},
                    {name: 'Hermann Crown Suites', type: 'Lodging'},
                ],
            },
            {
                name: 'New Haven',
                image:
                    'https://mitchdominici.github.io/river-valley-loop/images/towns/new-haven/new-haven-4.jpg',
                description:
                    'New Haven, established in 1856, sits gracefully along the Missouri River. Known for its artistic community and riverside charm, the town offers a perfect blend of historic preservation and modern creativity.',
                images: Array.from(
                    {length: 3},
                    (_, i) =>
                        `https://mitchdominici.github.io/river-valley-loop/images/towns/new-haven/new-haven-${i + 1}.jpg`
                ),
                sponsors: [
                    {name: 'Robller Vineyard', type: 'Winery'},
                    {name: 'Cedar Creek Resort', type: 'Lodging'},
                ],
            },
            {
                name: 'Lyon',
                image: 'https://mitchdominici.github.io/river-valley-loop/images/towns/lyon/lyon-1.jpg',
                description:
                    "A historic river community that exemplifies small-town Missouri charm. Lyon features historic buildings and a close-knit community atmosphere. The town's strategic location along the river made it an important trading post in early Missouri history.",
                images: Array.from(
                    {length: 3},
                    (_, i) =>
                        `https://mitchdominici.github.io/river-valley-loop/images/towns/lyon/lyon-${i + 1}.jpg`
                ),
                sponsors: [
                    {name: 'Lyon General Store', type: 'Retail'},
                    {name: 'River View Inn', type: 'Lodging'},
                ],
            },
            {
                name: 'Beaufort',
                image:
                    'https://mitchdominici.github.io/river-valley-loop/images/towns/beaufort/beaufort-1.jpg',
                description:
                    'Founded in 1849, Beaufort is known for its scenic beauty and agricultural heritage. The town maintains strong ties to its farming roots while embracing modern amenities. Its rolling hills and pristine countryside offer visitors a peaceful retreat.',
                images: Array.from(
                    {length: 3},
                    (_, i) =>
                        `https://mitchdominici.github.io/river-valley-loop/images/towns/beaufort/beaufort-${i + 1}.jpg`
                ),
                sponsors: [
                    {name: 'Beaufort Farms Market', type: 'Agriculture'},
                    {name: 'Country Kitchen', type: 'Restaurant'},
                ],
            },
            {
                name: 'Gerald',
                image: 'https://mitchdominici.github.io/river-valley-loop/images/towns/gerald/gerald-1.jpg',
                description:
                    'A welcoming community established along the railroad in 1901. Gerald combines traditional values with progressive development. The town is known for its annual Railroad Days festival and strong community spirit.',
                images: Array.from(
                    {length: 3},
                    (_, i) =>
                        `https://mitchdominici.github.io/river-valley-loop/images/towns/gerald/gerald-${i + 1}.jpg`
                ),
                sponsors: [
                    {name: 'Gerald Cafe', type: 'Restaurant'},
                    {name: 'Railroad Museum', type: 'Tourism'},
                ],
            },
            {
                name: 'Rosebud',
                image:
                    'https://mitchdominici.github.io/river-valley-loop/images/towns/rosebud/rosebud-1.jpg',
                description:
                    "Named for the wild roses that once covered its hills, Rosebud is a charming small town known for its antique shops and friendly atmosphere. The town's well-preserved main street features historic buildings and unique local businesses.",
                images: Array.from(
                    {length: 3},
                    (_, i) =>
                        `https://mitchdominici.github.io/river-valley-loop/images/towns/rosebud/rosebud-${i + 1}.jpg`
                ),
                sponsors: [
                    {name: 'Rosebud Antique Mall', type: 'Shopping'},
                    {name: 'Main Street Diner', type: 'Restaurant'},
                ],
            },
            {
                name: 'Owensville',
                image:
                    'https://mitchdominici.github.io/river-valley-loop/images/towns/owensville/owensville-1.jpg',
                description:
                    'Founded in 1886, Owensville serves as a regional hub combining rural charm with modern amenities. The town is known for its excellent schools, community events, and the annual Gasconade County Fair.',
                images: Array.from(
                    {length: 3},
                    (_, i) =>
                        `https://mitchdominici.github.io/river-valley-loop/images/towns/owensville/owensville-${i + 1}.jpg`
                ),
                sponsors: [
                    {name: 'Owensville Farmers Market', type: 'Agriculture'},
                    {name: 'Community Center', type: 'Recreation'},
                    {name: 'White Mule Winery', type: 'Winery'},
                ],
            },
            {
                name: 'Stony Hill',
                image:
                    'https://mitchdominici.github.io/river-valley-loop/images/towns/stony-hill/stony-hill-1.jpg',
                description:
                    "A historic community known for its scenic views and rich agricultural heritage. Stony Hill's elevated location offers panoramic views of the surrounding countryside and vineyards.",
                images: Array.from(
                    {length: 3},
                    (_, i) =>
                        `https://mitchdominici.github.io/river-valley-loop/images/towns/stony-hill/stony-hill-${i + 1}.jpg`
                ),
                sponsors: [
                    {name: 'Stony Hill Winery', type: 'Winery'},
                    {name: 'Hilltop Market', type: 'Retail'},
                ],
            },
            {
                name: 'Swiss',
                image: 'https://mitchdominici.github.io/river-valley-loop/images/towns/swiss/swiss-1.jpg',
                description:
                    'Named for its early Swiss settlers, this small community preserves its unique cultural heritage. The area is known for its traditional architecture, dairy farming, and cheese-making traditions.',
                images: Array.from(
                    {length: 3},
                    (_, i) =>
                        `https://mitchdominici.github.io/river-valley-loop/images/towns/swiss/swiss-${i + 1}.jpg`
                ),
                sponsors: [
                    {name: 'Swiss Heritage Museum', type: 'Tourism'},
                    {name: 'Alpine Cheese Shop', type: 'Food'},
                ],
            },
            {
                name: 'Berger',
                image: 'https://mitchdominici.github.io/river-valley-loop/images/towns/berger/berger-1.jpg',
                description:
                    'Situated along the Missouri River, Berger offers stunning river views and rich German heritage. The town is known for its historic buildings, traditional festivals, and proximity to wine country.',
                images: Array.from(
                    {length: 3},
                    (_, i) =>
                        `https://mitchdominici.github.io/river-valley-loop/images/towns/berger/berger-${i + 1}.jpg`
                ),
                sponsors: [
                    {name: 'Berger Landing', type: 'Recreation'},
                    {name: 'River View Cafe', type: 'Restaurant'},
                    {name: 'Heritage Museum', type: 'Tourism'},
                ],
            },
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
        this.towns.forEach((town) => {
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
        const townCards = this.towns
            .map(
                (town) => `
            <div data-town="${town.name}" class="cursor-pointer group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <img src="${town.image}" alt="${town.name}" class="w-full h-32 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                <h2 class="absolute bottom-4 left-4 text-white text-2xl font-bold">${town.name}</h2>
            </div>
        `
            )
            .join('');

        this.townGrid.innerHTML = townCards;
        this.attachEventListeners();
    }

    showTownDetails(townName) {
        window.townsPage.currentTown = this.towns.find((t) => t.name === townName);
        window.townsPage.currentImageIndex = 0;
        this.renderTownModal();
        this.modal.classList.remove('hidden');
    }

    closeTownModal() {
        this.modal.classList.add('hidden');
    }

    changeImage(direction) {
        const imagesLength = window.townsPage.currentTown.images.length;
        window.townsPage.currentImageIndex =
            (window.townsPage.currentImageIndex + direction + imagesLength) % imagesLength;
        const carouselImage = document.getElementById('carouselImage');
        if (carouselImage) {
            carouselImage.src = window.townsPage.currentTown.images[window.townsPage.currentImageIndex];
        }
    }

    renderTownModal() {
        this.modalContent.innerHTML = `
            <h2 class="text-3xl font-bold mb-4">${window.townsPage.currentTown.name}</h2>
            <p class="text-gray-700 mb-6">${window.townsPage.currentTown.description}</p>
            
            <div class="relative mb-8">
                <img id="carouselImage" src="${window.townsPage.currentTown.images[window.townsPage.currentImageIndex]}" 
                     class="w-full min-h-64 object-cover rounded-lg">
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
                    ${window.townsPage.currentTown.sponsors
            .map(
                (sponsor) => `
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <h4 class="font-bold">${sponsor.name}</h4>
                            <p class="text-gray-600">${sponsor.type}</p>
                        </div>
                    `
            )
            .join('')}
                </div>
            </div>
        `;
    }
}

window.townsPage = new TownsPage();
