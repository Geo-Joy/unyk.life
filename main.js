import './style.css'

// Global variables
let allProducts = [];

// Load products from JSON file
async function loadProducts() {
  try {
    // Add cache-busting parameter to ensure fresh data
    const timestamp = new Date().getTime();
    const response = await fetch(`/products.json?v=${timestamp}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to load products');
    }
    const data = await response.json();
    
    // Process products and sort in descending order (newest first)
    allProducts = data.products
      .sort((a, b) => b.number - a.number)
      .map(product => ({
        ...product,
        image: `/images/${product.image}`,
        // Add fallback image if local image fails to load
        fallbackImage: `https://via.placeholder.com/400x300/667eea/white?text=${encodeURIComponent(product.title)}`
      }));
    
    return allProducts;
  } catch (error) {
    console.error('Error loading products:', error);
    // Return empty array if products.json fails to load
    return [];
  }
}

class ProductShowcase {
  constructor() {
    this.productsPerPage = 12;
    this.currentPage = 0;
    this.loading = false;
    this.hasMoreProducts = true;
    this.productsGrid = document.getElementById('products-grid');
    this.loadingElement = document.getElementById('loading');
    this.endMessage = document.getElementById('end-message');
    
    this.init();
  }

  async init() {
    // Load products from JSON file first
    await loadProducts();
    
    if (allProducts.length === 0) {
      this.showNoProductsMessage();
      return;
    }
    
    this.loadInitialProducts();
    this.setupInfiniteScroll();
    this.setupImageLazyLoading();
  }

  showNoProductsMessage() {
    this.productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: white;">
        <h2>📦 No Products Found</h2>
        <p style="margin-top: 1rem; opacity: 0.8;">
          Add your products to <code>public/products.json</code> and images to <code>public/images/</code>
        </p>
      </div>
    `;
  }

  loadInitialProducts() {
    this.loadProducts();
  }

  loadProducts() {
    if (this.loading || !this.hasMoreProducts) return;

    this.loading = true;
    this.showLoading();

    // Simulate API delay for realistic experience
    setTimeout(() => {
      const startIndex = this.currentPage * this.productsPerPage;
      const endIndex = startIndex + this.productsPerPage;
      const productsToLoad = allProducts.slice(startIndex, endIndex);

      if (productsToLoad.length === 0) {
        this.hasMoreProducts = false;
        this.hideLoading();
        this.showEndMessage();
        return;
      }

      this.renderProducts(productsToLoad);
      this.currentPage++;
      this.loading = false;
      this.hideLoading();

      // Check if we've loaded all products
      if (endIndex >= allProducts.length) {
        this.hasMoreProducts = false;
        this.showEndMessage();
      }
    }, 800); // Realistic loading delay
  }

  renderProducts(products) {
    const fragment = document.createDocumentFragment();
    
    products.forEach((product, index) => {
      const productCard = this.createProductCard(product);
      // Stagger animations for better visual effect
      setTimeout(() => {
        productCard.style.animationDelay = `${index * 100}ms`;
        fragment.appendChild(productCard);
      }, 0);
    });

    // Add all cards at once for better performance
    setTimeout(() => {
      this.productsGrid.appendChild(fragment);
    }, 100);
  }

  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Use the number from the product data, or fallback to a default if not provided
    const displayNumber = product.number || '?';
    
    card.innerHTML = `
      <div class="product-number">${displayNumber}</div>
      <img 
        class="product-image" 
        data-src="${product.image}" 
        data-fallback="${product.fallbackImage}"
        alt="${product.title}"
        loading="lazy"
        onerror="this.src=this.dataset.fallback; this.onerror=null;"
      />
      <div class="product-content">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        <button class="product-cta">Shop Now ✨</button>
      </div>
    `;

    // Add click handler for affiliate link
    card.addEventListener('click', (e) => {
      e.preventDefault();
      // Add click tracking/analytics here if needed
      this.trackClick(product);
      window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
    });

    return card;
  }

  trackClick(product) {
    // Optional: Add analytics tracking here
    console.log(`Product clicked: ${product.title} (${product.number})`);
    
    // Example: Send to Google Analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'affiliate_link',
        event_label: product.title,
        value: product.number
      });
    }
  }

  setupInfiniteScroll() {
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.loading && this.hasMoreProducts) {
          this.loadProducts();
        }
      });
    }, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    });

    // Create a sentinel element to observe
    const sentinel = document.createElement('div');
    sentinel.id = 'scroll-sentinel';
    sentinel.style.height = '1px';
    document.querySelector('.main .container').appendChild(sentinel);
    
    observer.observe(sentinel);
  }

  setupImageLazyLoading() {
    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    // Observe images as they're added
    const observeImages = () => {
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    };

    // Initial observation
    observeImages();

    // Re-observe when new products are added
    const productObserver = new MutationObserver(() => {
      observeImages();
    });

    productObserver.observe(this.productsGrid, {
      childList: true,
      subtree: true
    });
  }

  showLoading() {
    this.loadingElement.classList.remove('hidden');
  }

  hideLoading() {
    this.loadingElement.classList.add('hidden');
  }

  showEndMessage() {
    this.endMessage.classList.remove('hidden');
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProductShowcase();
});

// Service worker disabled for no-cache approach
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(() => console.log('Service Worker registered'))
//       .catch(() => console.log('Service Worker registration failed'));
//   });
// }
