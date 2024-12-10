const components = {
  header: 'src/components/header.html',
  footer: 'src/components/footer.html',
  home: 'src/routes/home.html',
  towns: 'src/routes/towns.html',
  events: 'src/routes/events.html',
  about: 'src/routes/about.html',
  contact: 'src/routes/contact.html',
  stay: 'src/routes/stay.html',
  directions: 'src/routes/directions.html',
  sponsors: 'src/routes/sponsors.html',
};

// TODO - Fix browser back/forward

async function loadComponent(url, targetElement) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    targetElement = targetElement || document.getElementById('content');
    targetElement.innerHTML = html;

    const pageName = url.split('/').pop().replace('.html', '');
    if (pageName === 'events') {
      const calendar = new EventCalendar();
      calendar.initialize();
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

function router(updateHistory = true) {
  const path = window.location.hash.slice(1) || 'home';
  loadComponent(components[path], document.getElementById('content'));

  if (updateHistory) {
    history.pushState({page: path}, '', `#${path}`);
  }
}

// Initialize components
window.addEventListener('load', () => {
  loadComponent(components.header, document.querySelector('.header'));
  loadComponent(components.footer, document.querySelector('.footer'));
  router(false);
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
  console.log('popstate event');
  router(false);
});

// Handle hash changes (clicking links)
window.addEventListener('hashchange', (e) => {
  e.preventDefault();
  console.log('hashchange event:', e);
  router(true);
});