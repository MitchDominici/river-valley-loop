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
            .map(town => `
        <div class="town-container cursor-pointer" onclick="loadComponent(components.town, null, '${town.name}')">
          <div class="town-image-container">
            <img 
              src="${town.main_image}" 
              alt="${town.name}" 
              class="town-image"
              loading="lazy"
            >
          </div>
          <div class="text-center town-text">
            <h2 class="text-2xl font-bold mb-2">${town.name}</h2>
            <div class="flex flex-wrap justify-center gap-2 text-sm">
              <span class="px-3 py-1 town-badge rounded-full">Est. ${town.established}</span>
              <span class="px-3 py-1 town-badge rounded-full">Pop. ${town.population}</span>
            </div>
          </div>
        </div>
      `)
            .join('');
    }
}

// window.townsPage = new TownsPage();
