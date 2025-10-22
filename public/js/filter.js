// 

const listings = sampleListings.data;
const filters = document.querySelectorAll('#filters .filter');

filters.forEach(filter => {
  const category = filter.dataset.categories;
  const categoryListings = listings.filter(listing => listing.catagories.includes(category) );
});