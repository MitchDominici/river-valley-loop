// Components to be loaded
const components = {
  header: 'components/header.html',
  footer: 'components/footer.html',
  home: 'pages/home.html',
  sponsors: 'pages/sponsors.html',
  stay: 'pages/stay.html',
  directions: 'pages/directions.html',
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
