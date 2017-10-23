import './index.sass';

function getChallenge(challenge) {
  return new Promise((resolve, reject) => {
    import(`./days/${challenge}/index`)
      .then(module => resolve(module.default))
      .catch(err => reject(err));
  });
}

const nav = document.getElementById('nav');
const container = document.getElementById('container');

function switchChallenge(key) {
  getChallenge(key)
    .then(c => {
      container.className = 'container';
      container.innerHTML = c.renderHTML();
      setTimeout(() => c.onInit(), 0);
    })
    .catch(err => {
      const error = document.createElement('pre');
      error.innerHTML = err;
      container.innerHTML = '';
      container.className = 'container error';
      container.appendChild(error);
    });
}

function onNavClick(e) {
  e.preventDefault();

  const link = e.target;
  const allLinks = nav.querySelectorAll('a');

  Object.keys(allLinks).forEach(i => allLinks.item(i).classList.remove('is-active'));

  switchChallenge(link.getAttribute('href'));
  link.classList.add('is-active');
}

nav.addEventListener('click', onNavClick);
switchChallenge('01');