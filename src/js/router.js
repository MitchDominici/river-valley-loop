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

// Load component content
async function loadComponent(url, targetElement) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    targetElement.innerHTML = html;
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Router function
function router() {
  const path = window.location.hash.slice(1) || 'home';
  loadComponent(components[path], document.getElementById('content'));
}

// Initial load
window.addEventListener('load', () => {
  loadComponent(components.header, document.querySelector('.header'));
  loadComponent(components.footer, document.querySelector('.footer'));
  router();
});

// Handle navigation
window.addEventListener('hashchange', router);
