
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  Check,
  ChevronDown,
  Heart,
  Home,
  MapPin,
  Maximize2,
  Menu,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  type: "Buy" | "Rent" | "Commercial";
  beds: number;
  baths: number;
  area: number;
  image: string;
  tag?: string;
  description: string;
};

const properties: Property[] = [
  {
    id: 1,
    title: "The Glasshouse Residence",
    location: "Baner, Pune",
    price: 24500000,
    type: "Buy",
    beds: 4,
    baths: 3,
    area: 2850,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
    tag: "Featured",
    description:
      "A beautifully designed contemporary residence featuring expansive windows, open living spaces and thoughtfully curated interiors.",
  },
  {
    id: 2,
    title: "The Willow Apartment",
    location: "Koregaon Park, Pune",
    price: 85000,
    type: "Rent",
    beds: 3,
    baths: 3,
    area: 1850,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
    tag: "New listing",
    description:
      "A calm, light-filled apartment in a sought-after neighbourhood, with modern finishes and convenient access to city life.",
  },
  {
    id: 3,
    title: "Monarch Business Suites",
    location: "Hinjawadi, Pune",
    price: 18500000,
    type: "Commercial",
    beds: 0,
    baths: 2,
    area: 3200,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85",
    description:
      "Flexible commercial office space with a professional reception area, natural light and excellent connectivity.",
  },
  {
    id: 4,
    title: "Casa Verde Villa",
    location: "Wakad, Pune",
    price: 32500000,
    type: "Buy",
    beds: 5,
    baths: 4,
    area: 4100,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
    tag: "Premium",
    description:
      "A spacious private villa with landscaped outdoor areas, generous bedrooms and elegant contemporary architecture.",
  },
  {
    id: 5,
    title: "Urban Nest",
    location: "Viman Nagar, Pune",
    price: 62000,
    type: "Rent",
    beds: 2,
    baths: 2,
    area: 1250,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
    description:
      "A stylish two-bedroom home with a practical layout, warm interiors and easy access to everyday essentials.",
  },
  {
    id: 6,
    title: "The Atelier Workspace",
    location: "Kalyani Nagar, Pune",
    price: 12500000,
    type: "Commercial",
    beds: 0,
    baths: 1,
    area: 2100,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85",
    tag: "Investment",
    description:
      "A modern workspace designed for growing teams, with an adaptable floor plan and a premium business address.",
  },
];

const formatPrice = (price: number, type: Property["type"]) => {
  if (type === "Rent") {
    return `₹${price.toLocaleString("en-IN")}/mo`;
  }

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }

  return `₹${(price / 100000).toFixed(0)} L`;
};

export default function RealEstateDemo() {
  const [activeType, setActiveType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);
  const [enquiryProperty, setEnquiryProperty] =
    useState<Property | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      const matchesType =
        activeType === "All" || property.type === activeType;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query);

      const matchesPrice =
        maxPrice === "All" ||
        (maxPrice === "Under 1 Cr" && property.price < 10000000) ||
        (maxPrice === "1–3 Cr" &&
          property.price >= 10000000 &&
          property.price <= 30000000) ||
        (maxPrice === "Above 3 Cr" && property.price > 30000000);

      return matchesType && matchesSearch && matchesPrice;
    });

    if (sortBy === "Price: Low to High") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "Price: High to Low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeType, searchQuery, maxPrice, sortBy]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const closeModals = () => {
    setSelectedProperty(null);
    setEnquiryProperty(null);
    setSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#202923]">
      {/* Navigation */}
      <nav className="relative z-20 border-b border-black/[0.07] bg-[#f7f7f4]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 lg:px-16">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#263d32] text-white">
              <Home size={19} />
            </div>
            <div>
              <div className="text-[19px] font-semibold tracking-[-0.8px]">
                haven<span className="text-[#82977f]">.</span>
              </div>
              <div className="text-[9px] tracking-[2.5px] text-[#8b918a]">
                ESTATES
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-9 text-[13px] font-medium text-[#697169] md:flex">
            <a href="#properties" className="transition hover:text-[#263d32]">
              Properties
            </a>
            <a href="#about" className="transition hover:text-[#263d32]">
              About us
            </a>
            <a href="#services" className="transition hover:text-[#263d32]">
              Services
            </a>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <span className="text-xs text-[#777f77]">
              Pune, India
            </span>
            <button
              onClick={() => setEnquiryProperty(null)}
              className="rounded-full bg-[#263d32] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#395a48]"
            >
              Contact an advisor
            </button>
          </div>

          <button
            className="rounded-full border border-black/10 p-2 md:hidden"
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
              className="overflow-hidden border-t border-black/5 bg-[#f7f7f4] md:hidden"
            >
              <div className="flex flex-col gap-4 px-6 py-5 text-sm">
                <a href="#properties" onClick={() => setMobileMenu(false)}>
                  Properties
                </a>
                <a href="#about" onClick={() => setMobileMenu(false)}>
                  About us
                </a>
                <a href="#services" onClick={() => setMobileMenu(false)}>
                  Services
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#263d32]">
        <div className="absolute -right-24 -top-36 h-[500px] w-[500px] rounded-full border border-white/[0.08]" />
        <div className="absolute -right-12 -top-24 h-[380px] w-[380px] rounded-full border border-white/[0.08]" />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_0.9fr] lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#a8bd9f]" />
              <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#b8c9b2]">
                A better way to find home
              </span>
            </div>

            <h1 className="max-w-[650px] text-[48px] font-medium leading-[1.08] tracking-[-2.8px] text-white sm:text-6xl lg:text-[76px]">
              Find a place
              <br />
              to <span className="font-serif italic text-[#b8c9a9]">belong.</span>
            </h1>

            <p className="mt-7 max-w-[450px] text-sm leading-7 text-white/65">
              Discover exceptional spaces, thoughtfully selected for the
              way you want to live, work and grow.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#properties"
                className="group flex items-center gap-3 rounded-full bg-[#dce6d3] px-7 py-4 text-xs font-semibold text-[#263d32] transition hover:bg-white"
              >
                Explore properties
                <ArrowUpRight
                  size={16}
                  className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
              <span className="text-xs text-white/50">
                Curated living. Thoughtfully found.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="relative h-[340px] overflow-hidden rounded-[4px] sm:h-[440px]">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=90"
                alt="Contemporary luxury home"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 text-white">
                <div className="mb-2 text-[10px] uppercase tracking-[2px] text-white/70">
                  Property of the month
                </div>
                <div className="text-2xl font-medium tracking-tight">
                  The Art of Living
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-white/75">
                  <MapPin size={13} />
                  Koregaon Park, Pune
                </div>
              </div>
              <div className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#263d32]">
                Editor&apos;s pick
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-sm bg-[#dce6d3] px-6 py-5 shadow-xl sm:block">
              <div className="text-3xl font-semibold tracking-tight text-[#263d32]">
                250+
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[1.5px] text-[#657765]">
                Spaces discovered
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="relative z-10 mx-auto -mt-1 max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="border-b border-black/[0.07] py-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-[2px] text-[#657165]">
              Your next chapter starts here
            </div>
            <div className="text-[11px] text-[#92988f]">
              Explore our curated collection
            </div>
          </div>

          <div className="grid gap-3 rounded-sm border border-black/[0.08] bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.04)] md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center md:p-4">
            <div className="flex items-center gap-3 px-3">
              <Search size={18} className="shrink-0 text-[#80917e]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Location, neighbourhood or property..."
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-[#a3aaa1]"
              />
            </div>

            <div className="flex items-center gap-3 border-t border-black/[0.07] px-3 pt-3 md:border-l md:border-t-0 md:pt-0">
              <MapPin size={17} className="text-[#80917e]" />
              <select
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
                className="w-full bg-transparent py-3 text-sm outline-none"
              >
                <option value="All">All properties</option>
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="flex items-center gap-3 border-t border-black/[0.07] px-3 pt-3 md:border-l md:border-t-0 md:pt-0">
              <SlidersHorizontal size={17} className="text-[#80917e]" />
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-transparent py-3 text-sm outline-none"
              >
                <option value="All">Any price</option>
                <option value="Under 1 Cr">Under ₹1 Cr</option>
                <option value="1–3 Cr">₹1–3 Cr</option>
                <option value="Above 3 Cr">Above ₹3 Cr</option>
              </select>
            </div>

            <button
              onClick={() =>
                document
                  .getElementById("properties")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center justify-center gap-2 rounded-sm bg-[#263d32] px-7 py-4 text-xs font-semibold text-white transition hover:bg-[#395a48]"
            >
              Find a property
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section
        id="properties"
        className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:px-16"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[2.5px] text-[#83927e]">
              The collection
            </div>
            <h2 className="text-3xl font-medium tracking-[-1.5px] sm:text-5xl">
              Spaces worth <span className="font-serif italic">discovering.</span>
            </h2>
            <p className="mt-4 text-sm text-[#899087]">
              A considered collection of places to call your own.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#858d83]">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-black/10 bg-transparent px-4 py-2 text-xs outline-none"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {["All", "Buy", "Rent", "Commercial"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-full px-5 py-2.5 text-xs transition ${
                  activeType === type
                    ? "bg-[#263d32] text-white"
                    : "border border-black/10 text-[#697469] hover:border-[#263d32]"
                }`}
              >
                {type === "All" ? "All spaces" : type}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#8b9289]">
            {filteredProperties.length} properties found
          </span>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property, index) => (
              <motion.article
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group"
              >
                <div className="relative mb-5 h-[250px] overflow-hidden bg-[#e9ece5]">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 flex gap-2">
                    {property.tag && (
                      <span className="bg-[#dce6d3] px-3 py-2 text-[9px] font-semibold uppercase tracking-[1px] text-[#344a39]">
                        {property.tag}
                      </span>
                    )}
                    <span className="bg-white/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[1px] text-[#344a39]">
                      {property.type}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFavorite(property.id)}
                    aria-label="Toggle wishlist"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
                  >
                    <Heart
                      size={16}
                      className={
                        favorites.includes(property.id)
                          ? "fill-[#b66b61] text-[#b66b61]"
                          : "text-[#59665b]"
                      }
                    />
                  </button>

                  <button
                    onClick={() => setSelectedProperty(property)}
                    className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-white text-[#263d32] transition hover:bg-[#dce6d3]"
                    aria-label="View property details"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[18px] font-medium tracking-[-0.5px]">
                      {property.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8b9389]">
                      <MapPin size={13} />
                      {property.location}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-lg font-semibold tracking-tight text-[#344b3a]">
                      {formatPrice(property.price, property.type)}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-black/[0.08] pt-4">
                  <div className="flex flex-wrap gap-4 text-[11px] text-[#788277]">
                    {property.beds > 0 && (
                      <span className="flex items-center gap-1.5">
                        <BedDouble size={15} />
                        {property.beds} Beds
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Bath size={15} />
                      {property.baths} Baths
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize2 size={14} />
                      {property.area.toLocaleString("en-IN")} sqft
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProperty(property)}
                  className="mt-5 flex w-full items-center justify-between border border-[#263d32]/20 px-5 py-3.5 text-xs font-semibold text-[#263d32] transition hover:bg-[#263d32] hover:text-white"
                >
                  View property
                  <ArrowUpRight size={15} />
                </button>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-black/15 py-20 text-center">
            <Home size={30} className="mx-auto text-[#9ba69a]" />
            <h3 className="mt-4 text-lg font-medium">No properties found</h3>
            <p className="mt-2 text-sm text-[#899087]">
              Try changing your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveType("All");
                setMaxPrice("All");
              }}
              className="mt-5 text-xs font-semibold text-[#344b3a] underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" className="bg-[#e9ede5]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:px-10 lg:grid-cols-2 lg:items-center lg:px-16 lg:py-28">
          <div className="relative h-[360px] overflow-hidden sm:h-[470px]">
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85"
              alt="Beautiful modern residential interior"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-5 left-5 bg-white px-5 py-4">
              <div className="text-xl font-semibold text-[#263d32]">01 / 03</div>
              <div className="mt-1 text-[9px] uppercase tracking-[1.5px] text-[#899087]">
                Thoughtfully selected
              </div>
            </div>
          </div>

          <div className="lg:pl-12">
            <div className="mb-5 text-[10px] font-semibold uppercase tracking-[2.5px] text-[#82917e]">
              More than real estate
            </div>
            <h2 className="text-4xl font-medium leading-tight tracking-[-2px] sm:text-5xl">
              A home is not
              <br />
              just a place.
              <br />
              It&apos;s a <span className="font-serif italic text-[#71896d]">feeling.</span>
            </h2>
            <p className="mt-7 max-w-[450px] text-sm leading-7 text-[#737d72]">
              At Haven, we believe finding the right property should feel
              exciting, clear and personal. We bring carefully selected
              spaces together so you can focus on what matters most:
              finding your next chapter.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-5 border-t border-[#263d32]/15 pt-7">
              <div>
                <div className="text-3xl font-medium tracking-tight">250+</div>
                <div className="mt-2 text-[9px] uppercase tracking-[1.3px] text-[#879184]">
                  Properties
                </div>
              </div>
              <div>
                <div className="text-3xl font-medium tracking-tight">18</div>
                <div className="mt-2 text-[9px] uppercase tracking-[1.3px] text-[#879184]">
                  Locations
                </div>
              </div>
              <div>
                <div className="text-3xl font-medium tracking-tight">96%</div>
                <div className="mt-2 text-[9px] uppercase tracking-[1.3px] text-[#879184]">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="mb-12 max-w-xl">
          <div className="mb-4 text-[10px] font-semibold uppercase tracking-[2.5px] text-[#82917e]">
            How we help
          </div>
          <h2 className="text-4xl font-medium tracking-[-1.7px]">
            Every step, made <span className="font-serif italic">simpler.</span>
          </h2>
        </div>

        <div className="grid gap-0 border-t border-black/10 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Find your space",
              description:
                "Explore curated properties that match your location, lifestyle and budget.",
            },
            {
              number: "02",
              title: "Make a move",
              description:
                "Compare options, discover the details and arrange your next viewing.",
            },
            {
              number: "03",
              title: "Feel at home",
              description:
                "Move forward with clarity and confidence as you find your place.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="border-b border-black/10 py-9 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <div className="mb-10 text-xs text-[#91a08c]">{item.number}</div>
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="mt-4 max-w-[280px] text-sm leading-7 text-[#858e83]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#263d32] px-5 py-20 text-center text-white md:px-10 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 text-[10px] uppercase tracking-[3px] text-[#b8c9b2]">
            Your next chapter awaits
          </div>
          <h2 className="text-4xl font-medium tracking-[-1.7px] sm:text-6xl">
            Let&apos;s find your
            <br />
            <span className="font-serif italic text-[#b8c9a9]">somewhere.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/60">
            Tell us what you&apos;re looking for. Your next favourite place
            might be closer than you think.
          </p>
          <button
            onClick={() => {
              setEnquiryProperty(null);
              setSubmitted(false);
              document
                .getElementById("enquiry-modal")
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#dce6d3] px-8 py-4 text-xs font-semibold text-[#263d32] transition hover:bg-white"
          >
            Talk to our team
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1c3027] px-5 py-9 text-white/60 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="text-xl font-semibold tracking-tight text-white">
              haven<span className="text-[#9db394]">.</span>
            </div>
            <div className="mt-1 text-[9px] uppercase tracking-[2px]">
              Estates · Pune
            </div>
          </div>
          <div className="text-xs">
            © 2026 Haven Estates. Demo experience by Azoytrix.
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-xs transition hover:text-white"
          >
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>

      {/* Property details modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto w-full max-w-2xl overflow-hidden bg-[#f7f7f4] text-[#202923] shadow-2xl"
            >
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white"
                aria-label="Close property details"
              >
                <X size={18} />
              </button>

              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="h-[250px] w-full object-cover sm:h-[320px]"
              />

              <div className="p-6 sm:p-9">
                <div className="text-[10px] font-semibold uppercase tracking-[2px] text-[#81917d]">
                  {selectedProperty.type} property
                </div>
                <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight">
                      {selectedProperty.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-xs text-[#8b9389]">
                      <MapPin size={14} />
                      {selectedProperty.location}
                    </div>
                  </div>
                  <div className="text-xl font-semibold text-[#344b3a]">
                    {formatPrice(selectedProperty.price, selectedProperty.type)}
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-[#7e887d]">
                  {selectedProperty.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-6 border-y border-black/10 py-5 text-xs text-[#6f7c70]">
                  {selectedProperty.beds > 0 && (
                    <span className="flex items-center gap-2">
                      <BedDouble size={17} />
                      {selectedProperty.beds} Bedrooms
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <Bath size={17} />
                    {selectedProperty.baths} Bathrooms
                  </span>
                  <span className="flex items-center gap-2">
                    <Maximize2 size={16} />
                    {selectedProperty.area.toLocaleString("en-IN")} sqft
                  </span>
                </div>

                <button
                  onClick={() => {
                    setEnquiryProperty(selectedProperty);
                    setSelectedProperty(null);
                    setSubmitted(false);
                  }}
                  className="mt-7 flex w-full items-center justify-center gap-2 bg-[#263d32] py-4 text-xs font-semibold text-white transition hover:bg-[#395a48]"
                >
                  Enquire about this property
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enquiry modal */}
      <AnimatePresence>
        {enquiryProperty !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnquiryProperty(null)}
          >
            <motion.div
              id="enquiry-modal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#f7f7f4] p-7 text-[#202923] sm:p-9"
            >
              <button
                onClick={() => setEnquiryProperty(null)}
                className="absolute right-5 top-5"
                aria-label="Close enquiry form"
              >
                <X size={19} />
              </button>

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dce6d3] text-[#344b3a]">
                    <Check size={25} />
                  </div>
                  <h3 className="mt-6 text-2xl font-medium">
                    Enquiry received!
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#858e83]">
                    This is a demo confirmation. No information has been
                    sent to a server.
                  </p>
                  <button
                    onClick={() => setEnquiryProperty(null)}
                    className="mt-7 bg-[#263d32] px-7 py-3 text-xs font-semibold text-white"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-[10px] font-semibold uppercase tracking-[2px] text-[#82917e]">
                    Let&apos;s connect
                  </div>
                  <h3 className="mt-3 text-3xl font-medium tracking-tight">
                    {enquiryProperty ? "Interested?" : "Talk to our team."}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#858e83]">
                    {enquiryProperty
                      ? `Ask us about ${enquiryProperty.title}.`
                      : "Tell us a little about what you are looking for."}
                  </p>

                  <form
                    className="mt-7 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <input
                      required
                      placeholder="Your name"
                      className="w-full border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:border-[#71896d]"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      className="w-full border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:border-[#71896d]"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone number"
                      className="w-full border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:border-[#71896d]"
                    />
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 bg-[#263d32] py-4 text-xs font-semibold text-white transition hover:bg-[#395a48]"
                    >
                      Submit enquiry
                      <ArrowRight size={15} />
                    </button>
                  </form>
                  <p className="mt-4 text-center text-[10px] text-[#a0a69d]">
                    Demo only · Form submissions are not stored
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
