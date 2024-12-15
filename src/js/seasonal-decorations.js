// seasonal-decorations.js
const seasonalDecorations = {
    winter: {
        dateRange: {start: '12-01', end: '02-28'},
        svgs: [
            {
                id: 'santa',
                viewBox: '0 0 100 100',
                path: `<path d="M50,10 C30,10 20,30 20,40 C20,50 30,60 50,60 C70,60 80,50 80,40 C80,30 70,10 50,10 Z" fill="#ff0000"/>
                      <circle cx="40" cy="30" r="5" fill="white"/>
                      <circle cx="60" cy="30" r="5" fill="white"/>
                      <path d="M45,40 C45,45 55,45 55,40" stroke="white" fill="none" stroke-width="2"/>`,
                position: 'top-right'
            },
            {
                id: 'ornament',
                viewBox: '0 0 50 50',
                path: `<circle cx="25" cy="25" r="20" fill="#c0392b"/>
                      <circle cx="20" cy="20" r="5" fill="#e74c3c"/>
                      <rect x="23" y="0" width="4" height="7" fill="#7f8c8d"/>`,
                position: 'bottom-left'
            }
        ]
    },
    spring: {
        dateRange: {start: '03-01', end: '05-31'},
        svgs: [
            {
                id: 'flower',
                viewBox: '0 0 100 100',
                path: `<circle cx="50" cy="50" r="10" fill="#f1c40f"/>
                      <path d="M50,20 Q60,35 50,50 Q40,35 50,20" fill="#e74c3c" transform="rotate(0 50 50)"/>
                      <path d="M50,20 Q60,35 50,50 Q40,35 50,20" fill="#e74c3c" transform="rotate(72 50 50)"/>
                      <path d="M50,20 Q60,35 50,50 Q40,35 50,20" fill="#e74c3c" transform="rotate(144 50 50)"/>
                      <path d="M50,20 Q60,35 50,50 Q40,35 50,20" fill="#e74c3c" transform="rotate(216 50 50)"/>
                      <path d="M50,20 Q60,35 50,50 Q40,35 50,20" fill="#e74c3c" transform="rotate(288 50 50)"/>`,
                position: 'top-left'
            }
        ]
    },
    // Add summer and fall similarly
};

class SeasonalDecorator {
    constructor() {
        this.currentSeason = this.getCurrentSeason();
    }

    getCurrentSeason() {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const currentDate = `${month}-${day}`;

        return Object.entries(seasonalDecorations).find(([_, season]) => {
            const start = season.dateRange.start;
            const end = season.dateRange.end;

            // Handle winter spanning year end
            if (start > end) {
                return currentDate >= start || currentDate <= end;
            }

            return currentDate >= start && currentDate <= end;
        })?.[0] || 'default';
    }

    addDecorationsToPage() {
        const seasonData = seasonalDecorations[this.currentSeason];
        if (!seasonData) return;

        const container = document.createElement('div');
        container.className = 'fixed inset-0 pointer-events-none z-40';

        seasonData.svgs.forEach(svg => {
            const element = document.createElement('div');
            element.className = `absolute ${this.getPositionClasses(svg.position)}`;
            element.innerHTML = `
                <svg viewBox="${svg.viewBox}" class="w-24 h-24 opacity-50">
                    ${svg.path}
                </svg>
            `;
            container.appendChild(element);
        });

        document.body.appendChild(container);
    }

    getPositionClasses(position) {
        const positions = {
            'top-left': 'top-4 left-4',
            'top-right': 'top-4 right-4',
            'bottom-left': 'bottom-4 left-4',
            'bottom-right': 'bottom-4 right-4'
        };
        return positions[position] || '';
    }
}

