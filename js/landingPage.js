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
const beverageNavTypes = document.querySelector('.beverages-nav--types');

/**
 * Mobile navigation toggle functions
 */
function closeNavigation() {
  mobileOverlay.style.opacity = '0';
  setTimeout(() => {
    mobileOverlay.style.display = 'none';
  }, 100);
}
function openNavigation() {
  mobileOverlay.style.display = 'block';
  setTimeout(() => {
    mobileOverlay.style.opacity = '1';
  }, 100);
}
function closeNavigationOnScroll() {
  if (window.scrollY > 0) closeNavigation();
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

  if (window.innerWidth < 768) toggleDescTextDisplay('none');
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
 * Toggle 'active' class on span elements and 'active' key in data object.
 * Call the displayBeers function, passing in the new filteredBeers array.
 * @param {object} e click event object
 */
function filterBeveragesByTags(e) {
  const { target } = e;
  const {
    textContent: targetText,
    classList: targetClass,
    tagName: targetTagName,
  } = target;
  let filteredBeers = [];

  // Toggle 'active' class on span elements
  if (targetTagName === 'SPAN') targetClass.toggle('active');

  // Toggle 'active' key on data array items
  data.forEach((beer) => {
    if (beer.type === targetText && !beer.active) {
      beer.active = true;
    } else if (beer.type === targetText && !targetClass.contains('active')) {
      beer.active = false;
    }
  });

  // Search for active beer items and display to DOM
  filteredBeers = data.filter((beer) => beer.active === true);

  displayBeers(filteredBeers);
}

/**
 * Display all beer info on page load or info specific to user selections
 * @param {array} filteredBeerArr
 */
function displayBeers(filteredBeerArr) {
  let beerHTML = '';

  if (!filteredBeerArr.length) {
    data.forEach((beer) => {
      beerHTML += `
        <div class="beer-item">
          <h3>${beer.brand}</h3>
          <p>${beer.type}</p>
          <div class="overlay-container">
            <img
            src="${beer.url}"
            alt="${beer.brand} ${beer.type}"
            class="beer-img"
            loading="lazy"
            />
            <div class="overlay">
              <p class="overlay-text">${beer.desc}</p>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    filteredBeerArr.forEach((beer) => {
      beerHTML += `
        <div class="beer-item">
          <h3>${beer.brand}</h3>
          <p>${beer.type}</p>
          <div class="overlay-container">
            <img
            src="${beer.url}"
            alt="${beer.brand} ${beer.type}"
            class="beer-img"
            loading="lazy"
            />
            <div class="overlay">
              <p class="overlay-text">${beer.desc}</p>
            </div>
          </div>
        </div>
      `;
    });
  }

  // Update the beers displayed
  document.querySelector('.beer-container').innerHTML = beerHTML;
}

// Event listeners
window.addEventListener('load', displayBeers);
window.addEventListener('resize', toggleTextOnWindowResize);
window.addEventListener('scroll', closeNavigationOnScroll);
expandStory.addEventListener('click', expandStorySection);
expandPhoto.addEventListener('click', expandPhotoSection);
hamburgerIcon.addEventListener('click', openNavigation);
closeIcon.addEventListener('click', closeNavigation);
beverageNavTypes.addEventListener('click', filterBeveragesByTags);
