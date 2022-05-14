const slideContainer = document.querySelector('.slide-container');
const slideNumber = document.querySelector('.slide-number').querySelector('h1');
const slideName = document.querySelector('.slide-name').querySelector('h1');
const pageItems = document.querySelectorAll('.page-item');
let numPage = 1;

const slides = [
  {
    name: 'Analysis',
    listItems: [
      'Product Owner 1',
      'Project Manager 1',
      'Business Analyst 1',
      'CTO 1',
    ],
  },
  {
    name: 'Design',
    listItems: [
      'Product Owner 2',
      'Project Manager 2',
      'Business Analyst 2',
      'CTO 2',
    ],
  },
  {
    name: 'Development',
    listItems: [
      'Product Owner 3',
      'Project Manager 3',
      'Business Analyst 3',
      'CTO 3',
    ],
  },
  {
    name: 'Testing',
    listItems: [
      'Product Owner 4',
      'Project Manager 4',
      'Business Analyst 4',
      'CTO 4',
    ],
  },
  {
    name: 'Deployment',
    listItems: [
      'Product Owner 5',
      'Project Manager 5',
      'Business Analyst 5',
      'CTO 5',
    ],
  },
  {
    name: 'Maintenace',
    listItems: [
      'Product Owner 6',
      'Project Manager 6',
      'Business Analyst 6',
      'CTO 6',
    ],
  },
];

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
    const id = pageItem.dataset.id - 1;
    if (id < numPage) {
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
