class SeasonalDecorator {
    constructor() {
        this.holidays = {
            newYears: {
                dateRange: {start: '12-26', end: '01-02'},
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <text x="-10" y="5" fill="#ffd700" style="font-size: 20px">20</text>
                            <text x="-5" y="20" fill="#ffd700" style="font-size: 20px">24</text>
                            <circle cx="0" cy="0" r="2" fill="#ffd700"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M-10,-10 L10,10 M-10,10 L10,-10" stroke="#ffd700" stroke-width="3"/>
                            <circle cx="0" cy="0" r="15" stroke="#ffd700" fill="none"/>
                        </g>`,
                },
            },
            valentines: {
                dateRange: {start: '02-09', end: '02-14'},
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,15 L-15,0 A7.5,7.5 0 1,1 0,-7.5 A7.5,7.5 0 1,1 15,0 Z" fill="#ff69b4"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,15 L-15,0 A7.5,7.5 0 1,1 0,-7.5 A7.5,7.5 0 1,1 15,0 Z" fill="#ff1493"/>
                        </g>`,
                },
            },
            stPatricks: {
                dateRange: {start: '03-12', end: '03-17'},
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,0 L-10,-10 L0,-5 L10,-10 L0,0 L10,10 L0,5 L-10,10 Z" fill="#228b22"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M-5,-5 A10,10 0 1,1 5,5" stroke="#ffd700" fill="none" stroke-width="3"/>
                        </g>`,
                },
            },
            independenceDay: {
                dateRange: {start: '06-27', end: '07-04'},
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,-15 L2,-5 L12,-5 L4,1 L7,11 L0,5 L-7,11 L-4,1 L-12,-5 L-2,-5 Z" 
                                  fill="#ff0000" stroke="#fff"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <rect x="-15" y="-10" width="30" height="20" fill="#ff0000"/>
                            <rect x="-15" y="-6" width="30" height="4" fill="#fff"/>
                            <rect x="-15" y="2" width="30" height="4" fill="#fff"/>
                            <rect x="-15" y="-10" width="12" height="10" fill="#0000ff"/>
                            <circle cx="-9" cy="-5" r="1" fill="#fff"/>
                        </g>`,
                },
            },
            halloween: {
                dateRange: {start: '10-15', end: '10-31'},
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,-15 C15,-15 20,-5 20,5 C20,15 10,20 0,20 C-10,20 -20,15 -20,5 C-20,-5 -15,-15 0,-15" 
                                  fill="#ff6b00"/>
                            <path d="M-10,0 L-5,5 L-10,10 M10,0 L5,5 L10,10" stroke="#000" fill="none"/>
                            <path d="M-5,12 C0,15 5,15 10,12" stroke="#000" fill="none"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M-15,15 Q0,-15 15,15 Z" fill="#000"/>
                            <circle cx="-7" cy="5" r="3" fill="#ff0"/>
                            <circle cx="7" cy="5" r="3" fill="#ff0"/>
                        </g>`,
                },
            },
            thanksgiving: {
                dateRange: {start: '11-01', end: '11-29'}, // Fourth Thursday
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,-15 C10,-15 15,-10 15,0 C15,10 10,15 0,15 C-10,15 -15,10 -15,0 C-15,-10 -10,-15 0,-15" 
                                  fill="#8b4513"/>
                            <circle cx="-5" cy="-5" r="2" fill="#000"/>
                            <circle cx="5" cy="-5" r="2" fill="#000"/>
                            <path d="M0,5 L-5,0 L5,0 Z" fill="#ff8c00"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,0 C5,-10 10,-5 10,0 C10,5 5,10 0,10 C-5,10 -10,5 -10,0 C-10,-5 -5,-10 0,0" 
                                  fill="#deb887"/>
                        </g>`,
                },
            },
            christmas: {
                dateRange: {start: '12-01', end: '12-26'},
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,-20 L15,0 L10,0 L20,15 L-20,15 L-10,0 L-15,0 Z" fill="#228b22"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <circle cx="0" cy="0" r="20" fill="#c0392b"/>
                            <circle cx="-5" cy="-5" r="5" fill="#e74c3c"/>
                            <rect x="-2" y="-25" width="4" height="7" fill="#7f8c8d"/>
                        </g>`,
                },
            },
        };
        this.seasons = {
            winter: {
                dateRange: {start: '12-01', end: '02-28'},
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <circle cx="0" cy="0" r="20" fill="#c0392b"/>
                            <circle cx="-5" cy="-5" r="5" fill="#e74c3c"/>
                            <rect x="-2" y="-25" width="4" height="7" fill="#7f8c8d"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,-20 L5,-5 L20,0 L5,5 L0,20 L-5,5 L-20,0 L-5,-5 Z" 
                                  fill="#fff" stroke="#3498db" stroke-width="2"/>
                            <circle cx="0" cy="0" r="3" fill="#3498db"/>
                        </g>`,
                },
            },
            spring: {
                dateRange: {start: '03-01', end: '05-31'},
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,0 Q5,-10 0,-20 Q-5,-10 0,0" fill="#ff69b4"/>
                            <path d="M0,0 Q10,-5 20,0 Q10,5 0,0" fill="#ff69b4"/>
                            <path d="M0,0 Q5,10 0,20 Q-5,10 0,0" fill="#ff69b4"/>
                            <path d="M0,0 Q-10,-5 -20,0 Q-10,5 0,0" fill="#ff69b4"/>
                            <circle cx="0" cy="0" r="5" fill="#ffd700"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M-10,-10 C-5,-15 5,-15 10,-10 C15,-5 15,5 10,10 C5,15 -5,15 -10,10 C-15,5 -15,-5 -10,-10Z" 
                                  fill="#98fb98"/>
                            <path d="M0,-15 L0,15 M-15,0 L15,0" stroke="#228b22" stroke-width="2"/>
                        </g>`,
                },
            },
            summer: {
                dateRange: {start: '06-01', end: '08-31'},
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <circle cx="0" cy="0" r="12" fill="#ffd700"/>
                            <path d="M0,-20 L3,-15 L0,-12 L-3,-15 Z M20,0 L15,3 L12,0 L15,-3 Z 
                                   M0,20 L-3,15 L0,12 L3,15 Z M-20,0 L-15,-3 L-12,0 L-15,3 Z" 
                                  fill="#ffd700"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,-15 C10,-15 15,-10 15,0 C15,10 10,15 0,15 C-10,15 -15,10 -15,0 C-15,-10 -10,-15 0,-15Z" 
                                  fill="#87ceeb"/>
                            <path d="M-8,0 C-8,5 8,5 8,0" stroke="white" fill="none" stroke-width="2"/>
                        </g>`,
                },
            },
            fall: {
                dateRange: {start: '09-01', end: '11-30'},
                left: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,-15 C15,-15 15,15 0,15 C-15,15 -15,-15 0,-15" 
                                  fill="#ff8c00" transform="rotate(45)"/>
                        </g>`,
                },
                right: {
                    viewBox: '0 0 50 50',
                    svg: `<g transform="translate(25, 25)">
                            <path d="M0,-20 C10,-15 15,-10 15,0 C15,10 10,15 0,20 L0,-20" 
                                  fill="#8b4513"/>
                            <path d="M0,-20 C-10,-15 -15,-10 -15,0 C-15,10 -10,15 0,20 L0,-20" 
                                  fill="#8b4513"/>
                        </g>`,
                },
            },
        };

        this.initialize();
    }

    getCurrentDecoration() {
        const today = new Date('02-12-2024');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const currentDate = `${month}-${day}`;

        // Check for holidays first
        const holiday = Object.entries(this.holidays).find(([_, data]) => {
            const start = data.dateRange.start;
            const end = data.dateRange.end;

            if (start > end) {
                return currentDate >= start || currentDate <= end;
            }
            return currentDate >= start && currentDate <= end;
        });

        if (holiday) {
            return {type: 'holiday', data: this.holidays[holiday[0]]};
        }

        // Fall back to seasonal if no holiday
        const season = this.getCurrentSeason();
        return {type: 'season', data: this.seasons[season]};
    }

    getCurrentSeason() {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const currentDate = `${month}-${day}`;

        return (
            Object.entries(this.seasons).find(([_, season]) => {
                const start = season.dateRange.start;
                const end = season.dateRange.end;

                if (start > end) {
                    return currentDate >= start || currentDate <= end;
                }
                return currentDate >= start && currentDate <= end;
            })?.[0] || 'winter'
        );
    }

    initialize() {
        const decoration = this.getCurrentDecoration();

        // Update left decoration
        const leftDecoration = document.getElementById('left-decoration');
        if (leftDecoration) {
            leftDecoration.innerHTML = `
                <svg viewBox="${decoration.data.left.viewBox}" class="w-16 h-16 transform -rotate-12">
                    ${decoration.data.left.svg}
                </svg>`;
        }

        // Update right decoration
        const rightDecoration = document.getElementById('right-decoration');
        if (rightDecoration) {
            rightDecoration.innerHTML = `
                <svg viewBox="${decoration.data.right.viewBox}" class="w-16 h-16 transform rotate-12">
                    ${decoration.data.right.svg}
                </svg>`;
        }
    }
}
