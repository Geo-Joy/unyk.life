# 💖 Unyk.life - Unique Lifestyle Products

A fast-loading, mobile-responsive product showcase website with infinite scroll, built for optimal performance and user experience.

## ✨ Features

- **🚀 Lightning Fast**: Built with Vite for optimal performance
- **📱 Mobile First**: Fully responsive design that works on all devices
- **♾️ Infinite Scroll**: Smooth loading of products as users scroll
- **🖼️ Lazy Loading**: Images load only when needed for better performance
- **🎨 Modern Design**: Beautiful gradient backgrounds and smooth animations
- **🔗 Affiliate Ready**: Easy integration with affiliate links
- **📊 SEO Optimized**: Proper meta tags and semantic HTML
- **⚡ PWA Ready**: Service worker for caching and offline support

## 🛠️ Tech Stack

- **Vanilla JavaScript** - For optimal performance and small bundle size
- **CSS Grid** - For responsive layouts
- **Intersection Observer API** - For infinite scroll and lazy loading
- **Vite** - For fast development and optimized builds
- **Vercel** - For hosting and deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd unyk.life
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── main.js             # Main JavaScript file with infinite scroll logic
├── style.css           # Responsive CSS styles
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel deployment configuration
└── public/
    └── sw.js           # Service worker for caching
```

## 📦 Easy Product Management

### Simple 2-Step Process to Add Products:

**Step 1:** Add your product image to `public/images/`
- Supported formats: `.jpg`, `.png`, `.webp`
- Recommended size: 400x300px or similar ratio
- Example: `public/images/wireless-earbuds.jpg`

**Step 2:** Add product entry to `public/products.json`
```json
{
  "id": "wellness-journal",
  "number": 4,
  "title": "Mindfulness Journal", 
  "description": "A beautifully designed journal to help you practice gratitude and mindfulness daily.",
  "image": "wellness-journal.jpg",
  "affiliateLink": "https://amzn.to/your-link",
  "category": "Wellness"
}
```

**That's it!** Your product automatically appears on the website with:
- ✅ Automatic image optimization
- ✅ Fallback placeholder if image fails
- ✅ Click tracking for analytics
- ✅ Mobile-responsive design

## 🎯 Customization

### Adding Your Products

Edit the `sampleProducts` array in `main.js`:

```javascript
const sampleProducts = [
  {
    id: 1,
    title: "Your Product Title",
    description: "Product description...",
    price: "$99.99",
    image: "https://your-image-url.com/image.jpg",
    affiliateLink: "https://your-affiliate-link.com"
  },
  // Add more products...
];
```

### Styling Customization

The CSS uses CSS custom properties for easy theming. Key variables in `style.css`:

- Colors: Update the gradient colors in the `:root` selector
- Typography: Font family is set to Inter from Google Fonts
- Layout: Grid template columns can be adjusted for different layouts

### Performance Optimization

- Images are lazy-loaded using Intersection Observer
- Products load in batches for better performance
- CSS animations use `transform` and `opacity` for smooth animations
- Service worker caches static assets

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect the Vite framework and deploy

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Environment Variables

No environment variables are required for the basic setup. For analytics or advanced features, you might want to add:

- `VITE_ANALYTICS_ID` - For Google Analytics
- `VITE_API_URL` - If you're fetching products from an API

## 📊 Performance Features

- **Lazy Loading**: Images load only when visible
- **Infinite Scroll**: Products load progressively
- **Optimized Images**: Uses Unsplash with proper sizing
- **Service Worker**: Caches static assets
- **CSS Animations**: GPU-accelerated animations
- **Bundle Optimization**: Vite's rollup optimizations

## 🔧 Advanced Configuration

### Custom Product Loading

To fetch products from an API, replace the sample data in `main.js`:

```javascript
async loadProducts() {
  const response = await fetch(`/api/products?page=${this.currentPage}`);
  const products = await response.json();
  this.renderProducts(products);
}
```

### Analytics Integration

Add tracking to product clicks:

```javascript
card.addEventListener('click', (e) => {
  // Add your analytics tracking here
  gtag('event', 'click', {
    event_category: 'affiliate',
    event_label: product.title
  });
  window.open(product.affiliateLink, '_blank');
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

Built with ❤️ for affiliate marketers who value performance and user experience.
