// Global bindings
const expandStory = document.querySelector('.expand-story-icon');
const heroContent = document.querySelector('.hero-content');
const expandPhoto = document.querySelector('.expand-photo-icon');
const heroContentDescH2 = document.querySelector('.hero-content--desc h2');
const heroContentDescP = document.querySelector('.hero-content--desc p');
const heroContentDescBtn = document.querySelector('.hero-content--desc button');

/**
 * Hero column toggle functions
 */
function expandStorySection() {
  heroContent.style.gridTemplateColumns = '3fr 1fr';
  setTimeout(() => {
    heroContentDescH2.style.display = 'block';
    heroContentDescP.style.display = 'block';
    heroContentDescBtn.style.display = 'block';
  }, 200);
}
function expandPhotoSection() {
  heroContent.style.gridTemplateColumns = '1fr 3fr';
  if (window.innerWidth < 768) {
    heroContentDescH2.style.display = 'none';
    heroContentDescP.style.display = 'none';
    heroContentDescBtn.style.display = 'none';
  }
}
function toggleTextOnWindowResize() {
  if (window.innerWidth < 768) {
    heroContent.style.gridTemplateColumns = '1fr 3fr';
    heroContentDescH2.style.display = 'none';
    heroContentDescP.style.display = 'none';
    heroContentDescBtn.style.display = 'none';
  } else {
    heroContentDescH2.style.display = 'block';
    heroContentDescP.style.display = 'block';
    heroContentDescBtn.style.display = 'block';
  }
}

// Event listeners
expandStory.addEventListener('click', expandStorySection);
expandPhoto.addEventListener('click', expandPhotoSection);
window.addEventListener('resize', toggleTextOnWindowResize);
