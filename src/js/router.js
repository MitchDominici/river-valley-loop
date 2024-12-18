const components = {
  header: 'src/components/header.html',
  footer: 'src/components/footer.html',
  home: 'src/routes/home.html',
  towns: 'src/routes/towns.html',
  town: 'src/routes/town.html',
  events: 'src/routes/events.html',
  about: 'src/routes/about.html',
  sponsors: 'src/routes/sponsors.html',
  interactiveMap: 'src/routes/interactive-map.html',
};

// TODO - Fix browser back/forward

async function loadComponent(url, targetElement, subPage) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    targetElement = targetElement || document.getElementById('content');
    targetElement.style.opacity = 0;

    targetElement.innerHTML = html;
    targetElement.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    targetElement.style.transform = 'translateY(20px)';
    requestAnimationFrame(() => {
      targetElement.style.opacity = 1;
      targetElement.style.transform = 'translateY(0)';
    });

    const pageName = url.split('/').pop().replace('.html', '');

    // Update URL and history state
    if (targetElement === document.getElementById('content')) {
      updateHistory(pageName, subPage);
    }

    cleanUp();
    initializePage(pageName, subPage);
    // document.addEventListener('DOMContentLoaded', () => {
    //   console.log('DOM Content Loaded');
    //   const sections = document.querySelectorAll('[data-scroll-animate]');
    //   console.log('Found sections:', sections.length);
    // });
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

function updateHistory(pageName, subPage) {
  const newUrl = subPage ? `#${pageName}/${subPage}` : `#${pageName}`;
  const state = {pageName, subPage};

  // Check if this is a new navigation or back/forward
  const currentState = history.state;
  if (!currentState || currentState.pageName !== pageName || currentState.subPage !== subPage) {
    history.pushState(state, '', newUrl);
  }
}

function initializePage(pageName, subPage) {
  const riverContainer = document.getElementById('river-boat-container');

  riverContainer.style.visibility = 'hidden';
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
      new SeasonalDecorator();
      break;
    case 'home':
      riverContainer.style.visibility = 'hidden';
      break;
    case 'what-to-do':
      window.whatToDoPage = new WhatToDoPage();
      window.whatToDoPage.initialize();
    default:
      break;
  }

  if (pageName !== 'home') {
    riverContainer.style.visibility = 'visible';
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

function getPathAndSubpage() {
  const hash = window.location.hash.slice(1) || 'home';
  const [path, subPage] = hash.split('/');
  return {path, subPage};
}

function router(updateHistory = true) {
  const {path, subPage} = getPathAndSubpage();

  if (!components[path]) {
    console.error('Invalid path:', path);
    return;
  }


  loadComponent(components[path], document.getElementById('content'), subPage);

  if (updateHistory) {
    const url = subPage ? `#${path}/${subPage}` : `#${path}`;
    history.pushState({path, subPage}, '', url);
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
window.addEventListener('popstate', (event) => {
  if (event.state) {
    const {pageName, subPage} = event.state;
    loadComponent(components[pageName], null, subPage);
  }
});
