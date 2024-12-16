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

  getSocialIcons(business) {
    const icons = [];
    console.log(business.facebook.replace(/\s/g, ''));
    if (business.facebook) {
      icons.push(`
        <a href="${business.facebook.startsWith('http') ? business.facebook : 'https://facebook.com/' + business.facebook.replace(/\s/g, '')}" 
           target="_blank" 
           class="text-blue-600 hover:text-blue-800">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
          </svg>
        </a>
      `);
    }

    if (business.instagram) {
      icons.push(`
        <a href="https://instagram.com/${business.instagram.replace(/\s/g, '')}" 
           target="_blank" 
           class="text-pink-600 hover:text-pink-800">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      `);
    }

    if (business.tiktok) {
      icons.push(`
        <a href="https://tiktok.com/@${business.tiktok.replace(/\s/g, '')}" 
           target="_blank" 
           class="text-gray-800 hover:text-gray-600">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </a>
      `);
    }

    return icons.join('');
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
        .map(business => `
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              ${business.website ? `
                <a href="${business.website.startsWith('http') ? business.website : 'https://' + business.website}" 
                   target="_blank" 
                   class="flex items-center justify-between">
                   <h3 class="text-xl font-bold text-blue-900">${business.name}</h3>
                </a>
              ` : `
                <h3 class="text-xl font-bold text-blue-900">${business.name}</h3>
              `}
              <p class="text-gray-600">${business.type}</p>
              ${business.address ? `<p class="text-sm text-gray-500 mt-2">${business.address} ${business.town}, ${business.state} ${business.zip}</p>` : ''}
            </div>
            <div class="flex items-center gap-4">
              <div class="flex gap-3">
                ${this.getSocialIcons(business)}
              </div>
              ${business.website ? `
                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              ` : ''}
            </div>
          </div>
        </div>
      `)
        .join('');
    document.getElementById('businessList').innerHTML = businessHTML;
  }
}
