/**
 * Central site configuration — single source of truth for company info,
 * navigation, services, testimonials, FAQs and SEO data.
 *
 * To rebrand this site, change the values here. Phone/email/areas/social
 * are referenced everywhere from this file.
 */

export const site = {
  name: "Hollett Landscaping",
  shortName: "Hollett",
  tagline: "Landscaping & Property Maintenance",
  legalName: "Hollett Landscaping & Property Maintenance LLC",
  url: "https://www.hollettlandscaping.com",
  phoneDisplay: "(555) 214-7890",
  phoneHref: "tel:+15552147890",
  email: "info@hollettlandscaping.com",
  emailHref: "mailto:info@hollettlandscaping.com",
  address: {
    street: "1240 Greenfield Road",
    city: "Oakwood",
    region: "Greater Tri-County Area",
    state: "PA",
    postal: "17101",
    country: "US",
  },
  hours: "Mon–Sat: 7:00 AM – 7:00 PM",
  foundedYear: 2009,
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    google: "https://google.com",
    youtube: "https://youtube.com",
  },
  // Approx. geo coordinates used for LocalBusiness schema (Oakwood, PA region)
  geo: {
    latitude: 40.2737,
    longitude: -76.8844,
  },
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Gallery", href: "#gallery" },
  { label: "Commercial", href: "#commercial" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
] as const;

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  image: string;
  features: string[];
};

export const services: Service[] = [
  {
    slug: "lawn-care",
    title: "Lawn Care",
    blurb: "Professional mowing, trimming, edging, and weekly maintenance.",
    description:
      "Crisp, healthy turf every week. We mow, trim, edge, and blow clean so your lawn always looks manicured.",
    image:
      "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Weekly & bi-weekly mowing",
      "Precision trimming & edging",
      "Lawn fertilization programs",
      "Seasonal aeration & overseeding",
    ],
  },
  {
    slug: "mulching",
    title: "Mulching",
    blurb:
      "Fresh mulch installation that enhances curb appeal and protects your landscape.",
    description:
      "Premium hardwood, dyed, and natural mulch installed with clean, defined bed edges that elevate your entire property.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Premium hardwood & dyed mulch",
      "Crisp, hand-cut bed edging",
      "Weed barrier installation",
      "Stone & decorative rock options",
    ],
  },
  {
    slug: "land-clearing",
    title: "Land Clearing",
    blurb:
      "Complete land and lot clearing for residential and commercial projects.",
    description:
      "From overgrown lots to full acreage, we clear, grade, and prep land for construction, agriculture, or a fresh start.",
    image:
      "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Lot & acreage clearing",
      "Skid steer & heavy equipment",
      "Stump & root removal",
      "Site grading & prep",
    ],
  },
  {
    slug: "brush-removal",
    title: "Brush Removal",
    blurb: "Efficient removal of brush, overgrowth, and unwanted vegetation.",
    description:
      "Reclaim your property. We safely remove brush, overgrowth, and unwanted vegetation and haul it all away.",
    image:
      "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Brush & overgrowth removal",
      "Fence-line & tree-line clearing",
      "Debris hauling & disposal",
      "Overgrown property reclamation",
    ],
  },
  {
    slug: "snow-removal",
    title: "Snow Removal",
    blurb:
      "Reliable winter maintenance for driveways, parking lots, and walkways.",
    description:
      "Dependable 24/7 winter response. We plow, shovel, and salt so your property stays safe and accessible all season.",
    image:
      "https://images.unsplash.com/photo-1486825586573-7131f7991bdd?auto=format&fit=crop&w=1200&q=80",
    features: [
      "24/7 storm response",
      "Plowing & snow hauling",
      "Walkway shoveling",
      "Ice control & salting",
    ],
  },
  {
    slug: "property-cleanups",
    title: "Property Cleanups",
    blurb: "Spring and fall cleanups to keep your property looking pristine.",
    description:
      "Seasonal resets that keep your property pristine — leaf removal, bed cleanups, and a full property refresh.",
    image:
      "https://images.unsplash.com/photo-1508692522281-9dc8b2178c0e?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Spring & fall cleanups",
      "Leaf removal & hauling",
      "Flower bed cleanup",
      "Gutter & debris clearing",
    ],
  },
];

// Full service list (for footer / schema / internal linking)
export const allServices = [
  "Lawn Mowing & Grass Cutting",
  "Mulch Installation",
  "Landscape Maintenance",
  "Property Cleanup",
  "Brush Removal",
  "Lot Clearing",
  "Land Clearing",
  "Skid Steer Services",
  "Snow Removal",
  "Spring Cleanup",
  "Fall Cleanup",
  "Hedge & Shrub Trimming",
  "Commercial Property Maintenance",
  "Residential Property Maintenance",
] as const;

export const whyUs = [
  {
    title: "Professional Equipment",
    body: "Commercial-grade mowers, skid steers, and tools maintained to deliver a flawless finish on every job.",
    icon: "tools",
  },
  {
    title: "Experienced Team",
    body: "Skilled, uniformed crews who treat your property with the care and respect it deserves.",
    icon: "users",
  },
  {
    title: "Fast Response Times",
    body: "Quick quotes, on-time arrivals, and reliable scheduling you can actually count on.",
    icon: "bolt",
  },
  {
    title: "Transparent Pricing",
    body: "Clear, upfront estimates with no hidden fees or surprise charges — ever.",
    icon: "tag",
  },
  {
    title: "Fully Insured",
    body: "Comprehensive liability and workers' coverage so you're protected on every project.",
    icon: "shield",
  },
  {
    title: "5-Star Customer Service",
    body: "Responsive communication and a 100% satisfaction focus that keeps clients coming back.",
    icon: "star",
  },
];

export const stats = [
  { value: "500+", label: "Properties Maintained" },
  { value: "5-Star", label: "Rated Service" },
  { value: "100%", label: "Satisfaction Focused" },
  { value: "15+", label: "Years of Experience" },
];

export const process = [
  {
    step: "01",
    title: "Request Quote",
    body: "Call us or fill out our quick form. Tell us about your property and what you need.",
  },
  {
    step: "02",
    title: "Receive Estimate",
    body: "We assess your property and send a clear, no-obligation written estimate fast.",
  },
  {
    step: "03",
    title: "Schedule Service",
    body: "Approve your quote and we lock in a service date that works for your schedule.",
  },
  {
    step: "04",
    title: "Enjoy Your Property",
    body: "Our crew delivers premium results — and keeps your property looking its best.",
  },
];

export type Testimonial = {
  name: string;
  location: string;
  service: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    location: "Oakwood",
    service: "Weekly Lawn Care",
    rating: 5,
    quote:
      "Hollett has maintained our lawn for two years and it's never looked better. They show up like clockwork every week and the edging is immaculate. Truly reliable.",
  },
  {
    name: "James R.",
    location: "Riverside",
    service: "Mulch Installation",
    rating: 5,
    quote:
      "The mulch and bed-edging transformed our front yard. Fair quote, finished in a day, and they cleaned up so well you'd never know a crew was here. Highly recommend.",
  },
  {
    name: "Property Mgmt Group",
    location: "Cedar Falls",
    service: "Commercial Maintenance",
    rating: 5,
    quote:
      "We manage six retail properties and Hollett handles all of them. Communication is excellent and the grounds always look sharp for our tenants. A true partner.",
  },
  {
    name: "Linda & Tom K.",
    location: "Maple Heights",
    service: "Land Clearing",
    rating: 5,
    quote:
      "They cleared a half-acre of overgrown brush and stumps that two other companies wouldn't touch. Professional, well-equipped, and the price was exactly what they quoted.",
  },
  {
    name: "Michael D.",
    location: "Stonebridge",
    service: "Snow Removal",
    rating: 5,
    quote:
      "During the big storm our driveway was plowed before sunrise without us even calling. That kind of dependability in winter is worth every penny. Outstanding service.",
  },
  {
    name: "Greenview HOA",
    location: "Fairview",
    service: "Fall Cleanup",
    rating: 5,
    quote:
      "Our fall cleanup covered 40+ homes and the crew was efficient, courteous, and thorough. Residents commented on how great the neighborhood looked. We've renewed for next year.",
  },
];

export const commercialClients = [
  {
    title: "HOAs & Communities",
    body: "Consistent, association-wide grounds care that keeps property values high and residents happy.",
  },
  {
    title: "Property Managers",
    body: "One reliable vendor for every property in your portfolio, with proactive communication.",
  },
  {
    title: "Retail Properties",
    body: "Sharp, welcoming exteriors and clean parking areas that bring customers through the door.",
  },
  {
    title: "Office Buildings",
    body: "Professional curb appeal year-round, from manicured lawns to dependable snow removal.",
  },
  {
    title: "Industrial Sites",
    body: "Large-scale maintenance, lot clearing, and vegetation management for demanding sites.",
  },
];

export const serviceAreas = [
  "Oakwood",
  "Riverside",
  "Cedar Falls",
  "Maple Heights",
  "Stonebridge",
  "Fairview",
  "Greenville",
  "Westfield",
  "Pinehurst",
  "Brookside",
  "Lakeview",
  "Hampton",
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much does landscaping or lawn care cost?",
    a: "Every property is different, so we provide free, customized estimates. Pricing depends on lot size, the services you need, and how often. Most weekly lawn maintenance plans start affordably, and we'll always give you a clear, upfront price before any work begins — no hidden fees.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes — all of our estimates are 100% free and come with no obligation. Call us or fill out our quote form and we'll assess your property and send a written estimate quickly.",
  },
  {
    q: "How quickly can you schedule my service?",
    a: "For most standard services like lawn care, mulching, and cleanups we can typically get you on the schedule within a few days. Snow removal and larger land-clearing projects are scheduled based on conditions and scope, and we'll always give you a realistic timeline up front.",
  },
  {
    q: "Are you fully insured?",
    a: "Absolutely. We carry full liability insurance and workers' compensation coverage. You're completely protected on every job, whether it's a residential lawn or a large commercial site.",
  },
  {
    q: "Do you service both residential and commercial properties?",
    a: "Yes. We work with homeowners as well as HOAs, property managers, retail centers, office buildings, and industrial sites. Commercial clients can set up seasonal or annual maintenance contracts.",
  },
  {
    q: "What areas do you serve?",
    a: "We proudly serve Oakwood, Riverside, Cedar Falls, Maple Heights, Stonebridge, Fairview, and surrounding communities across the Greater Tri-County Area. Not sure if you're in our zone? Give us a call — we likely cover you.",
  },
  {
    q: "How does snow removal work and when do you respond?",
    a: "We offer 24/7 winter response for driveways, walkways, and parking lots. Seasonal contract clients get priority service, and we monitor storms closely so your property is cleared and salted before you even need to ask.",
  },
  {
    q: "How often should my lawn be mowed?",
    a: "During the active growing season, most lawns look best with weekly mowing. In slower-growth periods we can move to bi-weekly. We'll recommend a schedule that keeps your turf healthy and looking its best.",
  },
  {
    q: "What kind of mulch do you install, and how often should it be refreshed?",
    a: "We install premium hardwood, dyed, and natural mulches, plus decorative stone. Most properties benefit from a fresh mulch application once a year — typically in spring — to protect plants, retain moisture, suppress weeds, and boost curb appeal.",
  },
  {
    q: "Do you handle land and lot clearing?",
    a: "Yes. We clear everything from small overgrown lots to multi-acre parcels using skid steers and heavy equipment. We handle brush, stumps, root removal, and site grading to prep your land for whatever comes next.",
  },
  {
    q: "Can you remove brush, overgrowth, and yard debris?",
    a: "Definitely. We remove brush, overgrowth, fallen limbs, and unwanted vegetation, then haul everything away and dispose of it properly so you're left with a clean, usable space.",
  },
  {
    q: "What's included in spring and fall cleanups?",
    a: "Spring cleanups typically include bed cleanouts, debris removal, fresh edging, and prepping your landscape for the season. Fall cleanups focus on leaf removal, cutting back perennials, and clearing your property before winter sets in.",
  },
  {
    q: "Do you offer recurring maintenance plans or one-time services?",
    a: "Both. Many clients choose recurring weekly or bi-weekly maintenance for hands-off, year-round care, but we're happy to handle one-time projects like cleanups, mulch installs, or clearing jobs as well.",
  },
  {
    q: "How do I pay, and do you require a contract?",
    a: "We keep it simple and flexible. One-time jobs are billed on completion, and recurring or commercial clients can set up convenient monthly billing. Seasonal contracts are available but never required for residential work.",
  },
  {
    q: "What makes Hollett Landscaping different from other companies?",
    a: "We combine professional, commercial-grade equipment with an experienced, reliable crew and genuinely transparent pricing. We show up when we say we will, communicate clearly, and treat every property like it's our own. Our 5-star reputation is built on dependability.",
  },
];
