// src/routes/what-to-do.js
class WhatToDoPage {
  constructor() {
    this.businesses = {
      Hermann: [
        {
          name: 'Stone Hill Winery',
          type: 'Winery',
          description: 'Historic winery offering tours and tastings',
          hours: {
            sunday: '11:00 AM - 5:00 PM',
            monday: '10:00 AM - 5:00 PM',
            tuesday: '10:00 AM - 5:00 PM',
            wednesday: '10:00 AM - 5:00 PM',
          },
          image:
              'https://mitchdominici.github.io/river-valley-loop/images/towns/hermann/hermann-1.jpg',
        },
        {
          name: 'Tin Mill Brewery',
          type: 'Brewery',
          description: 'Craft brewery in historic mill building',
          hours: {
            sunday: '11:00 AM - 6:00 PM',
            monday: 'Closed',
            tuesday: '11:00 AM - 8:00 PM',
            wednesday: '11:00 AM - 8:00 PM',
          },
          image:
              'https://mitchdominici.github.io/river-valley-loop/images/towns/hermann/hermann-2.jpg',
        },
      ],
      'New Haven': [
        {
          name: 'Robller Vineyard',
          type: 'Winery',
          description: 'Family-owned winery with scenic views',
          hours: {
            sunday: '11:00 AM - 6:00 PM',
            monday: 'Closed',
            tuesday: 'Closed',
            wednesday: '11:00 AM - 5:00 PM',
          },
          image:
              'https://mitchdominici.github.io/river-valley-loop/images/towns/new-haven/new-haven-1.jpg',
        },
      ],
      // Add more towns and businesses as needed
    };
  }

  initialize() {
    this.dayFilter = document.getElementById('dayFilter');
    this.businessGrid = document.getElementById('businessGrid');
    this.modal = document.getElementById('businessModal');
    this.modalContent = document.getElementById('businessModalContent');

    this.attachEventListeners();
    this.renderBusinesses('all');
  }

  attachEventListeners() {
    this.dayFilter.addEventListener('change', (e) => {
      this.renderBusinesses(e.target.value);
    });

    document.getElementById('closeBusinessModal')?.addEventListener('click', () => {
      this.closeModal();
    });
  }

  renderBusinesses(day) {
    let businessesHTML = '';

    for (const [town, businesses] of Object.entries(this.businesses)) {
      const filteredBusinesses =
          day === 'all'
              ? businesses
              : businesses.filter((b) => b.hours[day] && b.hours[day] !== 'Closed');

      if (filteredBusinesses.length > 0) {
        businessesHTML += this.renderTownBusinesses(town, filteredBusinesses);
      }
    }

    this.businessGrid.innerHTML = businessesHTML;
    this.attachBusinessListeners();
  }

  renderTownBusinesses(town, businesses) {
    return businesses
        .map(
            (business) => `
            <div class="business-card cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                 data-town="${town}"
                 data-business="${business.name}">
                <img src="${business.image}" alt="${business.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-bold mb-2">${business.name}</h3>
                    <p class="text-gray-600 mb-2">${town}</p>
                    <p class="text-gray-500">${business.type}</p>
                </div>
            </div>
        `
        )
        .join('');
  }

  attachBusinessListeners() {
    const cards = document.querySelectorAll('.business-card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const town = card.dataset.town;
        const businessName = card.dataset.business;
        this.showBusinessDetails(town, businessName);
      });
    });
  }

  showBusinessDetails(town, businessName) {
    const business = this.businesses[town].find((b) => b.name === businessName);

    this.modalContent.innerHTML = `
            <h2 class="text-3xl font-bold mb-4">${business.name}</h2>
            <p class="text-gray-700 mb-6">${business.description}</p>
            
            <div class="mb-6">
                <img src="${business.image}" alt="${business.name}" class="w-full rounded-lg">
            </div>

            <div class="border-t pt-6">
                <h3 class="text-2xl font-bold mb-4">Hours of Operation</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${Object.entries(business.hours)
        .map(
            ([day, hours]) => `
                        <div class="p-4 ${hours === 'Closed' ? 'bg-red-50' : 'bg-green-50'} rounded-lg">
                            <h4 class="font-bold capitalize">${day}</h4>
                            <p class="text-gray-600">${hours}</p>
                        </div>
                    `
        )
        .join('')}
                </div>
            </div>
        `;

    this.modal.classList.remove('hidden');
  }

  closeModal() {
    this.modal.classList.add('hidden');
  }
}
