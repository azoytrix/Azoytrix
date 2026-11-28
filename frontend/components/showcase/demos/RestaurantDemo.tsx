
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChefHat,
  Clock,
  MapPin,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Utensils,
  Wine,
  X,
} from "lucide-react";

type Dish = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
};

const dishes: Dish[] = [
  {
    id: 1,
    name: "Burrata & Heirloom",
    description: "Fresh burrata, seasonal tomatoes, basil oil, sourdough.",
    price: 620,
    category: "Starters",
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=900&q=85",
    tag: "Chef's pick",
  },
  {
    id: 2,
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, porcini mushrooms, parmesan, truffle oil.",
    price: 780,
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=900&q=85",
  },
  {
    id: 3,
    name: "Charred Garden Bowl",
    description: "Roasted seasonal vegetables, grains, tahini dressing.",
    price: 540,
    category: "Starters",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=85",
    tag: "Fresh",
  },
  {
    id: 4,
    name: "Slow-Roasted Lamb",
    description: "Herb crust, smoked potato purée, red wine reduction.",
    price: 1120,
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85",
    tag: "Signature",
  },
  {
    id: 5,
    name: "Dark Chocolate Fondant",
    description: "Warm chocolate centre, vanilla bean ice cream.",
    price: 420,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900&q=85",
  },
  {
    id: 6,
    name: "Strawberry Panna Cotta",
    description: "Vanilla cream, fresh strawberries, berry compote.",
    price: 380,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=85",
  },
  {
    id: 7,
    name: "Citrus Garden Cooler",
    description: "Fresh citrus, mint, sparkling water.",
    price: 260,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=900&q=85",
  },
  {
    id: 8,
    name: "House Espresso",
    description: "Double shot of our signature roasted coffee.",
    price: 180,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900&q=85",
  },
];

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

const money = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function RestaurantDemo() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationDone, setReservationDone] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "19:00",
    guests: "2",
    notes: "",
  });

  const filteredDishes = useMemo(
    () =>
      activeCategory === "All"
        ? dishes
        : dishes.filter((dish) => dish.category === activeCategory),
    [activeCategory]
  );

  const cartItems = dishes.filter((dish) => (cart[dish.id] || 0) > 0);

  const cartCount = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (sum, dish) => sum + dish.price * cart[dish.id],
    0
  );

  const updateCart = (id: number, change: number) => {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + change;

      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });
  };

  const submitReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReservationDone(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ee] text-[#27251f]">
      {/* Navigation */}
      <nav className="relative z-30 border-b border-[#27251f]/10 bg-[#f8f5ee]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 lg:px-16">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#742f37] text-[#f8f5ee]">
              <Utensils size={18} />
            </div>
            <div>
              <div className="text-[19px] font-bold tracking-[2px]">
                SAVORA
              </div>
              <div className="text-[8px] tracking-[3px] text-[#8d8376]">
                THE ART OF DINING
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[1.4px] text-[#756d62] md:flex">
            <a href="#story" className="transition hover:text-[#742f37]">
              Our story
            </a>
            <a href="#menu" className="transition hover:text-[#742f37]">
              Menu
            </a>
            <a href="#experience" className="transition hover:text-[#742f37]">
              Experience
            </a>
            <a href="#contact" className="transition hover:text-[#742f37]">
              Contact
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#27251f]/15"
              aria-label="Open order basket"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#742f37] text-[9px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setReservationDone(false);
                setReservationOpen(true);
              }}
              className="bg-[#742f37] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[1.4px] text-white transition hover:bg-[#55232a]"
            >
              Reserve a table
            </button>
          </div>

          <button
            className="rounded-full border border-[#27251f]/15 p-2 md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#27251f]/10 md:hidden"
            >
              <div className="flex flex-col gap-5 px-6 py-6 text-xs font-semibold uppercase tracking-wider">
                <a href="#story" onClick={() => setMobileMenu(false)}>
                  Our story
                </a>
                <a href="#menu" onClick={() => setMobileMenu(false)}>
                  Menu
                </a>
                <a href="#experience" onClick={() => setMobileMenu(false)}>
                  Experience
                </a>
                <button
                  onClick={() => {
                    setMobileMenu(false);
                    setReservationDone(false);
                    setReservationOpen(true);
                  }}
                  className="w-full bg-[#742f37] py-3 text-white"
                >
                  Reserve a table
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section id="home" className="relative">
        <div className="grid min-h-[650px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center px-6 py-20 md:px-12 lg:pl-[max(4rem,calc((100vw-1280px)/2))] lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-[#a17b63]" />
                <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#96715f]">
                  Pune · Since 2018
                </span>
              </div>

              <h1 className="max-w-[580px] text-[58px] font-medium leading-[1.03] tracking-[-3px] sm:text-[76px] lg:text-[88px]">
                Good food.
                <br />
                <span className="font-serif italic text-[#742f37]">
                  Good mood.
                </span>
              </h1>

              <p className="mt-8 max-w-[390px] text-sm leading-7 text-[#837b70]">
                A celebration of honest ingredients, thoughtful cooking
                and the beautiful moments that happen around a table.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href="#menu"
                  className="group flex items-center gap-4 bg-[#742f37] px-7 py-4 text-[10px] font-bold uppercase tracking-[1.5px] text-white transition hover:bg-[#55232a]"
                >
                  Explore our menu
                  <ArrowUpRight
                    size={15}
                    className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
                <div className="flex items-center gap-2 text-[10px] text-[#887f72]">
                  <Star size={13} className="fill-[#b38a4c] text-[#b38a4c]" />
                  <span className="font-bold text-[#27251f]">4.9/5</span>
                  Guest experience
                </div>
              </div>
            </motion.div>

            <div className="mt-16 grid max-w-[420px] grid-cols-3 gap-5 border-t border-[#27251f]/10 pt-7">
              <div>
                <div className="text-2xl font-semibold">08</div>
                <div className="mt-1 text-[9px] uppercase tracking-[1.5px] text-[#9a9185]">
                  Years of craft
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold">32+</div>
                <div className="mt-1 text-[9px] uppercase tracking-[1.5px] text-[#9a9185]">
                  Signature dishes
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold">12k</div>
                <div className="mt-1 text-[9px] uppercase tracking-[1.5px] text-[#9a9185]">
                  Happy guests
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[450px] overflow-hidden lg:min-h-[700px]">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=90"
              alt="Elegant restaurant dining experience"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 flex items-center gap-4 text-white md:bottom-12 md:left-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60">
                <Wine size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[2px] text-white/70">
                  An experience to remember
                </div>
                <div className="mt-1 text-lg font-serif italic">
                  Made with intention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-[#742f37] py-5 text-[#f8f5ee]">
        <motion.div
          animate={{ x: [0, -500] }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          className="flex w-max items-center gap-10 whitespace-nowrap"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-10 text-[10px] font-semibold uppercase tracking-[3px]"
            >
              <span>Seasonal ingredients</span>
              <span className="text-[#d6aa8b]">✳</span>
              <span>Thoughtful cooking</span>
              <span className="text-[#d6aa8b]">✳</span>
              <span>Beautiful moments</span>
              <span className="text-[#d6aa8b]">✳</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Story */}
      <section
        id="story"
        className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 lg:grid-cols-2 lg:items-center lg:px-16 lg:py-32"
      >
        <div className="relative">
          <div className="grid grid-cols-[1fr_0.78fr] items-end gap-4">
            <img
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=85"
              alt="Chef preparing food"
              className="h-[360px] w-full object-cover sm:h-[470px]"
            />
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85"
              alt="Restaurant dining room"
              className="mb-12 h-[250px] w-full object-cover sm:h-[330px]"
            />
          </div>
          <div className="absolute bottom-0 left-0 bg-[#742f37] px-6 py-5 text-white">
            <div className="text-2xl font-serif italic">Made by hand.</div>
            <div className="mt-1 text-[8px] uppercase tracking-[2px] text-white/65">
              Served with heart.
            </div>
          </div>
        </div>

        <div className="lg:pl-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-9 bg-[#a17b63]" />
            <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#96715f]">
              A little about us
            </span>
          </div>

          <h2 className="text-4xl font-medium leading-[1.12] tracking-[-1.7px] sm:text-6xl">
            Food is our
            <br />
            <span className="font-serif italic text-[#742f37]">
              love language.
            </span>
          </h2>

          <p className="mt-7 text-sm leading-8 text-[#827a6f]">
            We started with a simple idea: bring people together over food
            that feels familiar yet surprising. Our kitchen celebrates
            seasonal produce, bold flavours and the joy of sharing.
          </p>

          <p className="mt-4 text-sm leading-8 text-[#827a6f]">
            Every plate tells a story. Every visit is an invitation to slow
            down, connect and enjoy the little things.
          </p>

          <div className="mt-9 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eee6d8] text-[#742f37]">
              <ChefHat size={21} />
            </div>
            <div>
              <div className="text-sm font-semibold">Chef Arjun Mehta</div>
              <div className="mt-1 text-[10px] text-[#9b9184]">
                Founder & Head Chef
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="bg-[#eee9df] px-5 py-24 md:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-9 bg-[#a17b63]" />
                <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#96715f]">
                  From our kitchen
                </span>
              </div>
              <h2 className="text-4xl font-medium tracking-[-1.7px] sm:text-6xl">
                A menu worth
                <br />
                <span className="font-serif italic text-[#742f37]">
                  gathering for.
                </span>
              </h2>
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-3 border border-[#742f37]/30 px-5 py-3 text-[10px] font-bold uppercase tracking-[1px] text-[#742f37] transition hover:bg-[#742f37] hover:text-white"
            >
              <ShoppingBag size={15} />
              Your basket ({cartCount})
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-2 border-b border-[#27251f]/15 pb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-3 text-[10px] font-bold uppercase tracking-[1.2px] transition ${
                  activeCategory === category
                    ? "bg-[#742f37] text-white"
                    : "border border-[#27251f]/15 text-[#786f63] hover:border-[#742f37] hover:text-[#742f37]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="mt-9 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish) => (
                <motion.article
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="relative h-[230px] overflow-hidden bg-[#ddd5c8]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    {dish.tag && (
                      <span className="absolute left-4 top-4 bg-[#f8f5ee] px-3 py-2 text-[8px] font-bold uppercase tracking-[1.2px] text-[#742f37]">
                        {dish.tag}
                      </span>
                    )}
                    <button
                      onClick={() => updateCart(dish.id, 1)}
                      className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-[#f8f5ee] text-[#742f37] shadow-lg transition hover:bg-[#742f37] hover:text-white"
                      aria-label={`Add ${dish.name} to basket`}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[16px] font-semibold tracking-[-0.3px]">
                        {dish.name}
                      </h3>
                      <div className="mt-1 text-[9px] font-semibold uppercase tracking-[1.4px] text-[#a08d79]">
                        {dish.category}
                      </div>
                    </div>
                    <div className="whitespace-nowrap text-sm font-semibold text-[#742f37]">
                      {money(dish.price)}
                    </div>
                  </div>

                  <p className="mt-3 min-h-[42px] text-[11px] leading-5 text-[#898174]">
                    {dish.description}
                  </p>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-14 text-center">
            <p className="text-[10px] text-[#9b9184]">
              Menu prices are illustrative sample prices for this demo.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="relative overflow-hidden bg-[#27251f] text-[#f8f5ee]"
      >
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-20 md:px-12 lg:py-28 lg:pl-[max(4rem,calc((100vw-1280px)/2))]">
            <div className="mb-6 text-[9px] font-bold uppercase tracking-[3px] text-[#d4a98d]">
              The Savora experience
            </div>
            <h2 className="text-4xl font-medium leading-tight tracking-[-1.7px] sm:text-6xl">
              Come for the
              <br />
              <span className="font-serif italic text-[#d9b79c]">
                flavours.
              </span>
              <br />
              Stay for the feeling.
            </h2>
            <p className="mt-7 max-w-[420px] text-sm leading-8 text-white/55">
              Whether it&apos;s an intimate dinner, a celebration with
              friends or a spontaneous evening out, there&apos;s always a
              place for you at our table.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setReservationDone(false);
                  setReservationOpen(true);
                }}
                className="flex items-center gap-3 bg-[#d9b79c] px-7 py-4 text-[10px] font-bold uppercase tracking-[1.4px] text-[#27251f] transition hover:bg-white"
              >
                Book your experience
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="relative min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=90"
              alt="Warm restaurant interior"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-5 py-24 text-center md:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="text-5xl font-serif text-[#a17b63]">“</div>
          <h2 className="mt-3 text-3xl font-medium leading-snug tracking-[-1px] sm:text-5xl">
            The best memories are made around a table.
          </h2>
          <div className="mx-auto mt-8 h-px w-12 bg-[#a17b63]" />
          <div className="mt-5 text-[9px] font-bold uppercase tracking-[2px] text-[#9b9184]">
            The Savora philosophy
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#eee9df] px-5 py-20 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-3">
          <div>
            <div className="mb-5 text-[9px] font-bold uppercase tracking-[2.5px] text-[#96715f]">
              Find us
            </div>
            <h3 className="text-2xl font-semibold">Visit our table.</h3>
            <div className="mt-6 flex items-start gap-3 text-xs leading-6 text-[#827a6f]">
              <MapPin size={16} className="mt-1 shrink-0 text-[#742f37]" />
              Koregaon Park, Pune, Maharashtra, India
            </div>
          </div>

          <div>
            <div className="mb-5 text-[9px] font-bold uppercase tracking-[2.5px] text-[#96715f]">
              Opening hours
            </div>
            <h3 className="text-2xl font-semibold">Always a good time.</h3>
            <div className="mt-6 space-y-3 text-xs text-[#827a6f]">
              <div className="flex justify-between gap-5">
                <span>Monday – Friday</span>
                <span>12 PM – 11 PM</span>
              </div>
              <div className="flex justify-between gap-5">
                <span>Saturday – Sunday</span>
                <span>11 AM – 11:30 PM</span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[9px] font-bold uppercase tracking-[2.5px] text-[#96715f]">
              Stay connected
            </div>
            <h3 className="text-2xl font-semibold">Let&apos;s keep in touch.</h3>
            <p className="mt-5 text-xs leading-6 text-[#827a6f]">
              Follow along for seasonal menus, special evenings and
              little moments from our kitchen.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#742f37]"
            >
              <svg
  width={16}
  height={16}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth={1.8}
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
>
  <rect x="3" y="3" width="18" height="18" rx="5" />
  <circle cx="12" cy="12" r="4" />
  <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
</svg>
              Follow us on Instagram
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#742f37] px-5 py-9 text-white md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 sm:flex-row">
          <div>
            <div className="text-xl font-bold tracking-[2px]">SAVORA</div>
            <div className="mt-1 text-[8px] tracking-[2px] text-white/60">
              THE ART OF DINING
            </div>
          </div>
          <div className="text-center text-[10px] text-white/60">
            © 2026 Savora Restaurant. Demo concept by Azoytrix.
          </div>
          <a
            href="#home"
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider"
          >
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>

      {/* Basket drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[430px] flex-col bg-[#f8f5ee] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#27251f]/10 px-6 py-6">
                <div>
                  <div className="text-lg font-semibold">Your basket</div>
                  <div className="mt-1 text-[10px] text-[#9b9184]">
                    {cartCount} items selected
                  </div>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close basket"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                {cartItems.length > 0 ? (
                  <div className="space-y-5">
                    {cartItems.map((dish) => (
                      <div
                        key={dish.id}
                        className="flex gap-4 border-b border-[#27251f]/10 pb-5"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="h-20 w-20 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold">
                            {dish.name}
                          </div>
                          <div className="mt-1 text-xs text-[#742f37]">
                            {money(dish.price)}
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <button
                              onClick={() => updateCart(dish.id, -1)}
                              className="flex h-7 w-7 items-center justify-center border border-[#27251f]/15"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-semibold">
                              {cart[dish.id]}
                            </span>
                            <button
                              onClick={() => updateCart(dish.id, 1)}
                              className="flex h-7 w-7 items-center justify-center border border-[#27251f]/15"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs font-semibold">
                          {money(dish.price * cart[dish.id])}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <ShoppingBag size={35} className="text-[#b9aa98]" />
                    <div className="mt-5 text-lg font-semibold">
                      Your basket is empty
                    </div>
                    <p className="mt-2 text-xs text-[#9b9184]">
                      Explore our menu and add something delicious.
                    </p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="mt-6 bg-[#742f37] px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white"
                    >
                      Explore menu
                    </button>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-[#27251f]/10 px-6 py-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#827a6f]">Subtotal</span>
                    <span className="font-semibold">{money(cartTotal)}</span>
                  </div>
                  <p className="mt-2 text-[10px] text-[#9b9184]">
                    Taxes and service charges are not included.
                  </p>
                  <button
                    onClick={() => {
                      setCart({});
                      setCartOpen(false);
                      window.alert(
                        "Demo order complete! No real order was placed."
                      );
                    }}
                    className="mt-6 w-full bg-[#742f37] py-4 text-[10px] font-bold uppercase tracking-[1.5px] text-white transition hover:bg-[#55232a]"
                  >
                    Continue to checkout
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Reservation modal */}
      <AnimatePresence>
        {reservationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReservationOpen(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto w-full max-w-lg bg-[#f8f5ee] p-7 sm:p-10"
            >
              <button
                onClick={() => setReservationOpen(false)}
                className="absolute right-6 top-6"
                aria-label="Close reservation form"
              >
                <X size={19} />
              </button>

              {reservationDone ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6eee1] text-[#58724f]">
                    <Check size={28} />
                  </div>
                  <h3 className="mt-6 text-3xl font-medium">
                    Your table awaits.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#827a6f]">
                    Thank you, {reservation.name}. Your demo reservation
                    details have been accepted locally.
                  </p>
                  <div className="mt-6 border-y border-[#27251f]/10 py-5 text-xs text-[#827a6f]">
                    <div>{reservation.date}</div>
                    <div className="mt-2">
                      {reservation.time} · {reservation.guests} guests
                    </div>
                  </div>
                  <p className="mt-5 text-[10px] text-[#a39a8e]">
                    This is a prototype confirmation, not a real booking.
                  </p>
                  <button
                    onClick={() => setReservationOpen(false)}
                    className="mt-7 bg-[#742f37] px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-white"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center gap-3">
                    <CalendarDays size={19} className="text-[#742f37]" />
                    <span className="text-[9px] font-bold uppercase tracking-[2.5px] text-[#96715f]">
                      Make it a moment
                    </span>
                  </div>

                  <h3 className="text-3xl font-medium tracking-[-1px] sm:text-4xl">
                    Reserve your
                    <br />
                    <span className="font-serif italic text-[#742f37]">
                      table.
                    </span>
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-[#8c8377]">
                    Choose your preferred time and let us take care of
                    the rest.
                  </p>

                  <form
                    onSubmit={submitReservation}
                    className="mt-7 space-y-4"
                  >
                    <input
                      required
                      placeholder="Your full name"
                      value={reservation.name}
                      onChange={(e) =>
                        setReservation({
                          ...reservation,
                          name: e.target.value,
                        })
                      }
                      className="w-full border border-[#27251f]/15 bg-white px-4 py-3.5 text-xs outline-none focus:border-[#742f37]"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        required
                        type="email"
                        placeholder="Email address"
                        value={reservation.email}
                        onChange={(e) =>
                          setReservation({
                            ...reservation,
                            email: e.target.value,
                          })
                        }
                        className="min-w-0 border border-[#27251f]/15 bg-white px-4 py-3.5 text-xs outline-none focus:border-[#742f37]"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Phone number"
                        value={reservation.phone}
                        onChange={(e) =>
                          setReservation({
                            ...reservation,
                            phone: e.target.value,
                          })
                        }
                        className="min-w-0 border border-[#27251f]/15 bg-white px-4 py-3.5 text-xs outline-none focus:border-[#742f37]"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-[#8c8377]">
                          Date
                        </span>
                        <input
                          required
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={reservation.date}
                          onChange={(e) =>
                            setReservation({
                              ...reservation,
                              date: e.target.value,
                            })
                          }
                          className="w-full border border-[#27251f]/15 bg-white px-4 py-3.5 text-xs outline-none focus:border-[#742f37]"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-[#8c8377]">
                          Time
                        </span>
                        <select
                          value={reservation.time}
                          onChange={(e) =>
                            setReservation({
                              ...reservation,
                              time: e.target.value,
                            })
                          }
                          className="w-full border border-[#27251f]/15 bg-white px-4 py-3.5 text-xs outline-none focus:border-[#742f37]"
                        >
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="18:00">6:00 PM</option>
                          <option value="19:00">7:00 PM</option>
                          <option value="20:00">8:00 PM</option>
                          <option value="21:00">9:00 PM</option>
                        </select>
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-[#8c8377]">
                        Number of guests
                      </span>
                      <select
                        value={reservation.guests}
                        onChange={(e) =>
                          setReservation({
                            ...reservation,
                            guests: e.target.value,
                          })
                        }
                        className="w-full border border-[#27251f]/15 bg-white px-4 py-3.5 text-xs outline-none focus:border-[#742f37]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                          <option key={number} value={number}>
                            {number} {number === 1 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </label>

                    <textarea
                      rows={2}
                      placeholder="Special requests (optional)"
                      value={reservation.notes}
                      onChange={(e) =>
                        setReservation({
                          ...reservation,
                          notes: e.target.value,
                        })
                      }
                      className="w-full resize-none border border-[#27251f]/15 bg-white px-4 py-3.5 text-xs outline-none focus:border-[#742f37]"
                    />

                    <button
                      type="submit"
                      className="mt-2 flex w-full items-center justify-center gap-3 bg-[#742f37] py-4 text-[10px] font-bold uppercase tracking-[1.5px] text-white transition hover:bg-[#55232a]"
                    >
                      Confirm reservation
                      <ArrowRight size={15} />
                    </button>
                  </form>
                  <p className="mt-4 text-center text-[9px] text-[#a39a8e]">
                    Demo only · No actual reservation is created
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
