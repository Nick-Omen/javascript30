import getChallenge from './utils/import'

const nav = document.querySelector('nav');
const routeContainer = document.getElementById('route');

function onNavClick(e) {
  e.preventDefault();

  const link = e.target;

  getChallenge(link.getAttribute('href'))
    .then(c => {
      console.log(c);
      document.body.className = `body ${c.getBodyClass()}`
    });
}

nav.addEventListener('click', onNavClick);
