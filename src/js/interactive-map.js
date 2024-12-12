class LoopMap {
    constructor() {
        this.towns = [
            {
                name: 'Hermann',
                lat: 38.70416299155045,
                lng: -91.43934350849095,
                description: 'Known for its wineries and German heritage',
            },
            {
                name: 'Berger',
                lat: 38.674196991100345,
                lng: -91.33903473574918,
                description: 'Charming riverside community',
            },
            {
                name: 'New Haven',
                lat: 38.60847812112097,
                lng: -91.21955561111135,
                description: 'Historic river town with artistic flair',
            },
            {
                name: 'Lyon',
                lat: 38.512002319887294,
                lng: -91.17326693161998,
                description: 'Scenic beauty along the river',
            },
            {
                name: 'Beaufort',
                lat: 38.420838061807274,
                lng: -91.18894395500587,
                description: 'Rich in agricultural heritage',
            },
            {
                name: 'Gerald',
                lat: 38.39969993488935,
                lng: -91.33022219842995,
                description: 'Historic railroad town',
            },
            {
                name: 'Rosebud',
                lat: 38.38726123479204,
                lng: -91.40104065137277,
                description: 'Known for antique shops',
            },
            {
                name: 'Owensville',
                lat: 38.34567850926461,
                lng: -91.50134197621284,
                description: 'Regional hub with rural charm',
            },
            {
                name: 'Swiss',
                lat: 38.56150628750282,
                lng: -91.47099024325203,
                description: 'Rich Swiss heritage community',
            },
            {
                name: 'Stony Hill',
                lat: 38.54306039779412,
                lng: -91.37263205118418,
                description: 'Scenic hilltop views',
            },
        ];

        this.svg = document.querySelector('#mapContainer svg');
        this.infoPanel = document.getElementById('townInfo');
        this.townNameEl = document.getElementById('townName');
        this.townDescEl = document.getElementById('townDesc');

        this.initializeMap();
    }

    // Convert lat/lng to SVG coordinates
    convertToSVGCoords(lat, lng) {
        const minLat = 38.34567850926461;
        const maxLat = 38.70416299155045;
        const minLng = -91.50134197621284;
        const maxLng = -91.17326693161998;

        const x = ((lng - minLng) / (maxLng - minLng)) * 400;
        const y = 300 - ((lat - minLat) / (maxLat - minLat)) * 300;

        return {x, y};
    }

    initializeMap() {
        // Add town markers
        this.towns.forEach((town) => {
            const coords = this.convertToSVGCoords(town.lat, town.lng);

            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

            // Create marker
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', coords.x);
            circle.setAttribute('cy', coords.y);
            circle.setAttribute('r', '6');
            circle.setAttribute('fill', '#3B82F6');
            circle.setAttribute('class', 'cursor-pointer transition-all duration-300 hover:r-8');

            // Create label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', coords.x);
            text.setAttribute('y', coords.y + 20);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('class', 'text-xs font-semibold');
            text.textContent = town.name;

            group.appendChild(circle);
            group.appendChild(text);

            // Add hover effects
            group.addEventListener('mouseenter', () => {
                circle.setAttribute('fill', '#EF4444');
                circle.setAttribute('r', '8');
                this.showTownInfo(town, coords);
            });

            group.addEventListener('mouseleave', () => {
                circle.setAttribute('fill', '#3B82F6');
                circle.setAttribute('r', '6');
                this.hideTownInfo();
            });

            this.svg.appendChild(group);
        });
    }

    showTownInfo(town, coords) {
        this.townNameEl.textContent = town.name;
        this.townDescEl.textContent = town.description;
        this.infoPanel.classList.remove('hidden');
    }

    hideTownInfo() {
        this.infoPanel.classList.add('hidden');
    }
}
