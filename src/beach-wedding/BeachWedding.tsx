import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Heart,
  MapPin,
  Waves,
  X,
  BedDouble,
  Users,
  Camera,
  Ship,
} from "lucide-react";

/* ── Inline UI primitives (replacing shadcn/ui) ── */

function Button({
  children,
  className = "",
  variant,
  size,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "icon";
  onClick?: (e: React.MouseEvent) => void;
}) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors cursor-pointer focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  const sizeClass = size === "icon" ? "h-9 w-9 p-0" : "h-10 px-4 py-2 text-sm";
  const variantClass = variant === "outline" ? "border bg-transparent" : "";
  return (
    <button type="button" onClick={onClick} className={`${base} ${sizeClass} ${variantClass} ${className}`}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border bg-stone-900 text-stone-100 shadow ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

const AccordionContext = createContext<string[]>([]);

function Accordion({
  children,
  className = "",
  defaultValue = [],
}: {
  children: ReactNode;
  type?: string;
  defaultValue?: string[];
  className?: string;
}) {
  return (
    <AccordionContext.Provider value={defaultValue}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  children,
  className = "",
  value,
}: {
  children: ReactNode;
  value: string;
  className?: string;
}) {
  const defaultValue = useContext(AccordionContext);
  const [open, setOpen] = useState(defaultValue.includes(value));
  return (
    <div className={className} data-state={open ? "open" : "closed"}>
      {typeof children === "object" && Array.isArray(children)
        ? children.map((child, i) => {
            if (child?.type === AccordionTrigger) {
              return <AccordionTrigger key={i} {...child.props} open={open} onToggle={() => setOpen(!open)} />;
            }
            if (child?.type === AccordionContent) {
              return open ? <AccordionContent key={i} {...child.props} /> : null;
            }
            return child;
          })
        : children}
    </div>
  );
}

function AccordionTrigger({
  children,
  className = "",
  open = true,
  onToggle,
}: {
  children: ReactNode;
  className?: string;
  open?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-center justify-between py-4 text-left font-medium transition-all ${className}`}
    >
      {children}
      <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

function AccordionContent({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden">{children}</div>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const venues = [
  {
    id: "fimi-island",
    name: "Fimi Island",
    area: "Göcek Island",
    score: "Private Island Experience",
    mood: "Most exclusive and cinematic",
    summary:
      "A fully private island setting with a timeless, cinematic atmosphere. One of the most visually striking and self-contained options.",
    fit:
      "Ideal for couples who want the wedding to feel like its own destination: boat arrival, open sea views, and a private sunset dinner.",
    bestFor: ["Private island vibe", "Boat arrival", "Sunset dinner", "Beach after-party"],
    accommodationOptions: [
      "Luxury yachts for part of the guest group",
      "Boutique hotels in Göcek for the remaining guests",
      "Private villas in Göcek for larger groups",
    ],
    experienceHighlights: [
      "Boat arrival to the island",
      "Ceremony overlooking the sea",
      "Long-table dinner under the sunset",
      "Beach after-party",
    ],
    capacityLines: [
      "Event: 30–150 pax",
      "On-island stay: no fixed accommodation",
      "Yacht stay: 12–20 pax",
      "Göcek hotel support: flexible",
    ],
    facts: [
      "Fimi Island presents weddings and organizations on its official site",
      "The island is described as 10 minutes from Göcek by Zodiac boat",
      "The property states 8,000 m² private area and 300 meters of beach",
      "Its events page shows past wedding activity",
    ],
    caution:
      "This is a high-drama concept, but accommodation is off-island. Guest transfer planning and weather-sensitive logistics need to be handled with precision.",
    logistics: [
      "Lead with this when exclusivity and wow-factor matter most",
      "Strongest visual narrative for a reveal presentation",
      "Needs clean guest transport and arrival choreography",
    ],
    contact: "+90 535 251 52 39",
    links: [
      { label: "Website", url: "https://www.fimiisland.com/en" },
      { label: "Instagram", url: "https://www.instagram.com/fimi.island/" },
    ],
    images: [
      "https://www.fimiisland.com/assets/tpl/img/hero_home_1.jpg",
      "https://www.fimiisland.com/assets/tpl/img/organization/event-1.jpg",
      "https://www.fimiisland.com/assets/tpl/img/home_2.jpg",
      "https://www.fimiisland.com/assets/tpl/img/fimi_home_2.jpg",
      "https://www.fimiisland.com/assets/tpl/img/restaurant/fimi3.jpg",
      "https://www.fimiisland.com/assets/uploads/fimi-island-restaurant.jpg",
      "https://www.fimiisland.com/assets/tpl/img/restaurant/fimi6.jpg",
      "https://www.fimiisland.com/assets/tpl/img/organization/event-10.jpg",
    ],
  },
  {
    id: "perdue-rups",
    name: "Perdue Hotel + Rups Bar",
    area: "Faralya",
    score: "Boutique Luxury",
    mood: "Intimate, serene, boutique-style romance",
    summary:
      "An intimate, design-led setting that balances elegance with energy: boutique wedding mood at Perdue, then a nightlife shift into Rups for the after-party.",
    fit:
      "Best for couples who want a romantic, design-led, emotionally warm wedding story.",
    bestFor: ["Boutique wedding", "Cliffside romance", "Terrace dinner", "Moonlit after-party"],
    accommodationOptions: [
      "Full buyout of Perdue Hotel for the main guest group",
      "Nearby villas or boutique hotels for remaining guests",
      "Additional accommodations within easy reach of the venue",
    ],
    experienceHighlights: [
      "Ceremony and dinner at Perdue terrace",
      "After-party at Rups with private / VIP setup",
      "Flowing from romantic cliffside terrace moments to a more vibrant late-night celebration",
    ],
    capacityLines: [
      "Perdue stay: ~20–24 pax",
      "Perdue event: 30–50 pax",
      "Rups after-party: 50–150 pax",
    ],
    facts: [
      "Perdue has an official Weddings & Honeymoons concept page",
      "Perdue's story page describes the property as an 11-room boutique hotel",
      "Rups officially describes itself as a cliffside bar/restaurant with DJ-led night energy",
      "Both are in the Faralya area, which helps create a coherent experience story",
    ],
    caution:
      "This option depends on dual-venue coordination. The handoff from Perdue to Rups should feel intentional, not like a venue change that breaks the mood.",
    logistics: [
      "Great option when intimacy matters more than maximum privacy",
      "Very strong for a refined but not overly formal wedding identity",
      "Confirm buyout terms, event permissions, and transport between the two points",
    ],
    contact: "Perdue: +90 252 614 00 91 · Rups: +90 544 429 27 40",
    links: [
      { label: "Perdue Website", url: "https://www.perdue.com.tr/en" },
      { label: "Perdue Instagram", url: "https://www.instagram.com/perduehotel/" },
      { label: "Perdue weddings", url: "https://perdue.com.tr/en/concept/weddings-honeymoons" },
      { label: "Rups Website", url: "https://rups.com.tr/en/home/" },
      { label: "Rups Instagram", url: "https://www.instagram.com/rupsbythesea/" },
    ],
    images: [
      "https://perdue.com.tr/wp-content/uploads/2023/05/perdue-butik-dugun-kutlamalari.jpg",
      "https://perdue.com.tr/wp-content/uploads/2020/04/4-1-scaled.jpg",
      "https://perdue.com.tr/wp-content/uploads/2023/05/Perdue-1.webp",
      "https://perdue.com.tr/wp-content/uploads/2021/05/Perdue-En-Guzel-Sekilde-Agirlaniyorsunuz.webp",
      "https://perdue.com.tr/wp-content/uploads/2021/05/Perdue-en-iyi-balayi-oteli-.webp",
      "https://perdue.com.tr/wp-content/uploads/2024/03/Perdue-Restoran1.jpg",
      "https://perdue.com.tr/wp-content/uploads/2025/04/restaurant1.jpg",
      "https://rups.com.tr/wp-content/uploads/2023/09/rups-galeri1.jpg",
    ],
  },
  {
    id: "yazz-collective",
    name: "Yazz Collective",
    area: "Fethiye Peninsula",
    score: "Creative Beach Luxury",
    mood: "Stylish and modern with strong design potential",
    summary:
      "A design-led beach destination with the privacy and atmosphere that gives a high-end feeling when shaped through strong production, styling, and a well-considered guest experience.",
    fit:
      "For couples who want a modern, fashion-led beach atmosphere with the flexibility to shape the space through design and custom details.",
    bestFor: ["Design-led wedding", "Secluded beach setting", "Full-day celebration", "Modern luxury"],
    accommodationOptions: [
      "Luxury villas in Kayaköy or Faralya area",
      "Hillside Beach Club as a premium hotel option",
      "Private yachts for selected guests",
    ],
    experienceHighlights: [
      "Ceremony on wooden deck or structured zones",
      "Dinner by the sea",
      "After-party in the same venue",
    ],
    capacityLines: [
      "Event: 40–120 pax",
      "On-site stay: no fixed accommodation",
    ],
    facts: [
      "Yazz Collective presents wedding receptions and exclusive events officially",
      "Its celebrations page emphasizes utmost privacy",
      "Its location page states the venue is accessible only by boat",
      "Its villa inventory includes premium villa products for private-stay layering",
    ],
    caution:
      "Boat-only access creates magic, but also adds transfer complexity. It should be sold as a consciously curated hidden-destination experience, not a simple beach venue.",
    logistics: [
      "Very strong visual storytelling option",
      "Works best with custom floral, furniture, and lighting direction",
      "Should be paired with carefully chosen accommodation logistics",
    ],
    contact: "+90 530 277 92 99",
    links: [
      { label: "Yazz Website", url: "https://yazzcollective.com/" },
      { label: "Yazz Instagram", url: "https://www.instagram.com/yazzcollective" },
    ],
    images: [
      "https://yazzcollective.com/wp-content/uploads/2023/10/r1.jpg",
      "https://yazzcollective.com/wp-content/uploads/2023/10/r2.jpg",
      "https://yazzcollective.com/wp-content/uploads/2023/10/r3.jpg",
      "https://yazzcollective.com/wp-content/uploads/2023/10/r7.jpg",
      "https://yazzcollective.com/wp-content/uploads/2025/07/pv__0010_premium_villa_p10.jpg",
      "https://yazzcollective.com/wp-content/uploads/2023/10/celebrations_r1.jpg",
      "https://yazzcollective.com/wp-content/uploads/2025/06/restaurant_evening.jpg",
      "https://yazzcollective.com/wp-content/uploads/2023/10/r5.jpg",
    ],
  },
  {
    id: "gokce-gemile",
    name: "Gökçe Gemile Private Bay",
    area: "Kayaköy / private peninsula",
    score: "Private Estate Experience",
    mood: "Complete privacy with seamless logistics",
    summary:
      "A fully private villa-estate concept offering comfort, privacy, and a hosted-house feeling.",
    fit:
      "For couples who value privacy and a more intimate, hosted feel - ideal for a luxury celebration with a close group of guests.",
    bestFor: ["Fully private villa", "Private beach", "Garden dinner", "Villa after-party"],
    accommodationOptions: [
      "Main villa capacity for the core group",
      "Nearby villas for remaining guests",
      "Hillside Beach Club or a yacht as a hotel alternative",
    ],
    experienceHighlights: [
      "Ceremony on terrace or poolside",
      "Dinner in the garden",
      "Private villa after-party",
    ],
    capacityLines: [
      "Villa stay: 20–25 pax",
      "Event: 30–50 pax",
    ],
    facts: [
      "The official site describes the estate as three private stone villas on an isolated peninsula",
      "The property positions itself around high privacy and rare seclusion",
      "Villa Gökçe and Villa Gemile each accommodate up to 9 guests officially",
      "The book/enquire page presents the entire estate as sleeping up to 24 guests",
    ],
    caution:
      "This is less of a classic venue and more of a private-estate world. It works best for smaller guest counts and couples who value ownership of the whole environment.",
    logistics: [
      "Excellent option for privacy-first buyers",
      "Strong fit for a calm, luxurious, all-under-control celebration",
      "Image delivery from the official site is less clean than other venues, so some visuals may need manual curation later",
    ],
    contact: "+90 505 996 64 36",
    links: [
      { label: "Website", url: "https://gokcegemile.com/" },
      { label: "Villas", url: "https://gokcegemile.com/villas" },
      { label: "Instagram", url: "https://www.instagram.com/gokcegemile/" },
    ],
    images: [
      "https://gokcegemile.com/i/1500/0/img/about/gokce-gemile-about-681cf813832a0.jpg",
      "https://gokcegemile.com/i/1500/0/img/gallery/villas/villa-gokce/villa-gokce-aerial-estate-panorama-stone-pool-0598.jpg",
      "https://gokcegemile.com/i/1500/0/img/gallery/villas/villa-gokce/villa-gokce-sunset-pool-forest-bay-reflection-0582.jpg",
      "https://gokcegemile.com/i/1500/0/img/home/gokce-gemile-home-696cc3889ca7e.jpg",
      "https://gokcegemile.com/i/1500/0/img/home/gokce-gemile-home-696cd3e4d5581.jpg",
      "https://gokcegemile.com/i/1500/0/img/gallery/experiences/wedding-and-celebrations/gokce-gemile-wedding-beach-aisle-evening-setup-0245.jpg",
      "https://gokcegemile.com/i/1500/0/img/gallery/experiences/wedding-and-celebrations/gokce-gemile-wedding-bridal-bouquet-sunset-seaside-0246.jpg",
      "https://gokcegemile.com/i/1500/0/img/gallery/home-page/gokce-gemile-outdoor-stone-dining-area-sea-view-0289.jpg",
    ],
  },
  {
    id: "the-bay-beach-club",
    name: "The Bay Beach Club",
    area: "Günlüklü Bay",
    score: "Secluded Beach Experience",
    mood: "Relaxed vibe with flexible celebration setup",
    summary:
      "A hidden bay with a natural yet refined atmosphere. This is a flexible canvas that can be shaped into either a soft, romantic celebration or a more immersive experience.",
    fit:
      "Best choice for couples who prefer a laid-back, natural bay atmosphere with the freedom to shape ceremony and celebration in their own way.",
    bestFor: ["Hidden bay", "Custom event design", "Beach party", "Flexible stay options"],
    accommodationOptions: [
      "On-site rooms, bungalows, suites and premium villas",
      "Nearby luxury villas",
      "Private yachts, domes, or caravans as alternative stays",
    ],
    experienceHighlights: [
      "Ceremony on deck or custom-built platform",
      "Dinner on the beach with structured setup",
      "Beach party under the stars",
    ],
    capacityLines: [
      "Event: 50–150 pax",
      "On-site stay: ~100 pax",
    ],
    facts: [
      "The official site includes a dedicated wedding page",
      "The property states it sits in Günlüklü Koyu on a 50,000 m² hotel area within a 300,000 m² controlled zone",
      "Officially listed distance: 38 km to Dalaman Airport, 10 km to Göcek, 17 km to Fethiye",
      "The site lists 51 accommodation units including rooms, bungalows, suites, and 5 premium villas with private pools",
    ],
    caution:
      "This is not automatically luxury-looking in the Aya sense. It becomes strong through design direction, spatial styling, and careful scene-building.",
    logistics: [
      "Use when the client is open to a more natural hidden-bay story",
      "Good for production-led transformation",
      "Worth exploring when flexibility matters more than immediate editorial polish",
    ],
    contact: "+90 532 171 12 15",
    links: [
      { label: "Website", url: "https://www.thebaybeachclub.com/en/" },
    ],
    images: [
      "https://www.thebaybeachclub.com/uploads/842_d.jpg",
      "https://www.thebaybeachclub.com/uploads/965_7697cc0d-3082-46f6-9cee-3b272f6b60f4.jpg",
      "https://www.thebaybeachclub.com/uploads/649_c069991a-7869-437f-8862-5a3ce698b110.jpg",
      "https://www.thebaybeachclub.com/uploads/307_60f3df6e-b9a6-4f1c-9c40-48ac7f1bea7e.jpg",
      "https://www.thebaybeachclub.com/uploads/929_4.jpg",
      "https://www.thebaybeachclub.com/uploads/814_2.jpg",
      "https://www.thebaybeachclub.com/uploads/14_8.jpg",
      "https://lh3.googleusercontent.com/gps-cs-s/AHVAweo98EbU-qiVTqaGpgA8K889hepi8Mr6wo5HWLP5gTnpUKnF2E4wlLGrvco5HLlR3FlZfhdgPPgFr1cUclDwStLLVZwmLY-xWO2dHN_hiDBXPYIwAyYHLvGGv8WGrIn-zGtMlpyiAceMb9ez=s3072-v1",
    ],
  },
  {
    id: "hillside-beach-club",
    name: "Hillside Beach Club",
    area: "Kalemya Bay, Fethiye",
    score: "Main accommodation hub",
    mood: "Premium hotel anchor for guests and VIP stays",
    summary:
      "A premium hotel solution best suited for guest accommodation, hosted stays, or supporting nearby venues.",
    fit:
      "Best suited as a premium accommodation base and VIP stay, not as the main wedding venue.",
    bestFor: ["Guest accommodation hub", "Comfort and privacy", "Luxury hotel stay", "Secluded bay-view retreat"],
    accommodationOptions: [
      "100+ guests",
      "Works well as a main guest base",
    ],
    experienceHighlights: [
      "Hosted stay experience",
      "Beachside setting and bay views",
      "Designed to support a relaxed, well-paced wedding weekend",
    ],
    capacityLines: [
      "Stay: 100+ pax",
    ],
    facts: [
      "Hillside is positioned in Kalemya Bay with a secluded private-bay identity",
      "Its official site includes special events, honeymoons, and extensive gallery sections",
      "It is useful as a polished accommodation backbone for nearby wedding concepts",
    ],
    caution:
      "Beautiful, but less directly aligned with Aya's old-European-coastal, highly private, refined-exclusivity brief than the lead options above.",
    logistics: [
      "Excellent support property",
      "Good for guest comfort, transfers, and premium stay confidence",
      "Better as hub than hero concept in this shortlist",
    ],
    contact: "+90 212 362 30 30",
    links: [
      { label: "Website", url: "https://www.hillsidebeachclub.com/en" },
      { label: "Gallery", url: "https://www.hillsidebeachclub.com/en/gallery" },
      { label: "Instagram", url: "https://www.instagram.com/hillsidebeachclub/" },
    ],
    images: [
      "https://storage.googleapis.com/hillsidebeachclub/uploads/gallery/image/original/the-vibrant-colors.jpg?=e9cca16b59536cc15a97e9ed782ba47a",
      "https://storage.googleapis.com/hillsidebeachclub/uploads/gallery/image/original/silent-night.jpg?=e9cca16b59536cc15a97e9ed782ba47a",
      "https://storage.googleapis.com/hillsidebeachclub/uploads/gallery/image/original/silent-beach-2.jpg?=1318502f2e88b701a17e6fc53eabdbe9",
      "https://storage.googleapis.com/hillsidebeachclub/uploads/gallery/image/original/sunset-dinner-near-sea.jpg",
      "https://storage.googleapis.com/hillsidebeachclub/uploads/gallery/image/original/alfresco-dining-in-fethiye.jpg",
      "https://storage.googleapis.com/hillsidebeachclub/uploads/page/image/original/balayi-51.jpg",
      "https://images.hellomagazine.com/horizon/original_aspect_ratio/36f928dd7fcb-hillside-beach-club-private-beach-z.jpg",
      "https://storage.googleapis.com/hillsidebeachclub/uploads/gallery/image/original/young-couple-dining-at-pasha-restaurant.jpg",
    ],
  },
];

const weekendFlow = [
  {
    title: "Arrival & Hosting",
    text: "Guests arrive into a world that already feels curated — whether by yacht, in a boutique hotel, a private villa, or a premium hotel with well-organized transfers.",
  },
  {
    title: "Ceremony & Dinner",
    text: "The central moment feels clear and intentional: a sea-view ceremony, a natural flow into dinner, sunset light, and a setting elevated by thoughtful design.",
  },
  {
    title: "After-Party & The Morning After",
    text: "Whether it continues on the beach, a terrace, in a private villa, or a cliffside bar, the evening flows naturally — carrying the same atmosphere rather than shifting into something separate.",
  },
];

export default function AyaWowWeddingTemplate() {
    const [featuredId, setFeaturedId] = useState(venues[0].id);
  const [selectedId, setSelectedId] = useState(venues[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const heroRef = useRef(null);
  const shortlistRef = useRef(null);
  const detailRef = useRef(null);
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const shortlistSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroSliderRef.current;
    if (el) el.scrollLeft = el.scrollWidth / 3;
    const el2 = shortlistSliderRef.current;
    if (el2) el2.scrollLeft = el2.scrollWidth / 3;
  }, []);

  const handleSliderScroll = useCallback(() => {
    const el = heroSliderRef.current;
    if (!el) return;
    const segmentWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= segmentWidth * 2) {
      el.scrollLeft -= segmentWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += segmentWidth;
    }
  }, []);

  const handleShortlistScroll = useCallback(() => {
    const el = shortlistSliderRef.current;
    if (!el) return;
    const segmentWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= segmentWidth * 2) {
      el.scrollLeft -= segmentWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += segmentWidth;
    }
  }, []);

  const scrollShortlistNext = () => {
    shortlistSliderRef.current?.scrollBy({ left: 244, behavior: "smooth" });
  };

  const scrollShortlistPrev = () => {
    shortlistSliderRef.current?.scrollBy({ left: -244, behavior: "smooth" });
  };

  const featuredVenue = useMemo(
    () => venues.find((venue) => venue.id === featuredId) ?? venues[0],
    [featuredId]
  );

  const selectedVenue = useMemo(
    () => venues.find((venue) => venue.id === selectedId) ?? venues[0],
    [selectedId]
  );

  const selectedVenueIndex = venues.findIndex((venue) => venue.id === selectedVenue.id);
  const selectedImages = selectedVenue.images.length ? selectedVenue.images : [""];
  const activeImage = selectedImages[activeImageIndex] ?? selectedImages[0];

  const scrollToShortlist = () => {
    shortlistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToDetails = () => {
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelectVenue = (venueId, shouldScroll = true) => {
    setSelectedId(venueId);
    setActiveImageIndex(0);
    setFeaturedId(venueId);
    if (shouldScroll) {
      window.setTimeout(() => {
        scrollToDetails();
      }, 60);
    }
  };

  const syncVenueEverywhere = (venueId) => {
    setSelectedId(venueId);
    setFeaturedId(venueId);
    setActiveImageIndex(0);
  };

  const heroNextVenue = () => {
    const nextIndex = (selectedVenueIndex + 1) % venues.length;
    syncVenueEverywhere(venues[nextIndex].id);
  };

  const heroPrevVenue = () => {
    const prevIndex = (selectedVenueIndex - 1 + venues.length) % venues.length;
    syncVenueEverywhere(venues[prevIndex].id);
  };

  const scrollSliderNext = () => {
    heroSliderRef.current?.scrollBy({ left: 296, behavior: "smooth" });
  };

  const scrollSliderPrev = () => {
    heroSliderRef.current?.scrollBy({ left: -296, behavior: "smooth" });
  };


  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % selectedImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
  };

  const nextLightboxImage = (e) => {
    e?.stopPropagation?.();
    nextImage();
    setLightboxImage(selectedImages[(activeImageIndex + 1) % selectedImages.length]);
  };

  const prevLightboxImage = (e) => {
    e?.stopPropagation?.();
    const nextIndex = (activeImageIndex - 1 + selectedImages.length) % selectedImages.length;
    setActiveImageIndex(nextIndex);
    setLightboxImage(selectedImages[nextIndex]);
  };

  const openLightboxAt = (index) => {
    setActiveImageIndex(index);
    setLightboxImage(selectedImages[index]);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-white/20">
      <section ref={heroRef} className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_35%),linear-gradient(180deg,rgba(255,248,240,0.08),rgba(0,0,0,0.6))]" />
        <div className="absolute inset-0 opacity-25">
          <AnimatePresence mode="wait">
            <motion.img
              key={featuredVenue.id + "-hero-bg"}
              src={featuredVenue.images[0]}
              alt={featuredVenue.name}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.06, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -24 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-amber-100/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-orange-200/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <motion.h1
                initial="hidden"
                animate="visible"
                custom={1}
                variants={fadeUp}
                className="max-w-4xl text-5xl font-light leading-[1.02] tracking-[-0.04em] text-white md:text-7xl"
              >
                A coastal wedding,
                <span className="block text-stone-300">designed around your vision.</span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeUp}
                className="max-w-2xl text-lg leading-8 text-stone-200 md:text-xl"
              >
                An overview of seaside wedding venues curated for your celebration in Fethiye, Turkey. Private islands, boutique cliffside hotels, and secluded bays for an unforgettable destination wedding.
              </motion.p>
            </div>

            <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="flex flex-wrap gap-3">
              <Button onClick={scrollToShortlist} className="rounded-full bg-white px-6 text-stone-950 hover:bg-stone-200">
                Explore details below
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={4}
              variants={fadeUp}
              className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-sm text-stone-200"
            >
              <div className="flex items-center gap-2"><Heart className="h-4 w-4" /> 30–40 guests</div>
              <div className="flex items-center gap-2"><Waves className="h-4 w-4" /> Private seaside setting</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Fethiye / Göcek / Faralya</div>
            </motion.div>
          </div>

          <motion.div
            key={featuredVenue.id + "-hero-card"}
            initial={{ opacity: 0, scale: 0.97, y: 18, x: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-white/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-black/20 p-4 shadow-2xl backdrop-blur-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10">
                <img src={featuredVenue.images[0]} alt={featuredVenue.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.0),rgba(0,0,0,0.68))]" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={heroPrevVenue}
                    className="rounded-full border-white/20 bg-black/30 text-white backdrop-blur hover:bg-white/10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={heroNextVenue}
                    className="rounded-full border-white/20 bg-black/30 text-white backdrop-blur hover:bg-white/10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute inset-x-0 bottom-0 space-y-4 p-6">
                  <div className="inline-flex rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.24em] text-stone-100 backdrop-blur">
                    {featuredVenue.score}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-light leading-tight text-white md:text-4xl">{featuredVenue.name}</h2>
                    <p className="max-w-md text-sm leading-7 text-stone-200/90">{featuredVenue.summary}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-stone-200/85">
                    <Camera className="h-4 w-4" />
                    {featuredVenue.mood}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative mx-auto mt-2 max-w-7xl px-6 pb-12 lg:px-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div />
            <div className="hidden items-center gap-2 md:flex">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollSliderPrev}
                className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollSliderNext}
                className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div ref={heroSliderRef} onScroll={handleSliderScroll} className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[...venues, ...venues, ...venues].map((venue, index) => {
              const isHeroActive = venue.id === featuredVenue.id;
              return (
                <button
                  key={venue.id + "-hero-slide-" + index}
                  type="button"
                  onClick={() => syncVenueEverywhere(venue.id)}
                  className={`group min-w-[240px] cursor-pointer overflow-hidden rounded-[1.4rem] border text-left transition-all duration-300 md:min-w-[280px] ${isHeroActive ? "border-white/30 bg-white/[0.08] shadow-2xl shadow-black/20" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                    <img src={venue.images[0]} alt={venue.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.0),rgba(0,0,0,0.62))]" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
                      {venue.score}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-stone-300">{venue.area}</div>
                      <div className="mt-1 text-lg font-light text-white">{venue.name}</div>
                    </div>
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="line-clamp-3 text-sm leading-6 text-stone-300">{venue.summary}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
          className="mx-auto max-w-4xl space-y-6 text-center"
        >
          <h3 className="text-3xl font-light tracking-[-0.03em] text-white md:text-5xl">
            Not a standard beach wedding.
            <span className="block text-stone-400">A coastal world with privacy, beauty and intention.</span>
          </h3>
          <p className="text-lg leading-8 text-stone-300">
            The shortlist below is built around exclusivity, emotional atmosphere, and a well-paced guest experience — with settings that feel elegant, memorable, and never generic.
          </p>
        </motion.div>
      </section>

      <section ref={shortlistRef} className="border-y border-white/10 bg-white/[0.03] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.32em] text-stone-400">Venue browser</p>
              <h3 className="text-3xl font-light tracking-[-0.03em] text-white md:text-5xl">Click a concept to open details</h3>
            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {venues.map((venue, i) => {
              const isSelected = venue.id === selectedVenue.id;
              return (
                <motion.button
                  key={venue.id}
                  type="button"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={i}
                  variants={fadeUp}
                  onClick={() => handleSelectVenue(venue.id, true)}
                  className="text-left"
                >
                  <Card className={`group h-full overflow-hidden rounded-[1.6rem] border bg-stone-900/75 text-stone-100 backdrop-blur transition-all duration-300 ${isSelected ? "border-white/30 shadow-2xl shadow-black/20" : "border-white/10 hover:border-white/20"}`}>
                    <div className="relative aspect-[4/4.2] overflow-hidden border-b border-white/10">
                      <img src={venue.images[0]} alt={venue.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.58))]" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-stone-100 backdrop-blur">
                        {venue.score}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="text-sm uppercase tracking-[0.22em] text-stone-300">{venue.area}</div>
                        <h4 className="mt-1 text-2xl font-light text-white">{venue.name}</h4>
                      </div>
                    </div>
                    <CardContent className="space-y-4 p-5">
                      <p className="text-sm leading-7 text-stone-300">{venue.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {venue.bestFor.slice(0, 3).map((item) => (
                          <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-stone-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={detailRef} className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-12">
        <div className="sticky top-4 z-20 mb-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-stone-900/80 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4 py-4">
            <Button variant="outline" size="icon" onClick={scrollShortlistPrev} className="shrink-0 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div ref={shortlistSliderRef} onScroll={handleShortlistScroll} className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[...venues, ...venues, ...venues].map((venue, index) => {
                const isSelected = venue.id === selectedVenue.id;
                return (
                  <button
                    key={venue.id + "-shortlist-" + index}
                    type="button"
                    onClick={() => handleSelectVenue(venue.id, false)}
                    className={`min-w-[220px] cursor-pointer rounded-2xl border px-4 py-3 text-left transition ${isSelected ? "border-white/25 bg-white/[0.08]" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"}`}
                  >
                    <div className="text-[10px] uppercase tracking-[0.2em] text-stone-400">{venue.score}</div>
                    <div className="mt-1 text-sm font-medium text-white">{venue.name}</div>
                    <div className="mt-1 text-xs text-stone-400">{venue.area}</div>
                  </button>
                );
              })}
            </div>
            <Button variant="outline" size="icon" onClick={scrollShortlistNext} className="shrink-0 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <motion.div
            key={selectedVenue.id + "-gallery"}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 xl:sticky xl:top-36"
          >
            <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03]">
              <div className="relative">
                <button type="button" className="block h-full w-full" onClick={() => openLightboxAt(activeImageIndex)}>
                  <img src={activeImage} alt={`${selectedVenue.name} visual ${activeImageIndex + 1}`} className="aspect-[16/10] w-full object-cover" />
                </button>
                {selectedImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2 text-white backdrop-blur"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2 text-white backdrop-blur"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
                      {activeImageIndex + 1} / {selectedImages.length}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {selectedImages.map((image, index) => (
                <button
                  key={`${selectedVenue.id}-image-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded-2xl border ${index === activeImageIndex ? "border-white/30" : "border-white/10"}`}
                >
                  <img src={image} alt={`${selectedVenue.name} thumbnail ${index + 1}`} className="aspect-[4/3] w-full object-cover" />
                </button>
              ))}
            </div>

          </motion.div>

          <motion.div
            key={selectedVenue.id + "-details"}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="space-y-4 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-stone-300">
                  {selectedVenue.mood}
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Selected concept</p>
                <h3 className="mt-2 text-4xl font-light tracking-[-0.03em] text-white">{selectedVenue.name}</h3>
                <p className="mt-4 text-lg leading-8 text-stone-300">{selectedVenue.fit}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedVenue.bestFor.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-stone-300">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {selectedVenue.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                    <Button className="rounded-full bg-white px-5 text-stone-950 hover:bg-stone-200">
                      {link.label}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>

            <Accordion type="multiple" defaultValue={["accommodation", "experience", "capacity"]} className="space-y-4">
              <AccordionItem value="accommodation" className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-6">
                <AccordionTrigger className="text-left text-sm uppercase tracking-[0.22em] text-stone-300 hover:no-underline">
                  <span className="flex items-center gap-2"><BedDouble className="h-4 w-4" /> Accommodation</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-2">
                    {selectedVenue.accommodationOptions.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm leading-7 text-stone-300">
                        {item}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="experience" className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-6">
                <AccordionTrigger className="text-left text-sm uppercase tracking-[0.22em] text-stone-300 hover:no-underline">
                  <span className="flex items-center gap-2"><Ship className="h-4 w-4" /> Wedding day experience</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-2">
                    {selectedVenue.experienceHighlights.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm leading-7 text-stone-300">
                        {item}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="capacity" className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-6">
                <AccordionTrigger className="text-left text-sm uppercase tracking-[0.22em] text-stone-300 hover:no-underline">
                  <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Capacity & Planning</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3 pb-2 md:grid-cols-2">
                    {selectedVenue.capacityLines.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm leading-7 text-stone-300">
                        {item}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-12">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.32em] text-stone-400">Wedding weekend feeling</p>
              <h3 className="text-3xl font-light tracking-[-0.03em] text-white md:text-5xl">What the overall experience could feel like</h3>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {weekendFlow.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                variants={fadeUp}
                className="rounded-[1.5rem] border border-white/10 bg-stone-950/50 p-6"
              >
                <div className="mb-3 text-sm uppercase tracking-[0.26em] text-stone-400">0{i + 1}</div>
                <h4 className="mb-2 text-2xl font-light text-white">{item.title}</h4>
                <p className="leading-7 text-stone-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%),linear-gradient(180deg,rgba(186,157,120,0.18),rgba(0,0,0,0.2))] p-8 md:p-12"
        >
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <h3 className="text-4xl font-light tracking-[-0.04em] text-white md:text-6xl">
              The right venue should feel like
              <span className="block text-stone-300">it was waiting for your story.</span>
            </h3>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur"
            onClick={() => setLightboxImage(null)}
          >
            {selectedImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-3 text-white"
                  onClick={prevLightboxImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="absolute right-5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-3 text-white"
                  onClick={nextLightboxImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <button
              type="button"
              className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 p-2 text-white"
              onClick={() => setLightboxImage(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              key={lightboxImage}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxImage}
              alt="Venue detail"
              className="max-h-[90vh] max-w-[92vw] rounded-3xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
