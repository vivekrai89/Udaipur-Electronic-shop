import React from 'react'

type CategoryKey = 'ac' | 'tv' | 'fridge' | 'washingMachine'

type Product = {
  id: string
  name: string
  category: CategoryKey
  image: string
  shortSpecs: string
  brand: string
  capacity: string
  warranty: string
}

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'ac', label: 'Air Conditioners' },
  { key: 'tv', label: 'Televisions' },
  { key: 'fridge', label: 'Refrigerators' },
  { key: 'washingMachine', label: 'Washing Machines' },
]

const PRODUCTS: Product[] = [
  {
    id: 'ac-1',
    name: '1.5 Ton Inverter Split AC',
    category: 'ac',
    image: '/ac-1-inverter-split.png',
    shortSpecs: 'Inverter, 5 Star, Copper Condenser',
    brand: 'CoolBreeze',
    capacity: '1.5 Ton',
    warranty: '1 Year Comprehensive + 5 Years on Compressor',
  },
  {
    id: 'ac-2',
    name: '2 Ton Smart WiFi AC',
    category: 'ac',
    image: '/ac-2-smart-wifi.png',
    shortSpecs: 'Smart WiFi, 3 Star, Fast Cooling',
    brand: 'AirPro',
    capacity: '2 Ton',
    warranty: '1 Year Comprehensive + 10 Years on Compressor',
  },
  {
    id: 'tv-1',
    name: '55" 4K Ultra HD Smart TV',
    category: 'tv',
    image:
      'https://images.pexels.com/photos/8721315/pexels-photo-8721315.jpeg?auto=compress&cs=tinysrgb&w=900&q=80',
    shortSpecs: 'Ultra HD, Dolby Audio, Apps Built-in',
    brand: 'ViewMax',
    capacity: '55 inch',
    warranty: '1 Year Comprehensive',
  },
  {
    id: 'tv-2',
    name: '43" Full HD LED TV',
    category: 'tv',
    image:
      'https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&cs=tinysrgb&w=900&q=80',
    shortSpecs: 'Bezel-less Design, Powerful Speakers',
    brand: 'PixelOne',
    capacity: '43 inch',
    warranty: '1 Year Comprehensive',
  },
  {
    id: 'fridge-1',
    name: '340L Frost Free Double Door Fridge',
    category: 'fridge',
    image: '/fridge-340l-double-door.png',
    shortSpecs: 'Inverter Compressor, Toughened Glass Shelves',
    brand: 'FreshCool',
    capacity: '340 Litres',
    warranty: '1 Year Comprehensive + 10 Years on Compressor',
  },
  {
    id: 'fridge-2',
    name: '190L Direct Cool Single Door Fridge',
    category: 'fridge',
    image: '/fridge-190l-single-door.png',
    shortSpecs: 'Compact Design, Low Power Consumption',
    brand: 'CoolBox',
    capacity: '190 Litres',
    warranty: '1 Year Comprehensive + 5 Years on Compressor',
  },
  {
    id: 'wm-1',
    name: '7kg Front Load Washing Machine',
    category: 'washingMachine',
    image:
      'https://images.pexels.com/photos/5591460/pexels-photo-5591460.jpeg?auto=compress&cs=tinysrgb&w=900&q=80',
    shortSpecs: 'Inverter Motor, 1200 RPM, Quick Wash',
    brand: 'WashPro',
    capacity: '7 kg',
    warranty: '2 Years Comprehensive + 10 Years on Motor',
  },
  {
    id: 'wm-2',
    name: '6.5kg Top Load Washing Machine',
    category: 'washingMachine',
    image: '/wm-6_5kg-top-load.png',
    shortSpecs: 'Smart Fuzzy Logic, Soft Close Lid',
    brand: 'SpinMax',
    capacity: '6.5 kg',
    warranty: '2 Years Comprehensive + 5 Years on Motor',
  },
]

type View =
  | { type: 'home' }
  | { type: 'listing'; category?: CategoryKey }
  | { type: 'detail'; productId: string }

const WHATSAPP_NUMBER = '919828170518'
const CALL_NUMBER = 'tel:+919828170518'

function buildWhatsAppUrl(message: string) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

function EnquiryButtons({ product }: { product?: Product }) {
  const baseMessage = product
    ? `Hi, I would like to know more about "${product.name}" at E Home Electronics – Udaipur.`
    : 'Hi, I would like to know more about products at E Home Electronics – Udaipur.'

  return (
    <div className="enquiry-actions">
      <a
        href={buildWhatsAppUrl(baseMessage)}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary"
      >
        WhatsApp Enquiry
      </a>
      <a href={CALL_NUMBER} className="btn btn-ghost">
        Call Now
      </a>
    </div>
  )
}

function ProductCard({
  product,
  onViewDetails,
}: {
  product: Product
  onViewDetails: (product: Product) => void
}) {
  return (
    <article className="product-card glass">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <span className="product-tag">Top Pick</span>
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-specs">{product.shortSpecs}</p>
        <p className="product-price">Contact for Price</p>
        <div className="product-actions">
          <button className="btn btn-outline" onClick={() => onViewDetails(product)}>
            View Details
          </button>
          <a
            className="btn btn-primary"
            href={buildWhatsAppUrl(
              `Hi, I am interested in "${product.name}". Please share best price and offers.`,
            )}
            target="_blank"
            rel="noreferrer"
          >
            Enquire
          </a>
        </div>
      </div>
    </article>
  )
}

function CategorySection({
  category,
  products,
  onViewDetails,
}: {
  category: { key: CategoryKey; label: string }
  products: Product[]
  onViewDetails: (product: Product) => void
}) {
  if (!products.length) return null

  return (
    <section className="category-section">
      <div className="category-header">
        <h2>{category.label}</h2>
        <p>Curated bestsellers in {category.label}</p>
      </div>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onViewDetails={onViewDetails} />
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <h3>E Home Electronics – Udaipur</h3>
          <p className="footer-address">
            12, Pratap Nagar Rd, Sundarwas,
            <br />
            Khempura, Udaipur, Rajasthan 313001
          </p>
          <p className="footer-trust">Authorized dealer for leading brands</p>
        </div>
        <div className="footer-actions">
          <a href={CALL_NUMBER} className="btn btn-ghost">
            Call: 9828170518
          </a>
          <a
            href={buildWhatsAppUrl(
              'Hi, I found your website and would like to enquire about home appliances.',
            )}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
      <p className="footer-note">© {new Date().getFullYear()} E Home Electronics – Udaipur</p>
    </footer>
  )
}

function App() {
  const [view, setView] = React.useState<View>({ type: 'home' })

  const selectedProduct =
    view.type === 'detail' ? PRODUCTS.find((p) => p.id === view.productId) : undefined

  const navigateHome = () => setView({ type: 'home' })
  const navigateListing = (category?: CategoryKey) => setView({ type: 'listing', category })
  const navigateDetail = (product: Product) => setView({ type: 'detail', productId: product.id })

  return (
    <div className="app-shell">
      <div className="gradient-bg" />
      <header className="header glass">
        <div className="header-left" onClick={navigateHome}>
          <div className="logo-mark">E</div>
          <div className="logo-text">
            <span className="logo-title">E Home Electronics</span>
            <span className="logo-subtitle">Udaipur</span>
          </div>
        </div>
        <nav className="nav">
          <button
            className={`nav-link ${view.type === 'home' ? 'active' : ''}`}
            onClick={navigateHome}
          >
            Home
          </button>
          <button
            className={`nav-link ${view.type === 'listing' ? 'active' : ''}`}
            onClick={() => navigateListing(undefined)}
          >
            All Products
          </button>
        </nav>
        <div className="header-cta">
          <a href={CALL_NUMBER} className="header-phone">
            9828170518
          </a>
          <a
            href={buildWhatsAppUrl(
              'Hi, I would like to know about latest offers on AC, TV, Fridge and Washing Machines.',
            )}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main className="main">
        {view.type === 'home' && (
          <>
            <section className="hero glass">
              <div className="hero-text">
                <h1>Premium Electronics for Modern Udaipur Homes</h1>
                <p>
                  Split ACs, 4K TVs, Refrigerators and Washing Machines from leading brands. Get
                  expert guidance and best deals at E Home Electronics – Udaipur.
                </p>
                <div className="hero-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigateListing(undefined)}
                  >
                    Browse All Products
                  </button>
                  <a
                    href={buildWhatsAppUrl(
                      'Hi, I want recommendations for AC / TV / Fridge / Washing Machine for my home.',
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                  >
                    Get WhatsApp Consultation
                  </a>
                </div>
                <div className="hero-highlights">
                  <span>On-site installation support</span>
                  <span>Genuine products & warranty</span>
                  <span>Personalised recommendations</span>
                </div>
              </div>
              <div className="hero-badge glass">
                <img
                  src="/electronics-store.png"
                  alt="Interior view of E Home Electronics store in Udaipur"
                  className="hero-store-image"
                />
                <p>Udaipur&apos;s trusted neighbourhood electronics store</p>
              </div>
            </section>

            <section className="category-strip">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  className="category-pill"
                  onClick={() => navigateListing(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </section>

            {CATEGORIES.map((cat) => (
              <CategorySection
                key={cat.key}
                category={cat}
                products={PRODUCTS.filter((p) => p.category === cat.key).slice(0, 2)}
                onViewDetails={navigateDetail}
              />
            ))}
          </>
        )}

        {view.type === 'listing' && (
          <section className="listing">
            <header className="listing-header">
              <div>
                <h1>
                  {view.category
                    ? CATEGORIES.find((c) => c.key === view.category)?.label
                    : 'All Electronics'}
                </h1>
                <p>
                  Browse our curated collection of ACs, TVs, refrigerators and washing machines.
                  Reach out to us for latest prices and offers.
                </p>
              </div>
              <div className="listing-filters">
                <select
                  value={view.category ?? ''}
                  onChange={(e) =>
                    navigateListing(
                      e.target.value ? (e.target.value as CategoryKey) : undefined,
                    )
                  }
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </header>
            <div className="product-grid">
              {PRODUCTS.filter((p) =>
                view.category ? p.category === view.category : true,
              ).map((p) => (
                <ProductCard key={p.id} product={p} onViewDetails={navigateDetail} />
              ))}
            </div>
          </section>
        )}

        {view.type === 'detail' && selectedProduct && (
          <section className="detail">
            <button className="back-link" onClick={navigateListing}>
              ← Back to products
            </button>
            <div className="detail-layout glass">
              <div className="detail-gallery">
                <div className="detail-main-image-wrapper">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="detail-main-image"
                  />
                </div>
                <div className="detail-thumbs">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="detail-thumb glass">
                      <img
                        src={selectedProduct.image}
                        alt={`${selectedProduct.name} view ${idx}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="detail-info">
                <h1>{selectedProduct.name}</h1>
                <p className="detail-brand">{selectedProduct.brand}</p>
                <p className="detail-price">Contact for Price</p>

                <div className="detail-specs">
                  <div>
                    <span className="spec-label">Capacity</span>
                    <span className="spec-value">{selectedProduct.capacity}</span>
                  </div>
                  <div>
                    <span className="spec-label">Warranty</span>
                    <span className="spec-value">{selectedProduct.warranty}</span>
                  </div>
                  <div>
                    <span className="spec-label">Store</span>
                    <span className="spec-value">E Home Electronics – Udaipur</span>
                  </div>
                </div>

                <p className="detail-description">
                  This is a sample description for the product. Actual specifications, energy
                  ratings and features can be customised as per your live catalogue. Use this
                  section to highlight key benefits, ideal room size and unique selling points.
                </p>

                <EnquiryButtons product={selectedProduct} />

                <div className="detail-meta">
                  <span>Genuine product with brand warranty</span>
                  <span>On-site installation support in Udaipur</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App

