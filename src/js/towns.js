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
        .filter((line) => line.trim())
        .map((line) => {
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
        .map(
            (town) => `
            <div class="group relative overflow-hidden rounded-xl shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
                <!-- Decorative corner SVGs -->
                <svg class="absolute top-0 left-0 w-8 h-8 text-blue-200" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M0,0 L24,0 L24,4 L4,4 L4,24 L0,24 Z"></path>
                </svg>
                <svg class="absolute top-0 right-0 w-8 h-8 text-blue-200 transform rotate-90" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M0,0 L24,0 L24,4 L4,4 L4,24 L0,24 Z"></path>
                </svg>
                
                <!-- Image container -->
                <div class="relative h-64 overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                    <img src="${town.main_image}" alt="${town.name}" 
                         class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700">
                </div>
                
                <!-- Content -->
                <div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    <h2 class="text-3xl font-bold mb-3 group-hover:text-blue-200 transition-colors">${town.name}</h2>
                    <div class="flex items-center gap-3 text-sm">
                        <span class="px-3 py-1 bg-black/50 backdrop-blur rounded-full">Est. ${town.established}</span>
                        <span class="px-3 py-1 bg-black/50 backdrop-blur rounded-full">Pop. ${town.population}</span>
                    </div>
                </div>
                
                <!-- Bottom decorative SVG -->
                <svg class="absolute bottom-0 left-0 w-8 h-8 text-blue-200 transform -rotate-90" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M0,0 L24,0 L24,4 L4,4 L4,24 L0,24 Z"></path>
                </svg>
                <svg class="absolute bottom-0 right-0 w-8 h-8 text-blue-200 transform rotate-180" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M0,0 L24,0 L24,4 L4,4 L4,24 L0,24 Z"></path>
                </svg>
            </div>
        `
        )
        .join('');
  }
}

// window.townsPage = new TownsPage();
