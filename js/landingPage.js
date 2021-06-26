// Global bindings
const expandStory = document.querySelector('.expand-story-icon');
const heroContent = document.querySelector('.hero-content');
const expandPhoto = document.querySelector('.expand-photo-icon');
const heroContentDescH2 = document.querySelector('.hero-content--desc h2');
const heroContentDescP = document.querySelector('.hero-content--desc p');
const heroContentDescBtn = document.querySelector('.hero-content--desc button');
const closeIcon = document.querySelector('.close-icon');
const hamburgerIcon = document.querySelector('.hamburger-icon');
const mobileOverlay = document.querySelector('.mobile-overlay');
const navigation = document.querySelector('.navigation');

/**
 * Mobile navigation toggle functions
 */
function closeNavigation() {
  mobileOverlay.style.display = 'none';
}
function openNavigation() {
  mobileOverlay.style.display = 'block';
}
function closeNavigationOnScroll() {
  if (window.scrollY > 0) mobileOverlay.style.display = 'none';
}

/**
 * Add/remove expand icons
 * @param {string} storyDisplay
 * @param {string} photoDisplay
 */
function toggleExpandIconDisplay(storyDisplay, photoDisplay) {
  expandStory.style.display = storyDisplay;
  expandPhoto.style.display = photoDisplay;
}

/**
 * Add/remove text in hero description
 * @param {string} display
 */
function toggleDescTextDisplay(display) {
  heroContentDescH2.style.display = display;
  heroContentDescP.style.display = display;
  heroContentDescBtn.style.display = display;
}

/**
 * Hero column toggle functions
 */
function expandStorySection() {
  heroContent.style.gridTemplateColumns = '3fr 1fr';
  toggleExpandIconDisplay('none', 'block');

  setTimeout(() => {
    toggleDescTextDisplay('block');
  }, 200);
}
function expandPhotoSection() {
  heroContent.style.gridTemplateColumns = '1fr 3fr';
  toggleExpandIconDisplay('block', 'none');

  if (window.innerWidth < 768) {
    toggleDescTextDisplay('none');
  }
}
function toggleTextOnWindowResize() {
  if (window.innerWidth < 768) {
    heroContent.style.gridTemplateColumns = '1fr 3fr';
    toggleExpandIconDisplay('block', 'none');
    toggleDescTextDisplay('none');
  } else {
    toggleDescTextDisplay('block');
  }
}

/**
 * Display beers from data.js to DOM
 */
function displayBeers() {
  const beerContainer = document.querySelector('.beer-container');

  data.forEach((beer) => {
    beerContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="beer-item">
        <h3>${beer.brand}</h3>
        <p>${beer.type}</p>
        <img
          src="${beer.url}"
          alt="beer"
          class="beer-img"
        />
      </div>`
    );
  });
}

// Event listeners
window.addEventListener('load', displayBeers);
window.addEventListener('resize', toggleTextOnWindowResize);
window.addEventListener('scroll', closeNavigationOnScroll);
expandStory.addEventListener('click', expandStorySection);
expandPhoto.addEventListener('click', expandPhotoSection);
closeIcon.addEventListener('click', closeNavigation);
hamburgerIcon.addEventListener('click', openNavigation);
