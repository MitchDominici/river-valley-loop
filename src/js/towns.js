// towns.js
class TownsPage {
    constructor() {
        this.towns = [];
    }

    async initialize() {
        await this.loadTowns();
        this.renderTownGrid();
    }

    async loadTowns() {
        const response = await fetch('/data/towns/towns.csv');
        const csvText = await response.text();
        this.towns = this.parseCSV(csvText);
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        return lines
            .slice(1)
            .filter(line => line.trim())
            .map(line => {
                const values = line.split(',');
                const town = {};
                headers.forEach((header, index) => {
                    town[header.trim()] = values[index]?.trim();
                    if (header === 'images') {
                        town[header] = values[index].split('|');
                    }
                });
                return town;
            });
    }

    renderTownGrid() {
        const townGrid = document.getElementById('townGrid');
        townGrid.innerHTML = this.towns
            .map(town => `
                <a onclick="loadComponent(components.town, null, '${town.name}')"
                   class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <img src="${town.main_image}" alt="${town.name}" 
                         class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h2 class="text-3xl font-bold mb-2">${town.name}</h2>
                        <div class="flex items-center gap-2 text-sm opacity-90">
                            <span class="px-2 py-1 bg-black rounded">Est. ${town.established}</span>
                            <span class="px-2 py-1 bg-black rounded">Pop. ${town.population}</span>
                        </div>
                    </div>
                </a>
            `)
            .join('');
    }
}

// window.townsPage = new TownsPage();