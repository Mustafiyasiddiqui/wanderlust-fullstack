// document.querySelectorAll('.drag').forEach(el => {
//   el.onmousedown = e => {
//     let shiftX = e.clientX - el.getBoundingClientRect().left;

//     function move(e) {
//       let newLeft = e.clientX - shiftX - el.parentElement.getBoundingClientRect().left;
//       newLeft = Math.max(0, Math.min(newLeft, el.parentElement.offsetWidth - el.offsetWidth));
//       el.style.left = newLeft + 'px';
//     }

//     document.addEventListener('mousemove', move);
//     document.onmouseup = () => document.removeEventListener('mousemove', move);
//   };

//   el.ondragstart = () => false;
// });

const listings = sampleListings.data;
const filters = document.querySelectorAll('#filters .filter');

filters.forEach(filter => {
  const category = filter.dataset.categories;
  const categoryListings = listings.filter(listing => listing.catagories.includes(category) );
});