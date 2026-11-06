import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import {
  Coffee,
  ShoppingBag,
  Menu,
  X,
  Plus,
  Minus,
  Search,
  ArrowUpRight,
  Star,
  Camera,
  Globe,
  MessageCircle,
  Heart,
  Trash2,
  CheckCircle,
  ArrowRight,
  Eye
} from 'lucide-react'

 

const products = [
  {
    id: 1,
    name: 'Caramel Macchiato',
    category: 'Hot Coffee',
    price: 650,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700',
    description: 'Rich espresso with smooth caramel and creamy milk.'
  },
  {
    id: 2,
    name: 'Iced Latte',
    category: 'Cold Coffee',
    price: 550,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=700',
    description: 'Chilled espresso blended with refreshing fresh milk.'
  },
  {
    id: 3,
    name: 'Cappuccino',
    category: 'Hot Coffee',
    price: 600,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=700',
    description: 'A perfect balance of espresso, milk and foam.'
  },
  {
    id: 4,
    name: 'Mocha Delight',
    category: 'Hot Coffee',
    price: 700,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=700',
    description: 'Delicious espresso combined with rich chocolate.'
  },
  {
    id: 5,
    name: 'Cold Brew',
    category: 'Cold Coffee',
    price: 580,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=700',
    description: 'Slow brewed coffee with a smooth refreshing taste.'
  },
  {
    id: 6,
    name: 'Vanilla Latte',
    category: 'Specials',
    price: 680,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=700',
    description: 'Creamy latte with a touch of sweet vanilla.'
  }
]

const reviews = [
  {
    name: 'Sarah Ahmed',
    role: 'Coffee Lover',
    text: 'Absolutely beautiful coffee! The atmosphere and taste are both amazing. My new favorite coffee place.',
    rating: 5
  },
  {
    name: 'Ali Hassan',
    role: 'Regular Customer',
    text: 'The caramel macchiato is incredible. Great presentation, friendly service and wonderful experience.',
    rating: 5
  },
  {
    name: 'Ayesha Khan',
    role: 'Coffee Enthusiast',
    text: 'Every cup feels special. I love the cozy vibe and the quality of their freshly brewed coffee.',
    rating: 5
  }
]

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [reviewIndex, setReviewIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const addToCart = (product) => {
    setCart(current => {
      const found = current.find(item => item.id === product.id)
      if (found) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const changeQuantity = (id, amount) => {
    setCart(current =>
      current
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCart(current => current.filter(item => item.id !== id))
  }

  const toggleWishlist = (product) => {
    setWishlist(current => {
      const alreadySaved = current.some(item => item.id === product.id)
      return alreadySaved
        ? current.filter(item => item.id !== product.id)
        : [...current, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlist(current => current.filter(item => item.id !== id))
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      category === 'All' || product.category === category
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return
    setSubscribed(true)
    setEmail('')
  }

  const currentReview = reviews[reviewIndex]

  return (
    <div className="min-h-screen bg-[#17100d] text-[#f8eee3]">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#17100d]/90 backdrop-blur-xl border-b border-white/10">
        <div className="container-custom h-[82px] flex items-center justify-between">

          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full coffee-gradient flex items-center justify-center text-[#21140d]">
              <Coffee size={23} />
            </div>
            <span className="playfair text-2xl font-bold">
              Brew<span className="text-[#d5a36f]">Bliss.</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-9 text-sm text-[#d8c7b7]">
            {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="hover:text-[#d5a36f] transition"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Open wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d5a36f] text-[#17100d] text-xs flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Open shopping cart"
            >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d5a36f] text-[#17100d] text-xs flex items-center justify-center font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>

            <button
              onClick={() => scrollTo('menu')}
              className="hidden sm:block coffee-gradient text-[#21140d] px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition"
            >
              Order Coffee
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-[#211713] border-t border-white/10"
            >
              <div className="flex flex-col p-6 gap-5">
                {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map(item => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-left hover:text-[#d5a36f]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[760px] h-screen max-h-[950px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=2000"
          alt="Freshly brewed coffee"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="container-custom relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-[650px]"
          >
            <span className="text-[#d5a36f] uppercase tracking-[5px] text-xs sm:text-sm font-bold">
              <Coffee size={17} className="inline mr-2" />
              Welcome to Brew Bliss
            </span>

            <h1 className="playfair text-5xl sm:text-7xl lg:text-[88px] leading-[1.08] font-bold mt-7">
              Life Begins
              <br />
              After <span className="text-[#d5a36f] italic">Coffee.</span>
            </h1>

            <p className="text-[#d8c7b7] text-base sm:text-lg leading-8 mt-7 max-w-lg">
              Discover the perfect blend of rich flavors, beautiful moments
              and freshly brewed happiness in every single cup.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <button
                onClick={() => scrollTo('menu')}
                className="coffee-gradient text-[#21140d] px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition"
              >
                Explore Menu <ArrowUpRight size={19} />
              </button>
              <button
                onClick={() => scrollTo('about')}
                className="border border-white/40 px-8 py-4 rounded-full hover:bg-white/10 transition"
              >
                Our Story
              </button>
            </div>

            <div className="flex gap-8 mt-14">
              <div>
                <h3 className="playfair text-3xl font-bold">15+</h3>
                <p className="text-sm text-[#b9a89a] mt-1">Coffee Blends</p>
              </div>
              <div className="border-l border-white/20 pl-8">
                <h3 className="playfair text-3xl font-bold">5K+</h3>
                <p className="text-sm text-[#b9a89a] mt-1">Happy Customers</p>
              </div>
              <div className="border-l border-white/20 pl-8">
                <h3 className="playfair text-3xl font-bold">4.9</h3>
                <p className="text-sm text-[#b9a89a] mt-1">Average Rating</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="coffee-bean absolute right-[9%] top-[20%] hidden lg:block text-[#d5a36f]/40">
          <Coffee size={100} />
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="bg-[#211713] py-8 border-y border-white/5">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-7">
          {[
            ['☕', 'Premium Beans', 'Carefully selected'],
            ['✦', 'Freshly Brewed', 'Made with love'],
            ['♨', 'Perfect Taste', 'Every single time'],
            ['♡', 'Cozy Moments', 'Feel at home']
          ].map(([icon, title, desc]) => (
            <div key={title} className="flex items-center gap-3">
              <span className="text-3xl text-[#d5a36f]">{icon}</span>
              <div>
                <h3 className="font-bold text-sm sm:text-base">{title}</h3>
                <p className="text-xs text-[#ad9a8b] mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28">
        <div className="container-custom grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900"
              alt="Cozy coffee shop interior"
              className="w-full h-[480px] object-cover rounded-3xl"
            />
            <div className="absolute -bottom-7 -right-5 sm:right-[-25px] coffee-gradient p-6 sm:p-8 rounded-2xl text-[#21140d] shadow-xl">
              <Coffee size={32} />
              <p className="playfair text-3xl font-bold mt-2">Since 2018</p>
              <p className="text-xs mt-1">Brewing happiness</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#d5a36f] tracking-[4px] uppercase text-xs font-bold">
              About Brew Bliss
            </span>
            <h2 className="playfair text-4xl sm:text-5xl font-bold leading-tight mt-5">
              More Than Coffee,
              <span className="text-[#d5a36f] italic"> It's An Experience.</span>
            </h2>
            <p className="text-[#bba99a] leading-8 mt-7">
              At Brew Bliss, we believe coffee is more than a drink.
              It's a moment of peace, a reason to connect and a little
              happiness in your everyday life.
            </p>
            <p className="text-[#bba99a] leading-8 mt-4">
              From carefully sourced beans to our passionate brewing
              process, every cup is created with attention and love.
            </p>
            <button
              onClick={() => scrollTo('menu')}
              className="mt-8 text-[#d5a36f] font-bold flex items-center gap-3 hover:gap-5 transition-all"
            >
              Discover Our Coffee <ArrowRight size={19} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-28 bg-[#211713]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#d5a36f] tracking-[4px] uppercase text-xs font-bold">
              Our Special Menu
            </span>
            <h2 className="playfair text-4xl sm:text-6xl font-bold mt-5">
              Taste The <span className="text-[#d5a36f] italic">Magic.</span>
            </h2>
            <p className="text-[#bba99a] mt-5 leading-7">
              Every cup tells a story. Find your favorite blend and
              make your coffee moment special.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-5">
            <div className="flex flex-wrap justify-center gap-3">
              {['All', 'Hot Coffee', 'Cold Coffee', 'Specials'].map(item => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-5 py-3 rounded-full text-sm transition ${
                    category === item
                      ? 'coffee-gradient text-[#21140d] font-bold'
                      : 'border border-white/15 text-[#d8c7b7] hover:border-[#d5a36f]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a88a70]" size={18} />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search coffee..."
                className="w-full bg-[#17100d] border border-white/15 rounded-full py-3 pl-11 pr-4 outline-none focus:border-[#d5a36f]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: .95 }}
                  transition={{ duration: .35, delay: index * .04 }}
                  key={product.id}
                  className="product-card bg-[#17100d] rounded-3xl overflow-hidden border border-white/10"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-5 left-5 bg-[#17100d]/85 px-4 py-2 rounded-full text-xs">
                      {product.category}
                    </span>
                    <button
                      onClick={() => toggleWishlist(product)}
                      aria-label={wishlist.some(item => item.id === product.id ? true : false) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                      className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#17100d]/85 flex items-center justify-center hover:scale-110 transition"
                    >
                      <Heart
                        size={20}
                        color="#d5a36f"
                        fill={wishlist.some(item => item.id === product.id) ? "#d5a36f" : "none"}
                      />
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                      className="absolute bottom-5 right-5 w-12 h-12 rounded-full coffee-gradient text-[#21140d] flex items-center justify-center hover:scale-110 transition"
                    >
                      <Plus size={22} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center gap-3">
                      <h3 className="playfair text-xl font-bold">{product.name}</h3>
                      <span className="text-[#d5a36f] font-bold whitespace-nowrap">
                        Rs. {product.price}
                      </span>
                    </div>
                    <p className="text-[#ad9a8b] text-sm leading-6 mt-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                      <span className="flex gap-1 items-center text-sm text-[#e9b968]">
                        <Star size={15} fill="currentColor" />
                        {product.rating}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="text-sm font-bold hover:text-[#d5a36f] transition"
                      >
                        Add to Cart +
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-[#bba99a] py-16">
              No coffee found. Try another search!
            </p>
          )}
        </div>
      </section>

      {/* SPECIAL BANNER */}
      <section className="py-24">
        <div className="container-custom">
          <div className="relative rounded-[32px] overflow-hidden min-h-[400px] flex items-center">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1500"
              alt="Coffee beans and brewing"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#160d09]/75" />
            <div className="relative z-10 p-8 sm:p-16 max-w-2xl">
              <span className="text-[#d5a36f] tracking-[4px] text-xs font-bold uppercase">
                A Little Something Special
              </span>
              <h2 className="playfair text-4xl sm:text-6xl font-bold mt-5 leading-tight">
                Make Your Day
                <span className="text-[#d5a36f] italic"> Delicious.</span>
              </h2>
              <p className="text-[#d7c6b8] mt-5 leading-7">
                Good coffee, good mood and beautiful memories.
                Your next favorite cup is waiting for you.
              </p>
              <button
                onClick={() => scrollTo('menu')}
                className="coffee-gradient text-[#21140d] px-8 py-4 rounded-full font-bold mt-8"
              >
                Find Your Favorite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-[#211713]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-[#d5a36f] uppercase tracking-[4px] text-xs font-bold">
              Coffee Moments
            </span>
            <h2 className="playfair text-4xl sm:text-5xl font-bold mt-4">
              Our Little <span className="text-[#d5a36f] italic">Gallery.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'photo-1495474472287-4d71bcdd2085',
              'photo-1501339847302-ac426a4a7cbb',
              'photo-1442512595331-e89e73853f31',
              'photo-1511920170033-f8396924c348'
            ].map((photo, index) => (
              <motion.div
                key={photo}
                whileHover={{ scale: 1.035 }}
                className={`overflow-hidden rounded-2xl ${
                  index === 1 || index === 2 ? 'h-56 md:h-80' : 'h-56'
                }`}
              >
                <img
                  src={`https://images.unsplash.com/${photo}?w=700`}
                  alt="Brew Bliss coffee gallery"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-28">
        <div className="container-custom max-w-3xl text-center">
          <span className="text-[#d5a36f] uppercase tracking-[4px] text-xs font-bold">
            Customer Stories
          </span>
          <h2 className="playfair text-4xl sm:text-5xl font-bold mt-5">
            Words From <span className="text-[#d5a36f] italic">Coffee Lovers.</span>
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12"
            >
              <div className="flex justify-center gap-2 text-[#e9b968]">
                {Array.from({ length: currentReview.rating }).map((_, i) => (
                  <Star key={i} fill="currentColor" size={20} />
                ))}
              </div>
              <p className="playfair text-2xl sm:text-3xl leading-relaxed mt-8 text-[#eadbcf]">
                "{currentReview.text}"
              </p>
              <h3 className="font-bold mt-8">{currentReview.name}</h3>
              <p className="text-sm text-[#ad9a8b] mt-2">{currentReview.role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-9">
            <button
              onClick={() => setReviewIndex((reviewIndex - 1 + reviews.length) % reviews.length)}
              className="w-11 h-11 rounded-full border border-white/20 hover:bg-[#d5a36f] hover:text-[#17100d] transition"
              aria-label="Previous review"
            >
              ←
            </button>
            <button
              onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)}
              className="w-11 h-11 rounded-full border border-white/20 hover:bg-[#d5a36f] hover:text-[#17100d] transition"
              aria-label="Next review"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-[#211713]">
        <div className="container-custom max-w-3xl text-center">
          <Coffee size={38} className="mx-auto text-[#d5a36f]" />
          <h2 className="playfair text-4xl sm:text-5xl font-bold mt-5">
            Stay In The <span className="text-[#d5a36f] italic">Loop.</span>
          </h2>
          <p className="text-[#bba99a] mt-4">
            Get updates about our latest blends and coffee moments.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-8">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-[#17100d] border border-white/15 rounded-full px-6 py-4 outline-none focus:border-[#d5a36f]"
            />
            <button className="coffee-gradient text-[#21140d] rounded-full px-8 py-4 font-bold">
              Subscribe
            </button>
          </form>

          {subscribed && (
            <p className="text-green-400 mt-4 flex justify-center gap-2">
              <CheckCircle size={18} /> Thanks for subscribing!
            </p>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#d5a36f] uppercase tracking-[4px] text-xs font-bold">
              Visit Us
            </span>
            <h2 className="playfair text-4xl sm:text-5xl font-bold mt-5">
              Let's Have A <span className="text-[#d5a36f] italic">Coffee.</span>
            </h2>
            <p className="text-[#bba99a] leading-8 mt-6">
              Have a question or want to know more about our coffee?
              We'd love to hear from you.
            </p>

            <div className="mt-9 space-y-5 text-[#d8c7b7]">
              <p>📍 Karachi, Pakistan</p>
              <p>☕ Monday – Sunday: 9 AM – 11 PM</p>
              <p>✉ hello@brewbliss.example</p>
            </div>
          </div>

          <div className="bg-[#211713] border border-white/10 p-8 rounded-3xl">
            <h3 className="playfair text-2xl font-bold mb-6">Coffee, Anyone?</h3>
            <p className="text-[#bba99a] leading-7">
              Visit Brew Bliss and enjoy your favorite coffee in a warm,
              welcoming atmosphere.
            </p>
            <button
              onClick={() => scrollTo('menu')}
              className="coffee-gradient text-[#21140d] rounded-full px-7 py-4 font-bold mt-8 flex items-center gap-3"
            >
              Explore Our Menu <ArrowUpRight size={19} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0b09] pt-16 pb-8 border-t border-white/10">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12">
            <div>
              <div className="flex items-center gap-2">
                <Coffee className="text-[#d5a36f]" size={27} />
                <span className="playfair text-2xl font-bold">
                  Brew<span className="text-[#d5a36f]">Bliss.</span>
                </span>
              </div>
              <p className="text-[#ad9a8b] text-sm leading-7 mt-5">
                Brewing beautiful moments, one cup at a time.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-5">Quick Links</h3>
              <div className="flex flex-col gap-3 text-sm text-[#ad9a8b]">
                {['Home', 'About', 'Menu', 'Gallery'].map(item => (
                  <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-left hover:text-[#d5a36f]">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-5">Opening Hours</h3>
              <p className="text-sm text-[#ad9a8b] leading-7">
                Monday – Friday<br />9:00 AM – 10:00 PM<br /><br />
                Saturday – Sunday<br />9:00 AM – 11:00 PM
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-5">Follow Our Journey</h3>
              <div className="flex gap-3">
                {[Camera, Globe, MessageCircle].map((Icon, i) => (
                  <a
                    key={i}
                    href="#contact"
                    aria-label={['Camera', 'Globe', 'MessageCircle'][i]}
                    className="w-11 h-11 border border-white/15 rounded-full flex items-center justify-center hover:bg-[#d5a36f] hover:text-[#17100d] transition"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row justify-between gap-4 text-sm text-[#8f7d70]">
            <p>© 2026 Brew Bliss. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with <Heart size={15} className="text-[#d5a36f]" fill="currentColor" /> and coffee.
            </p>
          </div>
        </div>
      </footer>

      {/* SHOPPING CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/70 z-50"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#211713] z-[51] p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <h2 className="playfair text-3xl font-bold">Your Cart</h2>
                <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                  <X size={25} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 space-y-5">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag size={45} className="mx-auto text-[#d5a36f]" />
                    <h3 className="playfair text-2xl mt-5">Your cart is empty</h3>
                    <p className="text-[#ad9a8b] mt-2">Add a little happiness!</p>
                    <button
                      onClick={() => {
                        setCartOpen(false)
                        scrollTo('menu')
                      }}
                      className="coffee-gradient text-[#21140d] px-6 py-3 rounded-full mt-6 font-bold"
                    >
                      Explore Menu
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-[#d5a36f] text-sm mt-1">Rs. {item.price}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity" className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center">
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity" className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`} className="text-red-400">
                        <Trash2 size={19} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex justify-between text-lg font-bold mb-5">
                  <span>Total</span>
                  <span className="text-[#d5a36f]">Rs. {total.toLocaleString('en-PK')}</span>
                </div>
                <button
                  disabled={cart.length === 0}
                  onClick={() => alert('This is a demo cart. Online checkout will be added in a future update!')}
                  className="w-full coffee-gradient text-[#21140d] py-4 rounded-full font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
                <p className="text-center text-xs text-[#8f7d70] mt-4">
                  Demo shopping cart • No real payment is collected
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* WISHLIST DRAWER */}
      <AnimatePresence>
        {wishlistOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWishlistOpen(false)}
              className="fixed inset-0 bg-black/70 z-[60]"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#211713] z-[61] p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <h2 className="playfair text-3xl font-bold">My Wishlist</h2>
                  <p className="text-sm text-[#ad9a8b] mt-1">Your favourite coffee collection</p>
                </div>
                <button onClick={() => setWishlistOpen(false)} aria-label="Close wishlist">
                  <X size={25} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 space-y-5">
                {wishlist.length === 0 ? (
                  <div className="text-center py-20">
                    <Heart size={48} className="mx-auto text-[#d5a36f]" />
                    <h3 className="playfair text-2xl mt-5">Your Wishlist Is Empty</h3>
                    <p className="text-[#ad9a8b] mt-2">Save your favourite coffee here!</p>
                    <button
                      onClick={() => { setWishlistOpen(false); scrollTo('menu') }}
                      className="coffee-gradient text-[#21140d] px-6 py-3 rounded-full mt-6 font-bold"
                    >
                      Explore Menu
                    </button>
                  </div>
                ) : (
                  wishlist.map(item => (
                    <div key={item.id} className="flex gap-4 items-center border-b border-white/10 pb-5">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-[#d5a36f] text-sm mt-1">Rs. {item.price}</p>
                        <button
                          onClick={() => { addToCart(item); setWishlistOpen(false) }}
                          className="text-sm mt-3 font-bold hover:text-[#d5a36f]"
                        >
                          Add to Cart +
                        </button>
                      </div>
                      <button onClick={() => removeFromWishlist(item.id)} aria-label={`Remove ${item.name} from wishlist`} className="text-red-400">
                        <Trash2 size={19} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {wishlist.length > 0 && (
                <div className="border-t border-white/10 pt-5 text-center text-sm text-[#ad9a8b]">
                  {wishlist.length} favourite item(s) saved
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}

export default App
