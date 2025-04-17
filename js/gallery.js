document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Fetch gallery items
    fetch('data/gallery.json')
        .then(response => response.json())
        .then(items => {
            items.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = `gallery-item ${item.category}`;
                galleryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="gallery-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.date}</p>
                    </div>
                `;
                galleryGrid.appendChild(galleryItem);
            });
            
            // Initialize filter functionality
            initGalleryFilters();
        })
        .catch(error => console.error('Error loading gallery:', error));
});

function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}