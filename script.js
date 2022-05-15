import { slides } from './slides.js';

const slideContainer = document.querySelector('.slide-container');
const slideNumber = document.querySelector('.slide-number').querySelector('h1');
const slideName = document.querySelector('.slide-name').querySelector('h1');
const pageItems = document.querySelectorAll('.page-item');
let numPage = 1;

const renderPage = () => {
  const html = `
    <div class="slide-content slide-${numPage}">
      <ul class="slide-rows">
      ${slides[numPage - 1].listItems
        .map(li => {
          return `<li class="slide-row"><p>${li}</p></li>`;
        })
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
    if (id <= numPage) {
      pageItem.classList.add('seen');
    } else {
      pageItem.classList.remove('seen');
    }
  });
};

renderPage();

document.addEventListener('keydown', e => {
  numPage;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    if (numPage === 6) return;
    numPage++;
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    if (numPage === 1) return;
    numPage--;
  }
  renderPage();
});

pageItems.forEach(item => {
  item.addEventListener('click', () => {
    numPage = item.dataset.id;
    renderPage();
  });
});
