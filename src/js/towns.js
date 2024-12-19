// towns.js
class TownsPage {
  constructor() {
    this.towns = [];
    this.townsCount = 0;
    this.businessesCount = 0;
  }

  async initialize() {
    await this.loadTowns();
    await this.loadBusinesses('townName');
    this.renderTownGrid();
  }

  async loadTowns() {
    const response = await fetch('data/towns.csv');
    const csvText = await response.text();
    this.towns = this.parseCSV(csvText);
    this.townsCount = this.towns.length;

    document.getElementById('towns-count').textContent = this.townsCount;
  }

  async loadBusinesses() {
    const response = await fetch('data/businesses.csv');
    const csvText = await response.text();
    const businesses = this.parseCSV(csvText);
    this.businessesCount = businesses.length;
    document.getElementById('businesses-count').textContent = this.businessesCount;
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
<div class="town-wrapper">
    <div class="town-container cursor-pointer" onclick="loadComponent(components.town, null, '${town.name}')">
        <div class="town-image-container">
            <img 
                src="${town.main_image}" 
                alt="${town.name}" 
                class="town-image"
                width="200"
                height="200"
            >
            <div class="town-overlay">
                <h2 class="text-4xl font-bold font-display">${town.name}</h2>
            </div>
        </div>
    </div>
</div>
      `
        )
        .join('');
  }
}

// window.townsPage = new TownsPage();
