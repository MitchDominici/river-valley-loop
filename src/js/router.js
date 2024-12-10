// Components to be loaded
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

async function loadComponent(url, targetElement) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    targetElement.innerHTML = html;
    // Update browser history when loading new component
    const pageName = url.split('/').pop().replace('.html', '');
    history.pushState({page: pageName}, '', `#${pageName}`);
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

function router() {
  const path = window.location.hash.slice(1) || 'home';
  loadComponent(components[path], document.getElementById('content'));
}

window.addEventListener('load', () => {
  loadComponent(components.header, document.querySelector('.header'));
  loadComponent(components.footer, document.querySelector('.footer'));
  router();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    loadComponent(components[event.state.page], document.getElementById('content'));
  } else {
    router();
  }
});

window.addEventListener('hashchange', router);
