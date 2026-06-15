const gallery = document.querySelector('#gallery');
const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightboxImg');
const lightboxCaption = document.querySelector('#lightboxCaption');
const lightboxCategory = document.querySelector('#lightboxCategory');
const closeBtn = document.querySelector('#closeBtn');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

const items = Array.from(document.querySelectorAll('.gallery-item'));
let activeIndex = 0;

function getVisibleItems() {
  return items.filter(item => item.style.display !== 'none');
}

function openLightbox(item) {
  const image = item.querySelector('img');
  const title = item.querySelector('h3').textContent;
  const category = item.dataset.category;

  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightboxCaption.textContent = title;
  lightboxCategory.textContent = category;
  lightbox.classList.add('open');

  activeIndex = getVisibleItems().indexOf(item);
}

function closeLightbox() {
  lightbox.classList.remove('open');
}

function showPrevious() {
  const visible = getVisibleItems();
  if (!visible.length) return;
  activeIndex = (activeIndex - 1 + visible.length) % visible.length;
  openLightbox(visible[activeIndex]);
}

function showNext() {
  const visible = getVisibleItems();
  if (!visible.length) return;
  activeIndex = (activeIndex + 1) % visible.length;
  openLightbox(visible[activeIndex]);
}

function filterGallery(category) {
  items.forEach(item => {
    const matches = category === 'all' || item.dataset.category === category;
    item.style.display = matches ? 'grid' : 'none';
  });
}

gallery.addEventListener('click', event => {
  const item = event.target.closest('.gallery-item');
  if (!item) return;
  openLightbox(item);
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrevious);
nextBtn.addEventListener('click', showNext);

lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showPrevious();
  if (event.key === 'ArrowRight') showNext();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');
    filterGallery(btn.dataset.category);
  });
});

// Apply an elegant filter tint without changing the layout
const filterEffects = ['none', 'sepia(0.08)', 'contrast(1.05)', 'saturate(1.08)', 'brightness(1.05)', 'hue-rotate(6deg)'];
items.forEach((item, index) => {
  item.querySelector('img').style.filter = filterEffects[index % filterEffects.length];
});
