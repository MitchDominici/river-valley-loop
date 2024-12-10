class EventsPage {
    constructor() {
        this.currentDate = new Date();
        this.events = [];
    }

    async initialize() {
        try {
            await this.loadEvents();
            this.initializeElements();
            this.setupEventListeners();
            this.renderCalendar(); // Make sure calendar renders after initialization
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    initializeElements() {
        try {
            this.monthYearElement = document.getElementById('monthYear');
            this.calendarGrid = document.getElementById('calendarGrid');
            this.modal = document.getElementById('eventModal');
            this.modalTitle = document.getElementById('modalTitle');
            this.modalContent = document.getElementById('modalContent');
        } catch (error) {
            console.error(`Error initializing elements: ${error}`);
        }
    }

    setupEventListeners() {
        try {
            document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
            document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));
            document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        } catch (error) {
            console.error(`Error setting up event listeners: ${error}`);
        }
    }

    async loadEvents() {
        try {
            const year = new Date().getFullYear();
            const monthNum = new Date().getMonth() + 1;
            const monthEventsPath = `data/events/${year}/${monthNum}.csv`;
            const response = await fetch(monthEventsPath);
            const csvText = await response.text();
            this.events = this.parseCSV(csvText);
        } catch (error) {
            console.error('Error loading events:', error);
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split('|');
        return lines
            .slice(1)
            .filter((line) => line.trim())
            .map((line) => {
                const values = line.split('|');
                const event = {};
                headers.forEach((header, index) => {
                    event[header.trim()] = values[index]?.trim();
                });
                return event;
            });
    }

    renderCalendar() {
        this.monthYearElement.textContent = this.currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
        });

        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

        this.calendarGrid.innerHTML = `
            ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            .map((day) => `<div class="text-center font-semibold py-2">${day}</div>`)
            .join('')}
        `;

        for (let i = 0; i < firstDay.getDay(); i++) {
            this.calendarGrid.innerHTML += `<div class="p-2 bg-gray-100"></div>`;
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
            const dayEvents = this.events.filter(
                (event) => new Date(event['Date and Time']).toDateString() === date.toDateString()
            );

            const dayElement = document.createElement('div');
            dayElement.className = `p-2 border ${dayEvents.length ? 'cursor-pointer hover:bg-blue-50' : 'bg-gray-50'}`;
            dayElement.innerHTML = `
                <div class="font-medium">${day}</div>
                ${dayEvents.length ? `<div class="text-sm text-blue-600">${dayEvents.length} events</div>` : ''}
            `;

            if (dayEvents.length) {
                dayElement.addEventListener('click', () => this.showEvents(dayEvents));
            }

            this.calendarGrid.appendChild(dayElement);
        }
    }

    showEvents(events) {
        this.modalTitle.textContent = new Date(events[0]['Date and Time']).toLocaleDateString();
        this.modalContent.innerHTML = events
            .map(
                (event) => `
            <div class="mb-4 p-4 border rounded">
                <h4 class="font-bold">${event['Event Name']}</h4>
                <p class="text-gray-600">${new Date(event['Date and Time']).toLocaleTimeString()}</p>
                <p class="text-gray-800 mt-2">${event['Description']}</p>
                <p class="mt-2">
                    <span class="font-semibold">Location:</span> ${event['Location']}<br>
                    <span class="font-semibold">Duration:</span> ${event['Duration']}<br>
                    <span class="font-semibold">Price:</span> ${event['Price']}
                </p>
                <div class="mt-2">
                    ${event['Tags']
                    .split(',')
                    .map(
                        (tag) =>
                            `<span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">${tag.trim()}</span>`
                    )
                    .join('')}
                </div>
            </div>
        `
            )
            .join('');
        this.modal.classList.remove('hidden');
    }

    closeModal() {
        this.modal.classList.add('hidden');
    }

    changeMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.renderCalendar();
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOM loaded');
//   const calendar = new EventCalendar();
//   calendar.initialize();
// });
