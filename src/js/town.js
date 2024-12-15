// town.js
class TownPage {
  constructor() {
    this.town = null;
    this.businesses = [];
  }

  async initialize(townName) {
    await Promise.all([this.loadTown(townName), this.loadBusinesses(townName)]);
    this.render();
  }

  async loadTown(townName) {
    const response = await fetch('data/towns.csv');
    const csvText = await response.text();
    const towns = this.parseCSV(csvText);
    this.town = towns.find((t) => t.name.toLowerCase() === townName.toLowerCase());
  }

  async loadBusinesses(townName) {
    const response = await fetch('data/businesses.csv');
    const csvText = await response.text();
    const businesses = this.parseCSV(csvText);
    this.businesses = businesses.filter((b) => b.town.toLowerCase() === townName.toLowerCase());
  }

  parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = this.parseCSVLine(lines[0]);

    return lines
        .slice(1)
        .filter((line) => line.trim())
        .map((line) => {
          const values = this.parseCSVLine(line);
          const obj = {};
          headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim();
            if (header === 'images') {
              obj[header] = values[index].split('|');
            }
          });
          return obj;
        });
  }

  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (line[i] === ',' && !inQuotes) {
        result.push(current);
        current = '';
        continue;
      }
      current += line[i];
    }
    result.push(current);
    return result;
  }

  render() {
    // Set main image and details
    document.getElementById('mainImage').src = this.town.main_image;
    document.getElementById('mainImage').alt = this.town.name;
    document.getElementById('townName').textContent = this.town.name;
    document.getElementById('townNameDo').textContent = this.town.name;
    document.getElementById('population').textContent = this.town.population;
    document.getElementById('county').textContent = this.town.county;
    document.getElementById('established').textContent = this.town.established;
    document.getElementById('description').textContent = this.town.description;

    // Render image gallery
    const galleryHTML = this.town.images
        .map(
            (img) => `
               <div class="overflow-hidden rounded-lg shadow-lg">
                   <img src="${img}" alt="${this.town.name}" 
                        class="w-full h-64 object-cover hover:scale-110 transition-transform duration-300">
               </div>
           `
        )
        .join('');
    document.getElementById('imageGallery').innerHTML = galleryHTML;

    // Render business list
    const businessHTML = this.businesses
        .map(
            (business) => `
               <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                   <a href="${business.website}" target="_blank" 
                      class="flex items-center justify-between">
                       <div>
                           <h3 class="text-xl font-bold text-blue-900">${business.name}</h3>
                           <p class="text-gray-600">${business.type}</p>
                           <p class="text-sm text-gray-500 mt-2">${business.address}</p>
                       </div>
                       <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                 d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                       </svg>
                   </a>
               </div>
           `
        )
        .join('');
    document.getElementById('businessList').innerHTML = businessHTML;
  }
}
