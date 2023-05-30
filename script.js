import data from './slides.json' assert { type: 'json' };
const { slides } = data;
const slideContainer = document.querySelector('.slide-container');
const slideNumber = document.querySelector('.slide-number').querySelector('h1');
const slideName = document.querySelector('.slide-name').querySelector('h1');
const pageItems = document.querySelectorAll('.page-item');
const welcome = document.querySelector('.welcome');
let numPage = 1;

const renderPage = () => {
  const html = `
    <div class="slide-content slide-${numPage}">
      <ul class="slide-rows">
      ${slides[numPage - 1].listItems
        .map(li => `<li class="slide-row"><p>${li}</p></li>`)
        .join('')}
      </ul>
    </div>
  `;

  slideContainer.innerHTML = ``;
  slideContainer.insertAdjacentHTML('afterbegin', html);
  slideNumber.textContent = numPage;
  slideName.textContent = slides[numPage - 1].name;

  pageItems.forEach(pageItem => {
    const id = pageItem.dataset.id;
    if (id <= numPage) pageItem.classList.add('seen');
    else pageItem.classList.remove('seen');
  });
};

const init = () => {
  welcome.classList.remove('invisible');
  welcome.classList.remove('hidden');
  renderPage();
};

init();

const getStartedHandler = e => {
  welcome.classList.add('invisible');
  setTimeout(() => welcome.classList.add('hidden'), 1e3);
};
document.addEventListener('click', getStartedHandler);
document.addEventListener(
  'keydown',
  e => e.key === 'Enter' && getStartedHandler(e)
);

document.addEventListener('keydown', e => {
  const isNextKey = ['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key);
  const isPreviousKey = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key);
  const isHomeKey = e.key === 'Home';
  const isEndKey = e.key === 'End';
  const ACTIONS = {
    [isNextKey && numPage !== 6]: () => numPage++,
    [isPreviousKey && numPage !== 1]: () => numPage--,
    [isHomeKey && numPage !== 1]: () => (numPage = 1),
    [isEndKey && numPage !== 6]: () => (numPage = 6),
  };
  ACTIONS['true']?.();
  renderPage();
});

pageItems.forEach(item => {
  item.addEventListener('click', () => {
    numPage = item.dataset.id;
    renderPage();
  });
});

// STORY LEFT-RIGHT NAVIGATION

const storyLeft = document.querySelector('.story-left');
const storyRight = document.querySelector('.story-right');

['click'].forEach(evt => {
  storyLeft.addEventListener(evt, () => {
    if (numPage !== 1) {
      numPage--;
      renderPage();
    } else return;
  });
});

['click'].forEach(evt => {
  storyRight.addEventListener(evt, () => {
    if (numPage !== 6) {
      numPage++;
      renderPage();
    } else return;
  });
});
