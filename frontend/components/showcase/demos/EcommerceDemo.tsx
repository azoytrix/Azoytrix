
"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Truck,
  X,
  Zap,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Studio Wireless Headphones",
    category: "Audio",
    price: 8999,
    oldPrice: 11999,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85",
    badge: "BESTSELLER",
    description: "Immersive wireless sound with a comfortable over-ear design and long-lasting battery.",
  },
  {
    id: 2,
    name: "Minimal Everyday Watch",
    category: "Accessories",
    price: 6499,
    rating: 4.8,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85",
    description: "A timeless everyday watch with a refined minimal dial and premium finish.",
  },
  {
    id: 3,
    name: "Urban Everyday Sneakers",
    category: "Fashion",
    price: 4299,
    oldPrice: 5499,
    rating: 4.7,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85",
    badge: "SALE",
    description: "Lightweight everyday sneakers combining street-inspired design and comfort.",
  },
  {
    id: 4,
    name: "Modern Travel Backpack",
    category: "Accessories",
    price: 3599,
    rating: 4.8,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85",
    description: "A versatile everyday backpack designed for commuting, travel and daily essentials.",
  },
  {
    id: 5,
    name: "Performance Smart Speaker",
    category: "Audio",
    price: 5299,
    oldPrice: 6999,
    rating: 4.6,
    reviews: 53,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&q=85",
    badge: "POPULAR",
    description: "Compact speaker with room-filling audio and a clean contemporary silhouette.",
  },
  {
    id: 6,
    name: "Classic Optical Frames",
    category: "Fashion",
    price: 2499,
    rating: 4.7,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&q=85",
    description: "Versatile optical frames with a modern profile for everyday styling.",
  },
  {
    id: 7,
    name: "Essential Desk Lamp",
    category: "Lifestyle",
    price: 3199,
    rating: 4.8,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=85",
    description: "A sculptural desk lamp that brings focused light and understated character to your space.",
  },
  {
    id: 8,
    name: "Ceramic Coffee Set",
    category: "Lifestyle",
    price: 1899,
    rating: 4.9,
    reviews: 115,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=85",
    badge: "NEW",
    description: "A carefully designed ceramic coffee set for slow mornings and everyday rituals.",
  },
];

const categories = ["All", "Audio", "Fashion", "Accessories", "Lifestyle"];

const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

export default function EcommerceDemo() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeCategory, search, sort]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartItems = products.filter((product) => cart[product.id]);
  const cartTotal = cartItems.reduce(
    (total, product) => total + product.price * cart[product.id],
    0
  );

  function addToCart(product: Product) {
    setCart((previous) => ({
      ...previous,
      [product.id]: (previous[product.id] || 0) + 1,
    }));
    setNotice(`${product.name} added to your bag.`);
    setSelectedProduct(null);
  }

  function updateQuantity(id: number, amount: number) {
    setCart((previous) => {
      const next = { ...previous };
      const updated = (next[id] || 0) + amount;

      if (updated <= 0) delete next[id];
      else next[id] = updated;

      return next;
    });
  }

  function toggleWishlist(id: number) {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#22231f]">
      {/* Announcement */}
      <div className="flex items-center justify-center gap-2 bg-[#1e2924] px-4 py-2.5 text-center text-[10px] font-semibold tracking-[0.14em] text-white sm:text-xs">
        <Truck size={14} />
        COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹2,999
        <ArrowUpRight size={13} />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-[#e9e7e0] bg-[#faf9f6]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu size={21} />
            </button>
            <a href="#" className="text-2xl font-black tracking-[-0.09em]">
              NOVA<span className="text-[#bd7854]">.</span>
            </a>
          </div>

          <nav className="hidden items-center gap-9 lg:flex">
            {["New Arrivals", "Shop All", "Lifestyle", "Our Story"].map((item) => (
              <a
                key={item}
                href="#products"
                className="text-xs font-semibold text-[#686a62] transition hover:text-[#bd7854]"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => document.getElementById("store-search")?.focus()}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#efeee8]"
              aria-label="Search products"
            >
              <Search size={19} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#efeee8]"
              aria-label="Open shopping bag"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#bd7854] px-1 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="border-t border-[#e9e7e0] bg-white px-5 py-4 lg:hidden">
            {["New Arrivals", "Shop All", "Lifestyle", "Our Story"].map((item) => (
              <a
                key={item}
                href="#products"
                onClick={() => setMobileMenu(false)}
                className="block border-b border-slate-100 py-3 text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative mx-auto grid max-w-[1440px] overflow-hidden px-5 py-8 md:px-10 md:py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative z-10 flex flex-col justify-center py-10 md:py-16 lg:py-20">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#bd7854]">
              <Sparkles size={14} />
              THE EVERYDAY EDIT · 2026
            </div>

            <h1 className="mt-7 max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-0.065em] text-[#252821] sm:text-6xl xl:text-7xl">
              Everyday, but
              <span className="block font-serif italic font-normal text-[#bd7854]">
                extraordinary.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-[#77786e] md:text-base">
              Thoughtful essentials. Beautifully made objects. Discover
              everyday pieces designed to make the ordinary feel special.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-3 bg-[#252d27] px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#bd7854]"
              >
                Explore Collection
                <ArrowRight size={16} />
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-2 border border-[#deddd5] px-6 py-4 text-xs font-bold uppercase tracking-widest transition hover:border-[#252d27]"
              >
                Our Story
              </a>
            </div>

            <div className="mt-14 flex items-center gap-5 border-t border-[#e8e5dc] pt-7">
              <div className="flex -space-x-2">
                {["bg-[#d6a28c]", "bg-[#8d9b83]", "bg-[#c6b6a1]", "bg-[#8b8eaa]"].map((color, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full border-2 border-[#faf9f6] ${color}`}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((item) => <Star key={item} size={11} fill="currentColor" />)}
                  <span className="ml-1 text-[10px] font-bold text-[#252821]">4.9/5</span>
                </div>
                <p className="mt-1 text-[10px] text-[#88897f]">Loved by 2,400+ happy customers</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[380px] overflow-hidden bg-[#e9e5da] md:min-h-[530px]">
            <img
              src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=1500&q=90"
              alt="Minimal contemporary lifestyle interior"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white md:bottom-10 md:left-10 md:right-10">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em]">CURATED FOR YOU</p>
                <p className="mt-2 font-serif text-3xl italic md:text-4xl">The new essentials.</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50">
                <ArrowUpRight size={21} />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-y border-[#e9e7e0] bg-white">
          <div className="mx-auto grid max-w-[1440px] gap-5 px-5 py-6 sm:grid-cols-3 md:px-10">
            {[
              { icon: Truck, title: "Thoughtful Delivery", detail: "Free shipping over ₹2,999" },
              { icon: Check, title: "Quality First", detail: "Carefully selected products" },
              { icon: Zap, title: "Easy Shopping", detail: "A seamless store experience" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center justify-center gap-3">
                  <Icon size={21} className="text-[#bd7854]" />
                  <div>
                    <p className="text-xs font-bold">{item.title}</p>
                    <p className="mt-1 text-[10px] text-[#92938a]">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Products */}
        <section id="products" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#bd7854]">
                THE COLLECTION
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] md:text-5xl">
                Find your next favourite.
              </h2>
              <p className="mt-3 text-sm text-[#88897f]">
                A considered collection of everyday essentials.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999a90]" />
                <input
                  id="store-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products..."
                  className="w-48 border border-[#e5e2d9] bg-white py-3 pl-9 pr-3 text-xs outline-none transition focus:border-[#bd7854]"
                />
              </div>
              <div className="relative">
                <SlidersHorizontal size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#88897f]" />
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="appearance-none border border-[#e5e2d9] bg-white py-3 pl-9 pr-8 text-xs outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="low">Price: Low to high</option>
                  <option value="high">Price: High to low</option>
                  <option value="rating">Top rated</option>
                </select>
                <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#88897f]" />
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest transition ${
                  activeCategory === category
                    ? "bg-[#252d27] text-white"
                    : "border border-[#e5e2d9] text-[#77786e] hover:border-[#252d27] hover:text-[#252d27]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-9 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#eeece5]">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="h-full w-full text-left"
                    aria-label={`View ${product.name}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </button>

                  {product.badge && (
                    <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-[9px] font-bold tracking-widest">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Toggle wishlist"
                    className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition ${
                      wishlist.includes(product.id) ? "text-rose-500" : "text-[#686a62] hover:text-rose-500"
                    }`}
                  >
                    <Heart size={17} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                  </button>

                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 left-4 right-4 flex translate-y-3 items-center justify-center gap-2 bg-white/95 py-3 text-[10px] font-bold uppercase tracking-widest opacity-0 backdrop-blur transition duration-300 hover:bg-[#252d27] hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <ShoppingBag size={14} />
                    Add to bag
                  </button>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#a09f94]">
                      {product.category}
                    </p>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="mt-1 text-left text-sm font-semibold text-[#252821] hover:text-[#bd7854]"
                    >
                      {product.name}
                    </button>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-[#a09f94]">
                      <Star size={11} fill="#c28a42" stroke="#c28a42" />
                      <span className="font-semibold text-[#55564f]">{product.rating}</span>
                      ({product.reviews} reviews)
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatPrice(product.price)}</p>
                    {product.oldPrice && (
                      <p className="mt-1 text-xs text-[#a5a49b] line-through">{formatPrice(product.oldPrice)}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <Search size={30} className="mx-auto text-[#aaa99f]" />
              <p className="mt-4 text-sm font-semibold">No products found</p>
              <p className="mt-2 text-xs text-[#99998f]">Try a different search or category.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-5 text-xs font-bold text-[#bd7854]"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Story banner */}
        <section id="story" className="bg-[#e9e5da]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:px-10 md:py-24">
            <div className="relative aspect-[5/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1100&q=85"
                alt="Minimal retail store interior"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="max-w-lg">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bd7854]">A LITTLE ABOUT US</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.055em] md:text-5xl">
                Less noise.
                <span className="block font-serif italic font-normal text-[#bd7854]">More meaning.</span>
              </h2>
              <p className="mt-6 text-sm leading-7 text-[#73756c]">
                We believe good design belongs in everyday life. NOVA brings together
                thoughtfully chosen products, considered details and timeless style.
              </p>
              <a href="#products" className="mt-8 inline-flex items-center gap-3 border-b border-[#252d27] pb-2 text-xs font-bold uppercase tracking-widest">
                Discover NOVA <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-[#252d27] px-5 py-16 text-center text-white md:py-20">
          <Sparkles size={21} className="mx-auto text-[#d29b78]" />
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">A little something in your inbox.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/50">
            New arrivals, thoughtful finds and the occasional good surprise.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setNotice("Thanks for subscribing! This is a local demo interaction.");
            }}
            className="mx-auto mt-8 flex max-w-md gap-2"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="min-w-0 flex-1 border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#d29b78]"
            />
            <button type="submit" className="flex items-center gap-2 bg-[#d29b78] px-5 text-xs font-bold text-[#252d27] transition hover:bg-white">
              Join <ArrowRight size={15} />
            </button>
          </form>
          {notice && <p className="mt-4 text-xs text-[#d9b89f]">{notice}</p>}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1c241f] px-5 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="text-3xl font-black tracking-[-0.09em]">NOVA<span className="text-[#bd7854]">.</span></p>
            <p className="mt-3 max-w-xs text-xs leading-6 text-white/40">Everyday objects, thoughtfully chosen.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Explore</p>
              <a href="#products" className="mt-4 block text-xs text-white/40 hover:text-white">Shop all</a>
              <a href="#story" className="mt-3 block text-xs text-white/40 hover:text-white">Our story</a>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Support</p>
              <p className="mt-4 text-xs text-white/40">Shipping & returns</p>
              <p className="mt-3 text-xs text-white/40">Contact us</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Follow</p>
              <p className="mt-4 text-xs text-white/40">Instagram</p>
              <p className="mt-3 text-xs text-white/40">Pinterest</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1440px] border-t border-white/10 pt-5 text-[10px] text-white/30">
          © 2026 NOVA Store · Ecommerce demo interface
        </div>
      </footer>

      {/* Product quick view */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative grid w-full max-w-3xl overflow-hidden bg-[#faf9f6] md:grid-cols-2">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
              aria-label="Close product details"
            >
              <X size={18} />
            </button>
            <div className="min-h-[280px]">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-7 md:p-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#bd7854]">{selectedProduct.category}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{selectedProduct.name}</h3>
              <div className="mt-3 flex items-center gap-1 text-xs text-[#a09f94]">
                <Star size={13} fill="#c28a42" stroke="#c28a42" />
                {selectedProduct.rating} ({selectedProduct.reviews} reviews)
              </div>
              <p className="mt-5 text-sm leading-7 text-[#77786e]">{selectedProduct.description}</p>
              <p className="mt-6 text-2xl font-bold">{formatPrice(selectedProduct.price)}</p>
              <button
                onClick={() => addToCart(selectedProduct)}
                className="mt-7 flex items-center justify-center gap-2 bg-[#252d27] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#bd7854]"
              >
                <ShoppingBag size={16} /> Add to bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="flex h-full w-full max-w-md flex-col bg-[#faf9f6] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e8e5dc] px-6 py-5">
              <div>
                <h3 className="text-lg font-bold">Your shopping bag</h3>
                <p className="mt-1 text-xs text-[#99998f]">{cartCount} items</p>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag size={35} className="text-[#c5c2b8]" />
                  <p className="mt-4 font-semibold">Your bag is empty</p>
                  <p className="mt-2 text-xs text-[#99998f]">Discover something you love.</p>
                  <button onClick={() => setCartOpen(false)} className="mt-6 bg-[#252d27] px-6 py-3 text-xs font-bold text-white">Continue shopping</button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cartItems.map((product) => (
                    <div key={product.id} className="flex gap-4 border-b border-[#e8e5dc] pb-5">
                      <img src={product.image} alt={product.name} className="h-24 w-20 object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="mt-2 text-sm font-bold">{formatPrice(product.price)}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <button onClick={() => updateQuantity(product.id, -1)} aria-label="Decrease quantity" className="flex h-7 w-7 items-center justify-center border border-[#ddd9cf]"><Minus size={12} /></button>
                          <span className="text-xs font-semibold">{cart[product.id]}</span>
                          <button onClick={() => updateQuantity(product.id, 1)} aria-label="Increase quantity" className="flex h-7 w-7 items-center justify-center border border-[#ddd9cf]"><Plus size={12} /></button>
                        </div>
                      </div>
                      <p className="text-sm font-bold">{formatPrice(product.price * cart[product.id])}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-[#e8e5dc] px-6 py-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#77786e]">Subtotal</span>
                  <span className="font-bold">{formatPrice(cartTotal)}</span>
                </div>
                <p className="mt-2 text-[10px] text-[#99998f]">Shipping and taxes calculated at checkout.</p>
                <button
                  onClick={() => setNotice("Checkout is a preview only. No payment is processed.")}
                  className="mt-5 flex w-full items-center justify-center gap-2 bg-[#252d27] py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#bd7854]"
                >
                  Checkout preview <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Small toast */}
      {notice && !cartOpen && (
        <div className="fixed bottom-5 right-5 z-[60] flex max-w-sm items-center gap-3 bg-[#252d27] px-5 py-4 text-sm text-white shadow-xl">
          <Check size={17} className="shrink-0 text-[#d29b78]" />
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss notification"><X size={15} /></button>
        </div>
      )}
    </div>
  );
}
