
export type ShowcaseProject = {
  slug: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  icon: string;
  accent: string;
  accentSoft: string;
  headline: string;
  primaryMetric: string;
  primaryMetricLabel: string;
  metrics: { label: string; value: string; change: string }[];
  features: string[];
  modules: string[];
  sampleRecords: {
    name: string;
    detail: string;
    status: string;
    amount: string;
  }[];
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "analytics-dashboard",
    number: "01",
    title: "Analytics Dashboard",
    category: "Dashboard",
    shortDescription: "A data-rich business intelligence dashboard.",
    description:
      "Explore a modern analytics workspace with performance indicators, revenue insights, activity tracking and interactive data views.",
    icon: "ChartNoAxesCombined",
    accent: "#8B5CF6",
    accentSoft: "rgba(139, 92, 246, 0.12)",
    headline: "Make every metric meaningful.",
    primaryMetric: "₹24.8L",
    primaryMetricLabel: "Total revenue",
    metrics: [
      { label: "Total revenue", value: "₹24.8L", change: "+18.6%" },
      { label: "Active users", value: "12,840", change: "+12.4%" },
      { label: "Conversion rate", value: "8.42%", change: "+2.1%" },
      { label: "Orders", value: "3,284", change: "+9.8%" },
    ],
    features: ["Revenue analytics", "User insights", "Performance charts", "Activity monitoring"],
    modules: ["Overview", "Analytics", "Customers", "Reports"],
    sampleRecords: [
      { name: "Website traffic", detail: "Organic search", status: "Growing", amount: "18,420" },
      { name: "Product sales", detail: "Online store", status: "Active", amount: "₹84,500" },
      { name: "New customers", detail: "This month", status: "Growing", amount: "1,284" },
      { name: "Subscriptions", detail: "Recurring", status: "Active", amount: "₹42,000" },
    ],
  },
  {
    slug: "corporate-website",
    number: "02",
    title: "Corporate Website",
    category: "Website",
    shortDescription: "A premium digital presence for modern companies.",
    description:
      "A polished corporate website concept with service discovery, company information, conversion-focused sections and a responsive layout.",
    icon: "Building2",
    accent: "#06B6D4",
    accentSoft: "rgba(6, 182, 212, 0.12)",
    headline: "Your brand deserves a better digital presence.",
    primaryMetric: "98%",
    primaryMetricLabel: "Performance score",
    metrics: [
      { label: "Performance", value: "98%", change: "+4.2%" },
      { label: "Page views", value: "48.2K", change: "+16.8%" },
      { label: "Enquiries", value: "1,248", change: "+22.1%" },
      { label: "Engagement", value: "72%", change: "+8.4%" },
    ],
    features: ["Responsive design", "Service pages", "Lead generation", "SEO-ready structure"],
    modules: ["Overview", "Services", "About", "Enquiries"],
    sampleRecords: [
      { name: "Enterprise enquiry", detail: "Website contact form", status: "New", amount: "Today" },
      { name: "Service consultation", detail: "Cloud solutions", status: "Pending", amount: "Yesterday" },
      { name: "Partnership request", detail: "Business development", status: "Active", amount: "2 days ago" },
      { name: "Project enquiry", detail: "Custom software", status: "Completed", amount: "3 days ago" },
    ],
  },
  {
    slug: "personal-portfolio",
    number: "03",
    title: "Personal Portfolio",
    category: "Portfolio",
    shortDescription: "A creative portfolio for professionals and developers.",
    description:
      "A personal branding experience with project highlights, skills, experience, testimonials and contact opportunities.",
    icon: "UserRound",
    accent: "#F59E0B",
    accentSoft: "rgba(245, 158, 11, 0.12)",
    headline: "Turn your work into your strongest introduction.",
    primaryMetric: "24",
    primaryMetricLabel: "Projects showcased",
    metrics: [
      { label: "Projects", value: "24", change: "+4 this year" },
      { label: "Profile views", value: "8,420", change: "+14.2%" },
      { label: "Enquiries", value: "186", change: "+12.8%" },
      { label: "Skills", value: "18", change: "Updated" },
    ],
    features: ["Project showcase", "Experience timeline", "Skills display", "Contact section"],
    modules: ["Overview", "Projects", "Experience", "Contact"],
    sampleRecords: [
      { name: "E-commerce platform", detail: "Full-stack development", status: "Published", amount: "2026" },
      { name: "AI assistant", detail: "AI integration", status: "Published", amount: "2026" },
      { name: "Portfolio website", detail: "Personal branding", status: "Published", amount: "2025" },
      { name: "Admin dashboard", detail: "Dashboard UI", status: "In progress", amount: "2025" },
    ],
  },
  {
    slug: "school-management",
    number: "04",
    title: "School Management",
    category: "Education",
    shortDescription: "A unified platform for schools and educational institutions.",
    description:
      "A school administration concept for managing students, attendance, teachers, fees, classes and academic information.",
    icon: "GraduationCap",
    accent: "#10B981",
    accentSoft: "rgba(16, 185, 129, 0.12)",
    headline: "Simplify the everyday work of education.",
    primaryMetric: "2,480",
    primaryMetricLabel: "Enrolled students",
    metrics: [
      { label: "Students", value: "2,480", change: "+8.2%" },
      { label: "Teachers", value: "124", change: "+4.1%" },
      { label: "Attendance", value: "94.8%", change: "+1.6%" },
      { label: "Fee collection", value: "₹18.4L", change: "+12.5%" },
    ],
    features: ["Student records", "Attendance tracking", "Fee management", "Academic reports"],
    modules: ["Overview", "Students", "Teachers", "Attendance"],
    sampleRecords: [
      { name: "Aarav Sharma", detail: "Grade 10 · Section A", status: "Present", amount: "STU-1024" },
      { name: "Ananya Patel", detail: "Grade 9 · Section B", status: "Present", amount: "STU-1025" },
      { name: "Rehan Khan", detail: "Grade 10 · Section C", status: "Absent", amount: "STU-1026" },
      { name: "Sara Thomas", detail: "Grade 8 · Section A", status: "Present", amount: "STU-1027" },
    ],
  },
  {
    slug: "hospital-management",
    number: "05",
    title: "Hospital Management",
    category: "Healthcare",
    shortDescription: "A connected administrative experience for healthcare.",
    description:
      "A hospital management interface concept covering appointments, patient records, departments, staff and operational overview.",
    icon: "Hospital",
    accent: "#F43F5E",
    accentSoft: "rgba(244, 63, 94, 0.12)",
    headline: "Bring healthcare operations into focus.",
    primaryMetric: "186",
    primaryMetricLabel: "Appointments today",
    metrics: [
      { label: "Appointments", value: "186", change: "+10.2%" },
      { label: "Patients", value: "1,840", change: "+6.8%" },
      { label: "Available beds", value: "42", change: "Updated" },
      { label: "Departments", value: "12", change: "Operational" },
    ],
    features: ["Appointment management", "Patient records", "Department overview", "Staff management"],
    modules: ["Overview", "Patients", "Appointments", "Departments"],
    sampleRecords: [
      { name: "Patient #1042", detail: "Cardiology", status: "Checked in", amount: "09:30 AM" },
      { name: "Patient #1043", detail: "General medicine", status: "Scheduled", amount: "10:15 AM" },
      { name: "Patient #1044", detail: "Orthopedics", status: "Completed", amount: "11:00 AM" },
      { name: "Patient #1045", detail: "Dermatology", status: "Scheduled", amount: "11:45 AM" },
    ],
  },
  {
    slug: "ecommerce-store",
    number: "06",
    title: "E-commerce Store",
    category: "Commerce",
    shortDescription: "A modern online shopping and product management experience.",
    description:
      "A storefront and commerce administration concept featuring product catalogues, orders, customers and sales insights.",
    icon: "ShoppingBag",
    accent: "#EC4899",
    accentSoft: "rgba(236, 72, 153, 0.12)",
    headline: "Create shopping experiences people remember.",
    primaryMetric: "₹8.42L",
    primaryMetricLabel: "Monthly sales",
    metrics: [
      { label: "Sales", value: "₹8.42L", change: "+21.4%" },
      { label: "Orders", value: "1,284", change: "+14.8%" },
      { label: "Products", value: "486", change: "+12 new" },
      { label: "Customers", value: "3,840", change: "+18.2%" },
    ],
    features: ["Product catalogue", "Order management", "Customer accounts", "Sales reporting"],
    modules: ["Overview", "Products", "Orders", "Customers"],
    sampleRecords: [
      { name: "Wireless headphones", detail: "Electronics", status: "In stock", amount: "₹2,499" },
      { name: "Smart watch", detail: "Wearables", status: "Low stock", amount: "₹4,999" },
      { name: "Running shoes", detail: "Fashion", status: "In stock", amount: "₹3,299" },
      { name: "Travel backpack", detail: "Accessories", status: "Out of stock", amount: "₹1,899" },
    ],
  },
  {
    slug: "local-services",
    number: "07",
    title: "Local Services Platform",
    category: "Services",
    shortDescription: "A discovery and booking platform for local businesses.",
    description:
      "A service marketplace concept connecting customers with local professionals through discovery, enquiries and booking workflows.",
    icon: "Store",
    accent: "#14B8A6",
    accentSoft: "rgba(20, 184, 166, 0.12)",
    headline: "Make local services easier to discover.",
    primaryMetric: "1,240",
    primaryMetricLabel: "Service bookings",
    metrics: [
      { label: "Bookings", value: "1,240", change: "+18.2%" },
      { label: "Providers", value: "186", change: "+12 new" },
      { label: "Customers", value: "4,820", change: "+16.4%" },
      { label: "Completion", value: "96.4%", change: "+2.8%" },
    ],
    features: ["Service discovery", "Booking workflow", "Provider profiles", "Customer enquiries"],
    modules: ["Overview", "Services", "Providers", "Bookings"],
    sampleRecords: [
      { name: "Home cleaning", detail: "Household services", status: "Confirmed", amount: "₹899" },
      { name: "AC maintenance", detail: "Appliance repair", status: "Pending", amount: "₹1,299" },
      { name: "Plumbing service", detail: "Home maintenance", status: "Completed", amount: "₹650" },
      { name: "Salon appointment", detail: "Personal care", status: "Confirmed", amount: "₹499" },
    ],
  },
  {
    slug: "real-estate",
    number: "08",
    title: "Real Estate Platform",
    category: "Real Estate",
    shortDescription: "A property discovery and lead management experience.",
    description:
      "A real estate platform concept for browsing property listings, tracking enquiries and managing property information.",
    icon: "House",
    accent: "#0EA5E9",
    accentSoft: "rgba(14, 165, 233, 0.12)",
    headline: "Bring every property opportunity together.",
    primaryMetric: "₹12.6Cr",
    primaryMetricLabel: "Listing value",
    metrics: [
      { label: "Properties", value: "284", change: "+18 new" },
      { label: "Enquiries", value: "486", change: "+12.4%" },
      { label: "Site visits", value: "124", change: "+8.6%" },
      { label: "Listing value", value: "₹12.6Cr", change: "+14.2%" },
    ],
    features: ["Property listings", "Search and filters", "Enquiry tracking", "Agent management"],
    modules: ["Overview", "Properties", "Enquiries", "Agents"],
    sampleRecords: [
      { name: "Skyline Residency", detail: "3 BHK · Pune", status: "Available", amount: "₹85 L" },
      { name: "Green Valley", detail: "2 BHK · Mumbai", status: "Booked", amount: "₹62 L" },
      { name: "Urban Heights", detail: "4 BHK · Hyderabad", status: "Available", amount: "₹1.2 Cr" },
      { name: "Lakeview Homes", detail: "2 BHK · Nashik", status: "Sold", amount: "₹48 L" },
    ],
  },
  {
    slug: "restaurant-platform",
    number: "09",
    title: "Restaurant Platform",
    category: "Hospitality",
    shortDescription: "A restaurant ordering and operations interface.",
    description:
      "A restaurant platform concept with menu management, table reservations, orders and sales overview.",
    icon: "Utensils",
    accent: "#F97316",
    accentSoft: "rgba(249, 115, 22, 0.12)",
    headline: "Serve better experiences, from menu to table.",
    primaryMetric: "₹1.84L",
    primaryMetricLabel: "Today's sales",
    metrics: [
      { label: "Today's sales", value: "₹1.84L", change: "+16.4%" },
      { label: "Orders", value: "284", change: "+12.8%" },
      { label: "Reservations", value: "48", change: "+8.2%" },
      { label: "Menu items", value: "86", change: "Updated" },
    ],
    features: ["Digital menu", "Order tracking", "Table reservations", "Sales overview"],
    modules: ["Overview", "Menu", "Orders", "Reservations"],
    sampleRecords: [
      { name: "Order #2048", detail: "Table 04", status: "Preparing", amount: "₹1,240" },
      { name: "Order #2049", detail: "Online delivery", status: "Ready", amount: "₹860" },
      { name: "Order #2050", detail: "Table 08", status: "Served", amount: "₹2,180" },
      { name: "Order #2051", detail: "Online delivery", status: "New", amount: "₹540" },
    ],
  },
  {
    slug: "crm-system",
    number: "10",
    title: "CRM System",
    category: "Business",
    shortDescription: "A customer relationship and sales pipeline workspace.",
    description:
      "A CRM dashboard concept for organizing contacts, tracking sales opportunities, managing follow-ups and viewing pipeline performance.",
    icon: "Users",
    accent: "#6366F1",
    accentSoft: "rgba(99, 102, 241, 0.12)",
    headline: "Build stronger relationships with every interaction.",
    primaryMetric: "₹42.8L",
    primaryMetricLabel: "Sales pipeline",
    metrics: [
      { label: "Pipeline", value: "₹42.8L", change: "+18.4%" },
      { label: "Leads", value: "1,842", change: "+12.6%" },
      { label: "Customers", value: "824", change: "+9.8%" },
      { label: "Conversion", value: "24.8%", change: "+3.2%" },
    ],
    features: ["Lead management", "Sales pipeline", "Customer profiles", "Follow-up tracking"],
    modules: ["Overview", "Leads", "Contacts", "Pipeline"],
    sampleRecords: [
      { name: "Acme Technologies", detail: "Enterprise lead", status: "Qualified", amount: "₹4.8L" },
      { name: "Bright Solutions", detail: "Website project", status: "Proposal", amount: "₹2.4L" },
      { name: "Nova Systems", detail: "Cloud services", status: "Negotiation", amount: "₹6.2L" },
      { name: "Vertex Digital", detail: "Software project", status: "New", amount: "₹1.8L" },
    ],
  },
  {
    slug: "learning-platform",
    number: "11",
    title: "Learning Platform",
    category: "Education",
    shortDescription: "An online learning and course management experience.",
    description:
      "A learning management system concept with course catalogues, student progress, lessons, instructors and completion tracking.",
    icon: "BookOpen",
    accent: "#A855F7",
    accentSoft: "rgba(168, 85, 247, 0.12)",
    headline: "Make learning accessible, engaging and measurable.",
    primaryMetric: "86%",
    primaryMetricLabel: "Course completion",
    metrics: [
      { label: "Learners", value: "8,420", change: "+18.2%" },
      { label: "Courses", value: "124", change: "+8 new" },
      { label: "Completion", value: "86%", change: "+4.8%" },
      { label: "Instructors", value: "48", change: "+6 new" },
    ],
    features: ["Course catalogue", "Lesson management", "Progress tracking", "Instructor profiles"],
    modules: ["Overview", "Courses", "Learners", "Progress"],
    sampleRecords: [
      { name: "Full-stack Development", detail: "Technology", status: "Active", amount: "84%" },
      { name: "UI/UX Fundamentals", detail: "Design", status: "Active", amount: "92%" },
      { name: "Cloud Computing", detail: "Technology", status: "Draft", amount: "68%" },
      { name: "Digital Marketing", detail: "Business", status: "Active", amount: "76%" },
    ],
  },
  {
    slug: "ai-applications",
    number: "12",
    title: "AI Applications",
    category: "AI & Automation",
    shortDescription: "Practical AI-powered interfaces and automation concepts.",
    description:
      "A collection of AI product interface concepts covering intelligent assistants, content workflows, automation and knowledge experiences. This demo uses sample interactions without a paid AI API.",
    icon: "BrainCircuit",
    accent: "#22D3EE",
    accentSoft: "rgba(34, 211, 238, 0.12)",
    headline: "Turn intelligent ideas into useful products.",
    primaryMetric: "2,840",
    primaryMetricLabel: "Tasks processed",
    metrics: [
      { label: "Tasks processed", value: "2,840", change: "+24.8%" },
      { label: "Workflows", value: "48", change: "+8 new" },
      { label: "Time saved", value: "186 hrs", change: "+18.2%" },
      { label: "Automations", value: "124", change: "Active" },
    ],
    features: ["AI assistant interface", "Workflow automation", "Knowledge workspace", "Content tools"],
    modules: ["Overview", "Assistant", "Workflows", "Knowledge"],
    sampleRecords: [
      { name: "Content assistant", detail: "Text generation demo", status: "Active", amount: "12 tasks" },
      { name: "Document helper", detail: "Knowledge workflow", status: "Active", amount: "28 tasks" },
      { name: "Lead automation", detail: "Business workflow", status: "Paused", amount: "8 tasks" },
      { name: "Support assistant", detail: "Customer support demo", status: "Active", amount: "42 tasks" },
    ],
  },
];

export const showcaseCategories = [
  "All",
  "Dashboard",
  "Website",
  "Portfolio",
  "Education",
  "Healthcare",
  "Commerce",
  "Services",
  "Real Estate",
  "Hospitality",
  "Business",
  "AI & Automation",
];

export function getShowcaseProject(slug: string) {
  return showcaseProjects.find((project) => project.slug === slug);
}
