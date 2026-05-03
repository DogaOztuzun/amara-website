import React, { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Heart,
  MapPin,
  Music,
  X,
  BedDouble,
  Users,
  Camera,
  Utensils,
  Wine,
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
    id: "q-lounge",
    name: "Q Lounge — D-Resort Göcek",
    area: "Göcek Marina",
    score: "Iconic Marina Lounge",
    mood: "Cinematic Nikkei dining with DJ-led nights",
    summary:
      "Göcek's most iconic open-air venue: a Nikkei (Japanese-Peruvian) dining lounge on a cliff-side terrace over the bay, with signature cocktails and a DJ that builds the night from sunset onward.",
    fit:
      "A design-led lounge where dinner naturally flows into dancing.",
    bestFor: ["Marina-side dining", "Sunset terrace", "DJ-led after-party"],
    accommodationOptions: [
      "On-site stay at D-Resort Göcek (102 rooms & suites)",
      "Marina-front yachts moored at D-Marin",
      "Villas in Göcek for additional guests",
    ],
    experienceHighlights: [
      "Long-table dinner on the cliff-side terrace, pine canopy above and the bay below",
      "Sashimi, sushi and robata sharing plates from the Nikkei menu, paired with signature cocktails",
      "Golden-hour sunset across Göcek Bay",
      "DJ set from 6pm onward — dinner flows into dancing without leaving the venue",
    ],
    capacityLines: [
      "Long-table dinner: comfortable for 15 guests",
      "After-party: full lounge can host 80–150 pax",
      "On-site stay (D-Resort): 102 rooms & suites",
      "Season: May–November · Closed Mondays",
    ],
    facts: [
      "Designed by the Japanese architect behind the internationally renowned Zuma restaurants",
      "Menu features 150+ wines and Japanese-Peruvian signature cocktails",
      "DJ programming starts at 6pm; the venue is open until midnight",
      "D-Resort officially lists Q Lounge as a wedding after-party venue",
      "D-Resort can host outdoor celebrations of up to 300 guests across its event spaces",
    ],
    caution:
      "Q Lounge sits inside a working luxury resort, so the long table needs to be staged with intention to feel set apart from regular service. A private buyout — or at minimum a reserved terrace section — is worth confirming early.",
    logistics: [
      "Lead with this when you want a venue with its own established energy and crowd",
      "Best fit for the 'dressed formally feels natural' brief — smart-elegant is the house code",
      "Confirm private buyout vs. reserved-section for the dinner; the after-party can absorb more guests as the night builds",
    ],
    contact: "+90 252 661 09 00 · fbadministrator@dresortgocek.com.tr",
    links: [
      { label: "Q Lounge", url: "https://www.dresortgocek.com/en/gastronomy/q-lounge" },
      { label: "Instagram", url: "https://www.instagram.com/dresortgocek/" },
    ],
    images: [
      "https://goceq.com/wp-content/uploads/2023/03/q_lounge_gocek_view2.jpg",
      "https://goceq.com/wp-content/uploads/2023/03/q-lounge-03.jpg",
      "https://fs.dresortgocek.com/cdn/uploads/000000704_qlounge_galeri_1_1520x844.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/f1/f4/64/caption.jpg?w=1100&h=1100&s=1",
      "https://fs.dresortgocek.com/cdn/uploads/000000706_qlounge_galeri_2_1520x844.jpg",
      "https://fs.dresortgocek.com/cdn/uploads/000000708_qlounge_galeri_3_1520x844.jpg",
      "https://www.theturquoisecollection.com/media/77073318/Q-Lounge-1.jpg?width=1310&height=650&scale=both&mode=crop&quality=80",
      "https://fs.dresortgocek.com/cdn/uploads/000001538_crt3868_desktop_1516x844.jpg",
    ],
  },
  {
    id: "miori",
    name: "MIORI by the Sea — Bedri Rahmi Bay",
    area: "Bedri Rahmi Bay",
    score: "gastronomic destination",
    mood: "Aegean atmosphere, international cocktail culture",
    summary:
      "Located in a hidden bay reachable only by boat, the venue has six concept restaurants — including Riva Lounge, the only one in Turkey and the seventh worldwide — with live music, art-led design, and a refined Aegean atmosphere.",
    fit:
      "An art-driven space with a Riva-designed lounge that turns cocktail hour into the highlight of the night.",
    bestFor: ["Boat arrival", "Riva Lounge cocktails", "Live music + DJ"],
    accommodationOptions: [
      "Yachts moored in Göcek Bay for the core group",
      "D-Resort Göcek or other Göcek hotels for the wider guest list",
      "Boutique villas in Göcek",
    ],
    experienceHighlights: [
      "Sunset boat arrival into Bedri Rahmi Bay",
      "Long-table dinner within MIORI’s core space, modern Mediterranean cuisine by a renowned chef",
      "Riva Lounge after-party: a polished Riviera-style space with an Italian design feel",
      "Live music performances and signature cocktails",
    ],
    capacityLines: [
      "Long-table dinner setup for 15 guests",
      "Open seasonally: May through October",
      "Six on-site concepts: MIORI by the Sea, Isabel's, OKO, Riva Lounge, The Kitchen, The Bakery",
      "Access: by sea only — boat transfers from Göcek Marina",
    ],
    facts: [
      "MIORI by the Sea opened in 2025 in Bedri Rahmi Bay, accessible only by boat",
      "Riva Lounge at MIORI debuted on July 4, 2025 — the seventh worldwide and the first in Turkey",
      "Joins Venice, Monte Carlo, Paris, Jeddah and Mallorca on Riva's lounge map",
      "Culinary concepts curated by chef Kemal Demirasal (Barbun, Alancha)",
      "Design materials echo Riva yachts — polished mahogany, striped maple, stainless steel, Aquarama chairs",
    ],
    caution:
      "It's a brand-new venue, so service polish is still settling and early reviews from the first season are mixed. Boat-only access creates magic but adds transfer choreography — guest arrival and weather contingency need to be planned cleanly.",
    logistics: [
      "Strongest 'venue as the story' option — the arrival itself sets the tone",
      "Riva Lounge is the natural anchor for the after-party",
      "Confirm private-section booking for both the dinner concept and Riva Lounge — the venue is open to other guests",
    ],
    contact: "+90 549 646 12 12 · alt: +90 535 108 0048",
    links: [
      { label: "Website", url: "https://miorigocek.com/" },
      { label: "Instagram", url: "https://www.instagram.com/miori.gocek/" },
    ],
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/85/70/b6/miori-gocek-fethiye-dining.jpg?w=1200&h=900&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/85/70/b4/miori-gocek-fethiye-dining.jpg?w=1200&h=900&s=1",
      "https://static.wixstatic.com/media/c92829_801be1c2ef754d62a088dfab2d792730~mv2.jpg",
      "https://images.ctfassets.net/0hlxc8zejznz/AFNpsMlwQ9aL4ySdg43cs/52a8438e172d5b3fd4d5f89655a74363/gocek-miori-restaurant.webp",
      "https://www.lsionline.com/wp-content/uploads/2025/10/Miori.jpg",
      "https://alliedmarine.com/wp-content/uploads/2025/07/RivaLounge-Turkey.jpg.webp",
      "https://foodinlife.com/wp-content/uploads/2025/07/PORTAL-GORSELI-63.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/85/70/b5/miori-gocek-fethiye-dining.jpg?w=1200&h=900&s=1",
    ],
  },
];

const eveningFlow = [
  {
    title: "Arrival",
    text: "Guests arrive to a hidden bay by boat or onto a sunset-lit terrace overlooking the marina.",
  },
  {
    title: "Long-Table Dinner",
    text: "A 15-seat dinner set up inside the venue: Nikkei sharing plates and signature cocktails, or modern Mediterranean cuisine.",
  },
  {
    title: "Music & Dancing",
    text: "DJ or live music takes over at the same spot. The crowd shifts, the lights drop, and the atmosphere deepens into the after-party.",
  },
];

export default function WeddingDinnerTemplate() {
    const [featuredId, setFeaturedId] = useState(venues[0].id);
  const [selectedId, setSelectedId] = useState(venues[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const heroRef = useRef(null);
  const shortlistRef = useRef(null);
  const detailRef = useRef(null);

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
                A dinner reception,
                <span className="block text-stone-300">designed around your wedding celebration.</span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeUp}
                className="max-w-2xl text-lg leading-8 text-stone-200 md:text-xl"
              >
                An overview of venues in Göcek, Turkey, for a unique dinner experience: long-table dining, signature cocktails, and music that carries the night straight into the after-party.
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
              <div className="flex items-center gap-2"><Heart className="h-4 w-4" /> Dinner for 15</div>
              <div className="flex items-center gap-2"><Music className="h-4 w-4" /> Live music + DJ</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Göcek, Turkey</div>
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
            A venue with its own energy and elegance.
            <span className="block text-stone-400">A setting with its own rhythm.</span>
          </h3>
          <p className="text-lg leading-8 text-stone-300">
            A shortlist of venues that carry their own atmosphere — where a formal look feels natural, dinner flows into dancing, and the night continues with the music.
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

          <div className="grid gap-6 md:grid-cols-2">
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
        <div className="sticky top-4 z-20 mb-8 flex flex-wrap gap-2 rounded-full border border-white/10 bg-stone-900/80 p-1.5 backdrop-blur-xl md:w-fit">
          {venues.map((venue) => {
            const isSelected = venue.id === selectedVenue.id;
            return (
              <button
                key={venue.id + "-toggle"}
                type="button"
                onClick={() => handleSelectVenue(venue.id, false)}
                className={`flex-1 cursor-pointer rounded-full px-5 py-2.5 text-left transition md:flex-none ${isSelected ? "bg-white text-stone-950" : "text-stone-300 hover:bg-white/[0.06]"}`}
              >
                <div className="text-sm font-medium leading-tight">{venue.name}</div>
                <div className={`mt-0.5 text-[10px] uppercase tracking-[0.18em] ${isSelected ? "text-stone-500" : "text-stone-400"}`}>{venue.area}</div>
              </button>
            );
          })}
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
                  <span className="flex items-center gap-2"><Utensils className="h-4 w-4" /> Dinner & after-party flow</span>
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
              <p className="text-sm uppercase tracking-[0.32em] text-stone-400">Evening and night flow</p>
              <h3 className="text-3xl font-light tracking-[-0.03em] text-white md:text-5xl">From arrival to dancing — all within one space</h3>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {eveningFlow.map((item, i) => (
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
              Venues that set the tone
              <span className="block text-stone-300">to host your special night.</span>
            </h3>
            <div className="flex items-center justify-center gap-3 pt-2 text-sm uppercase tracking-[0.26em] text-stone-400">
              <Wine className="h-4 w-4" />
              <span>Göcek · Dinner for 15 · Music until late</span>
            </div>
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
