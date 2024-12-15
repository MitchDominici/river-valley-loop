const components = {
  header: 'src/components/header.html',
  footer: 'src/components/footer.html',
  home: 'src/routes/home.html',
  towns: 'src/routes/towns.html',
  town: 'src/routes/town.html',
  events: 'src/routes/events.html',
  about: 'src/routes/about.html',
  contact: 'src/routes/contact.html',
  todo: 'src/routes/what-to-do.html',
  directions: 'src/routes/directions.html',
  sponsors: 'src/routes/sponsors.html',
  interactiveMap: 'src/routes/interactive-map.html',
};

// TODO - Fix browser back/forward

async function loadComponent(url, targetElement, subPage) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    targetElement = targetElement || document.getElementById('content');
    targetElement.innerHTML = html;

    const pageName = url.split('/').pop().replace('.html', '');


    cleanUp();

    switch (pageName) {
      case 'towns':
        window.townsPage = new TownsPage();
        window.townsPage.initialize();
        // new LoopMap();
        break;
      case 'town':
        window.townPage = new TownPage();
        window.townPage.initialize(subPage);
        break;
      case 'events':
        const events = new EventsPage();
        events.initialize();
        break;
      case 'home':
        window.homePage = new HomePage();
        window.homePage.initialize();
        break;
      case 'what-to-do':
        window.whatToDoPage = new WhatToDoPage();
        window.whatToDoPage.initialize();
      default:
        break;
    }

    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM Content Loaded');
      const sections = document.querySelectorAll('[data-scroll-animate]');
      console.log('Found sections:', sections.length);
    });
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

function cleanUp() {
  if (window.homePage) {
    window.homePage.destroy();
    window.homePage = null;
  }
  delete window.townsPage;
  delete window.whatToDoPage;
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
  loadComponent(components.header, document.querySelector('.header')).then(() => {
    try {
      document.getElementById('mobile-menu-button').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
      });
    } catch (e) {
      console.error('Error adding mobile menu event listener:', e);
    }
  });
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
