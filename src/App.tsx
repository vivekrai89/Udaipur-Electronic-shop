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
    image: 'https://images.pexels.com/photos/8721315/pexels-photo-8721315.jpeg?auto=compress&cs=tinysrgb&w=900&q=80',
    shortSpecs: 'Ultra HD, Dolby Audio, Apps Built-in',
    brand: 'ViewMax',
    capacity: '55 inch',
    warranty: '1 Year Comprehensive',
  },
  {
    id: 'tv-2',
    name: '43" Full HD LED TV',
    category: 'tv',
    image: 'https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&cs=tinysrgb&w=900&q=80',
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
    image: 'https://images.pexels.com/photos/5591460/pexels-photo-5591460.jpeg?auto=compress&cs=tinysrgb&w=900&q=80',
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
  | { type: 'services' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'terms' }
  | { type: 'privacy' }

const WHATSAPP_NUMBER = '919828170518'
const CALL_NUMBER = 'tel:+919828170518'
const WHATSAPP_CHAT = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I would like to know more about products at E Home Electronics – Udaipur.')}`

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ── ENQUIRY BUTTONS ──
function EnquiryButtons({ product }: { product?: Product }) {
  const baseMessage = product
    ? `Hi, I would like to know more about "${product.name}" at E Home Electronics – Udaipur.`
    : 'Hi, I would like to know more about products at E Home Electronics – Udaipur.'
  return (
    <div className="enquiry-actions">
      <a href={buildWhatsAppUrl(baseMessage)} target="_blank" rel="noreferrer" className="btn btn-primary">
        WhatsApp Enquiry
      </a>
      <a href={CALL_NUMBER} className="btn btn-ghost">Call Now</a>
    </div>
  )
}

// ── PRODUCT CARD ──
function ProductCard({ product, onViewDetails }: { product: Product; onViewDetails: (p: Product) => void }) {
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
          <button className="btn btn-outline" onClick={() => onViewDetails(product)}>View Details</button>
          <a
            className="btn btn-primary"
            href={buildWhatsAppUrl(`Hi, I am interested in "${product.name}". Please share best price and offers.`)}
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

// ── CATEGORY SECTION ──
function CategorySection({ category, products, onViewDetails }: {
  category: { key: CategoryKey; label: string }
  products: Product[]
  onViewDetails: (p: Product) => void
}) {
  if (!products.length) return null
  return (
    <section className="category-section">
      <div className="category-header">
        <h2>{category.label}</h2>
        <p>Curated bestsellers in {category.label}</p>
      </div>
      <div className="product-grid">
        {products.map((p) => <ProductCard key={p.id} product={p} onViewDetails={onViewDetails} />)}
      </div>
    </section>
  )
}

// ── NAVBAR ──
function Navbar({ view, setView }: { view: View; setView: (v: View) => void }) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  const navigate = (v: View) => {
    setView(v)
    scrollTop()
    setMenuOpen(false)
  }

  const navItems = [
    { label: 'Home', action: () => navigate({ type: 'home' }), active: view.type === 'home' },
    { label: 'Services', action: () => navigate({ type: 'services' }), active: view.type === 'services' },
    { label: 'Products', action: () => navigate({ type: 'listing' }), active: view.type === 'listing' || view.type === 'detail' },
    { label: 'About Shop', action: () => navigate({ type: 'about' }), active: view.type === 'about' },
    { label: 'Contact', action: () => navigate({ type: 'contact' }), active: view.type === 'contact' },
  ]

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo" onClick={() => navigate({ type: 'home' })}>
          <div className="logo-mark">E</div>
          <div className="logo-text">
            <span className="logo-title">E Home Electronics</span>
            <span className="logo-subtitle">Udaipur</span>
          </div>
        </div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <button key={item.label} className={`nav-link ${item.active ? 'active' : ''}`} onClick={item.action}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="navbar-cta">
          <a href={CALL_NUMBER} className="header-phone">📞 9828170518</a>
          <a href={WHATSAPP_CHAT} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">WhatsApp</a>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <button key={item.label} className={`mobile-nav-link ${item.active ? 'active' : ''}`} onClick={item.action}>
              {item.label}
            </button>
          ))}
          <a href={CALL_NUMBER} className="mobile-nav-link">📞 Call: 9828170518</a>
          <a href={WHATSAPP_CHAT} target="_blank" rel="noreferrer" className="mobile-nav-link whatsapp">💬 WhatsApp Us</a>
        </div>
      )}
    </header>
  )
}

// ── FOOTER ──
function Footer({ setView }: { setView: (v: View) => void }) {
  const navigate = (v: View) => {
    setView(v)
    scrollTop()
  }

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-logo">
            <div className="logo-mark">E</div>
            <span className="footer-brand">E Home Electronics</span>
          </div>
          <p className="footer-address">
            12, Pratap Nagar Rd, Sundarwas,<br />
            Khempura, Udaipur,<br />
            Rajasthan – 313001
          </p>
          <p className="footer-phone">📞 +91 9828170518</p>
          <p className="footer-trust">Authorized dealer for leading brands</p>
        </div>

        <div className="footer-col footer-center-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><button onClick={() => navigate({ type: 'listing' })}>Products</button></li>
            <li><button onClick={() => navigate({ type: 'services' })}>Services</button></li>
            <li><button onClick={() => navigate({ type: 'about' })}>About Shop</button></li>
            <li><button onClick={() => navigate({ type: 'contact' })}>Contact Us</button></li>
            <li><button onClick={() => navigate({ type: 'terms' })}>Terms & Conditions</button></li>
            <li><button onClick={() => navigate({ type: 'privacy' })}>Privacy Policy</button></li>
          </ul>
        </div>

        <div className="footer-col footer-right-col">
          <h4 className="footer-heading">Connect With Us</h4>
          <div className="social-links">
            <a href={WHATSAPP_CHAT} target="_blank" rel="noreferrer" className="social-btn whatsapp-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.533 5.854L.057 23.571a.75.75 0 00.922.898l5.9-1.545A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.219-1.438l-.374-.222-3.875 1.016 1.034-3.772-.243-.389A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
          <p className="footer-hours">
            <strong>Store Hours:</strong><br />
            Mon – Sat: 10:00 AM – 8:00 PM<br />
            Sunday: 11:00 AM – 6:00 PM
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© {new Date().getFullYear()} E Home Electronics – Udaipur. All rights reserved.</p>
        <p className="footer-crafted">Crafted with ❤️ by <a href="#" target="_blank" rel="noreferrer">ParshWebCraft</a></p>
      </div>
    </footer>
  )
}

// ── SERVICES PAGE ──
function ServicesPage() {
  const services = [
    { icon: '❄️', title: 'AC Installation & Service', desc: 'Professional installation, gas refill, and servicing for all AC brands.' },
    { icon: '🔧', title: 'Appliance Repair', desc: 'Expert repair for TVs, refrigerators, washing machines and more.' },
    { icon: '🏠', title: 'Home Delivery', desc: 'Fast and safe delivery of all appliances to your doorstep in Udaipur.' },
    { icon: '📋', title: 'AMC Plans', desc: 'Annual Maintenance Contracts for hassle-free appliance upkeep.' },
    { icon: '🛠️', title: 'Demo & Setup', desc: 'On-site product demo and complete setup after purchase.' },
    { icon: '📞', title: 'After Sales Support', desc: '24/7 support for warranty claims and service requests.' },
  ]
  return (
    <section className="simple-page">
      <h1>Our Services</h1>
      <p className="page-sub">We offer complete home appliance solutions in Udaipur.</p>
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.title} className="service-card glass">
            <span className="service-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── ABOUT PAGE ──
function AboutPage() {
  return (
    <section className="simple-page">
      <h1>About E Home Electronics</h1>
      <p className="page-sub">Udaipur's trusted neighbourhood electronics store.</p>
      <div className="about-card glass">
        <p>E Home Electronics has been serving the people of Udaipur for years, offering a wide range of premium home appliances including Air Conditioners, Televisions, Refrigerators, and Washing Machines.</p>
        <p>We are an authorized dealer for leading brands and take pride in providing genuine products, expert guidance, and reliable after-sales service to every customer.</p>
        <p>Our team of trained professionals ensures that you get the best product for your needs and budget, along with hassle-free installation and support.</p>
        <div className="about-stats">
          <div><strong>500+</strong><span>Happy Customers</span></div>
          <div><strong>10+</strong><span>Years Experience</span></div>
          <div><strong>4</strong><span>Product Categories</span></div>
          <div><strong>24/7</strong><span>Support</span></div>
        </div>
      </div>
    </section>
  )
}

// ── CONTACT PAGE ──
function ContactPage() {
  return (
    <section className="simple-page">
      <h1>Contact Us</h1>
      <p className="page-sub">We'd love to hear from you. Reach out anytime!</p>
      <div className="contact-grid">
        <div className="contact-card glass">
          <span>📍</span>
          <h3>Visit Us</h3>
          <p>12, Pratap Nagar Rd, Sundarwas, Khempura, Udaipur, Rajasthan 313001</p>
        </div>
        <div className="contact-card glass">
          <span>📞</span>
          <h3>Call Us</h3>
          <p><a href={CALL_NUMBER}>+91 9828170518</a></p>
        </div>
        <div className="contact-card glass">
          <span>💬</span>
          <h3>WhatsApp</h3>
          <p><a href={WHATSAPP_CHAT} target="_blank" rel="noreferrer">Chat with us on WhatsApp</a></p>
        </div>
        <div className="contact-card glass">
          <span>🕐</span>
          <h3>Store Hours</h3>
          <p>Mon – Sat: 10 AM – 8 PM<br />Sunday: 11 AM – 6 PM</p>
        </div>
      </div>
    </section>
  )
}

// ── TERMS PAGE ──
function TermsPage() {
  return (
    <section className="simple-page policy-page">
      <h1>Terms & Conditions</h1>
      <div className="policy-card glass">
        <h3>1. General</h3>
        <p>By visiting or purchasing from E Home Electronics, you agree to these terms and conditions. Please read them carefully.</p>
        <h3>2. Products</h3>
        <p>All products sold are genuine and come with manufacturer warranty. Prices are subject to change without prior notice.</p>
        <h3>3. Warranty</h3>
        <p>Warranty terms are as per the manufacturer's policy. Our store assists with warranty claims but is not directly responsible for manufacturer decisions.</p>
        <h3>4. Payments</h3>
        <p>We accept cash, UPI, and card payments. EMI options are available on select products.</p>
        <h3>5. Returns</h3>
        <p>Returns are accepted within 7 days of purchase for manufacturing defects only. Products must be in original packaging.</p>
        <h3>6. Contact</h3>
        <p>For any queries, contact us at +91 9828170518 or visit our store.</p>
      </div>
    </section>
  )
}

// ── PRIVACY PAGE ──
function PrivacyPage() {
  return (
    <section className="simple-page policy-page">
      <h1>Privacy Policy</h1>
      <div className="policy-card glass">
        <h3>1. Information We Collect</h3>
        <p>We collect basic contact information (name, phone number) when you make an enquiry or purchase.</p>
        <h3>2. How We Use It</h3>
        <p>Your information is used solely for order processing, delivery coordination, and after-sales support.</p>
        <h3>3. Data Sharing</h3>
        <p>We do not sell or share your personal information with third parties for marketing purposes.</p>
        <h3>4. WhatsApp Communication</h3>
        <p>When you contact us via WhatsApp, your number is used only for communication related to your enquiry.</p>
        <h3>5. Security</h3>
        <p>We take reasonable steps to protect your personal data from unauthorized access or disclosure.</p>
        <h3>6. Contact</h3>
        <p>For privacy concerns, reach us at +91 9828170518.</p>
      </div>
    </section>
  )
}

// ── FLOATING WHATSAPP ──
function WhatsAppFloat() {
  return (
    <a href={WHATSAPP_CHAT} target="_blank" rel="noreferrer" className="whatsapp-float" title="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.533 5.854L.057 23.571a.75.75 0 00.922.898l5.9-1.545A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.219-1.438l-.374-.222-3.875 1.016 1.034-3.772-.243-.389A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    </a>
  )
}

// ── SCROLL TO TOP BUTTON ──
function ScrollToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      className="scroll-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to top"
    >
      ↑
    </button>
  )
}

// ── APP ──
function App() {
  const [view, setView] = React.useState<View>({ type: 'home' })

  // Scroll to top on every view change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  const selectedProduct =
    view.type === 'detail' ? PRODUCTS.find((p) => p.id === view.productId) : undefined

  const navigateListing = (category?: CategoryKey) => setView({ type: 'listing', category })
  const navigateDetail = (product: Product) => setView({ type: 'detail', productId: product.id })

  return (
    <div className="app-shell">
      <div className="gradient-bg" />

      <Navbar view={view} setView={setView} />

      <main className="main">

        {/* HOME */}
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
                  <button className="btn btn-primary" onClick={() => navigateListing(undefined)}>
                    Browse All Products
                  </button>
                  <a
                    href={buildWhatsAppUrl('Hi, I want recommendations for AC / TV / Fridge / Washing Machine for my home.')}
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
                <img src="/electronics-store.png" alt="E Home Electronics store" className="hero-store-image" />
                <p>Udaipur&apos;s trusted neighbourhood electronics store</p>
              </div>
            </section>

            <section className="category-strip">
              {CATEGORIES.map((cat) => (
                <button key={cat.key} className="category-pill" onClick={() => navigateListing(cat.key)}>
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

        {/* SERVICES */}
        {view.type === 'services' && <ServicesPage />}

        {/* LISTING */}
        {view.type === 'listing' && (
          <section className="listing">
            <header className="listing-header">
              <div>
                <h1>
                  {view.category
                    ? CATEGORIES.find((c) => c.key === view.category)?.label
                    : 'All Electronics'}
                </h1>
                <p>Browse our curated collection. Reach out for latest prices and offers.</p>
              </div>
              <div className="listing-filters">
                <select
                  value={view.category ?? ''}
                  onChange={(e) => navigateListing(e.target.value ? (e.target.value as CategoryKey) : undefined)}
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </header>
            <div className="product-grid">
              {PRODUCTS.filter((p) => view.category ? p.category === view.category : true).map((p) => (
                <ProductCard key={p.id} product={p} onViewDetails={navigateDetail} />
              ))}
            </div>
          </section>
        )}

        {/* DETAIL */}
        {view.type === 'detail' && selectedProduct && (
          <section className="detail">
            <button className="back-link" onClick={() => navigateListing()}>← Back to products</button>
            <div className="detail-layout glass">
              <div className="detail-gallery">
                <div className="detail-main-image-wrapper">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="detail-main-image" />
                </div>
                <div className="detail-thumbs">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="detail-thumb glass">
                      <img src={selectedProduct.image} alt={`${selectedProduct.name} view ${idx}`} />
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
                  Actual specifications, energy ratings and features can be customised as per your live catalogue.
                  Use this section to highlight key benefits, ideal room size and unique selling points.
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

        {/* ABOUT */}
        {view.type === 'about' && <AboutPage />}

        {/* CONTACT */}
        {view.type === 'contact' && <ContactPage />}

        {/* TERMS */}
        {view.type === 'terms' && <TermsPage />}

        {/* PRIVACY */}
        {view.type === 'privacy' && <PrivacyPage />}

      </main>

      <Footer setView={setView} />

      {/* Floating buttons */}
      <WhatsAppFloat />
      <ScrollToTop />
    </div>
  )
}

export default App