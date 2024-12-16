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
            this.renderCalendar();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    initializeElements() {
        this.monthYearElement = document.getElementById('monthYear');
        this.calendarGrid = document.getElementById('calendarGrid');
        this.modal = document.getElementById('eventModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalContent = document.getElementById('modalContent');
    }

    setupEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    }

    async loadEvents() {
        try {
            const year = this.currentDate.getFullYear();
            const monthNum = this.currentDate.getMonth() + 1;
            const response = await fetch(`data/events/${year}/${monthNum}.csv`);
            const csvText = await response.text();
            this.events = this.parseCSV(csvText);
        } catch (error) {
            console.error('Error loading events:', error);
            this.events = [];
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

        // Render weekday headers
        this.calendarGrid.innerHTML = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            .map((day) => `<div class="text-center font-semibold py-2 text-primary-blue">${day}</div>`)
            .join('');

        // Add empty cells for days before the first of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            this.calendarGrid.innerHTML += `
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-100"></div>
            `;
        }

        // Render days of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
            const dayEvents = this.events.filter(
                (event) => new Date(event['Date and Time']).toDateString() === date.toDateString()
            );

            const isToday = date.toDateString() === new Date().toDateString();
            const dayElement = document.createElement('div');
            dayElement.className = `
                p-4 rounded-lg border transition-all duration-300
                ${dayEvents.length ? 'has-events cursor-pointer' : 'bg-gray-50 border-gray-100'}
                ${isToday ? 'ring-2 ring-primary-blue' : ''}
            `;

            dayElement.innerHTML = `
                <div class="font-medium ${isToday ? 'text-primary-blue' : ''}">${day}</div>
                ${
                dayEvents.length
                    ? `
                    <div class="text-sm text-primary-blue mt-1">
                        ${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}
                    </div>
                `
                    : ''
            }
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
                <div class="mb-6 p-6 border rounded-lg hover:shadow-lg transition-shadow">
                    <h4 class="text-4xl text-bold font-display text-primary-blue mb-2">${event['Event Name']}</h4>
                    <p class="text-primary-blue  text-3xl">${new Date(event['Date and Time']).toLocaleTimeString()}</p>
                    <p class="text-gray-700 mt-3  text-3xl">${event['Description']}</p>
                    <div class="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <span class="font-semibold text-gray-600 text-2xl">Location:</span>
                            <p class="text-gray-800 text-xl">${event['Location']}</p>
                        </div>
                        <div>
                            <span class="font-semibold text-gray-600 text-2xl">Duration:</span>
                            <p class="text-gray-800 text-xl">${event['Duration']}</p>
                        </div>
                        <div>
                            <span class="font-semibold text-gray-600 text-2xl">Price:</span>
                            <p class="text-gray-800 text-xl">${event['Price']}</p>
                        </div>
                    </div>
                    <div class="mt-4 flex flex-wrap gap-2">
                        ${event['Tags']
                    .split(',')
                    .map(
                        (tag) => `
                                <span class="px-3 py-1 bg-blue-50 text-primary-blue rounded-full text-sm">
                                    ${tag.trim()}
                                </span>
                            `
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

    async changeMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        await this.loadEvents();
        this.renderCalendar();
    }
}
