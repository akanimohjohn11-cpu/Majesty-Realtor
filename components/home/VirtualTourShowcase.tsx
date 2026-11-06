'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Compass,
  Building,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
  X,
} from 'lucide-react';

interface TourSlide {
  id: string;
  title: string;
  location: string;
  badge: string;
  duration: string;
  imageUrl: string;
  slug: string;
  price: string;
  highlights: string[];
  description: string;
}

const TOURS: TourSlide[] = [
  {
    id: 'tour-1',
    title: 'Banana Island Waterfront Marina Estate',
    location: 'Banana Island, Ikoyi, Lagos',
    badge: '360° Waterfront Walkthrough',
    duration: '2 min 40s Virtual Tour',
    imageUrl: '/images/banana_island_aerial.jpg',
    slug: 'banana-island-waterfront-marina-estate',
    price: '₦2,400,000,000',
    highlights: ['Private Yacht Jetty', 'Lagoon Sunset Vista', 'Olympic Infinity Pool', 'Subterranean Wine Cellar'],
    description: 'Immerse yourself in Nigeria’s most prestigious waterfront address. Explore the private jetty, triple-height marble lobby, and dusk lagoon panorama.',
  },
  {
    id: 'tour-2',
    title: 'The Royal Zenith Penthouse & Sky Garden',
    location: 'Admiralty Way, Lekki Phase 1, Lagos',
    badge: 'Drone Aerial & Terrace Tour',
    duration: '3 min 15s Cinematic Reel',
    imageUrl: '/images/property_penthouse_lekki_1793896820882.jpg',
    slug: 'the-royal-zenith-penthouse-sky-garden-lekki',
    price: '₦850,000,000',
    highlights: ['360° Atlantic Ocean View', 'Rooftop Heated Jacuzzi', 'Direct Private Elevator', 'Full Home Automation'],
    description: 'Hover above the Lekki skyline with breathtaking 360-degree views of the Atlantic Ocean and the Lekki-Ikoyi Link Bridge from a 700m² private terrace.',
  },
  {
    id: 'tour-3',
    title: 'Banana Island Contemporary Sunset Villa',
    location: 'Zone A, Banana Island, Ikoyi, Lagos',
    badge: 'Architectural Walkthrough',
    duration: '2 min 10s Twilight Walkthrough',
    imageUrl: '/images/sunset_villa.jpg',
    slug: 'banana-island-sunset-villa',
    price: '₦1,850,000,000',
    highlights: ['Fire Pit Sunken Lounge', 'Smart Bioclimatic Glass', '7 En-Suite Staterooms', 'Cinema & Spa Pavilion'],
    description: 'Experience twilight ambience across floor-to-ceiling glass pavilions, floating travertine staircases, and glowing reflection pools.',
  },
  {
    id: 'tour-4',
    title: 'Palatial Ambassadorial Mansion & Diplomatic Compound',
    location: 'Maitama District, Abuja (FCT)',
    badge: 'Diplomatic Compound Tour',
    duration: '4 min Ultra-HD Tour',
    imageUrl: '/images/property_villa_maitama_1793896820194.jpg',
    slug: 'palatial-ambassadorial-mansion-diplomatic-compound-maitama',
    price: '₦2,800,000,000',
    highlights: ['High-Security Perimeter', 'Banquet Hall for 50', 'Executive Bullet-Resistant Suite', 'Dual Service Quarters'],
    description: 'Step inside Abuja’s diplomatic sanctuary featuring imported Italian statuario marble, vaulted ceilings, and manicured private formal gardens.',
  },
];

export default function VirtualTourShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeModalTour, setActiveModalTour] = useState<TourSlide | null>(null);

  // Auto-slide every 6 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TOURS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentTour = TOURS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TOURS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TOURS.length) % TOURS.length);
  };

  return (
    <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-[#0D4A36] via-[#0F5B41] to-[#0A3829] text-[#FAF9F6] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DFBE6C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#DFBE6C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFBE6C]/15 border border-[#DFBE6C]/30 text-[#DFBE6C] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Virtual Experience</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Cinematic Virtual Tours & Aerial Walkthroughs
            </h2>
            <p className="text-xs sm:text-sm text-[#F5EEDB]/80 mt-2 max-w-2xl leading-relaxed">
              Experience Nigeria’s finest architectural masterpieces from anywhere in the world. High-definition aerial drone footage, 360° interior panoramas, and room-by-room walkthroughs.
            </p>
          </div>

          {/* Tour Slide Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF9F6] text-xs font-medium flex items-center gap-2 border border-white/15 transition-all"
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#DFBE6C]" /> : <Play className="w-3.5 h-3.5 text-[#DFBE6C]" />}
              <span>{isPlaying ? 'Auto-Slide' : 'Paused'}</span>
            </button>

            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
              aria-label="Previous tour"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
              aria-label="Next tour"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Cinematic Video/Photo Frame */}
          <div className="lg:col-span-8 relative aspect-16/10 rounded-2xl overflow-hidden border border-[#DFBE6C]/30 shadow-2xl group bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTour.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={currentTour.imageUrl}
                  alt={currentTour.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  priority
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-7000 ease-out group-hover:scale-105"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
              </motion.div>
            </AnimatePresence>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#DFBE6C] text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-md">
                  <Compass className="w-3.5 h-3.5 animate-spin text-[#DFBE6C]" style={{ animationDuration: '8s' }} />
                  <span>{currentTour.badge}</span>
                </span>
                <span className="px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-mono hidden sm:inline-block">
                  {currentTour.duration}
                </span>
              </div>

              <span className="px-3 py-1.5 rounded-full bg-[#0D4A36]/90 backdrop-blur-md border border-[#DFBE6C]/40 text-[#DFBE6C] text-xs font-bold font-mono">
                {currentTour.price}
              </span>
            </div>

            {/* Central Play Interactive Button */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <button
                onClick={() => setActiveModalTour(currentTour)}
                className="relative group/btn cursor-pointer"
                aria-label="Launch interactive virtual walkthrough"
              >
                {/* Ripple ring */}
                <span className="absolute -inset-4 rounded-full bg-[#DFBE6C]/30 animate-ping opacity-75" />
                <span className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#DFBE6C] text-[#0D4A36] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover/btn:scale-110">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </span>
                <span className="block mt-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white text-center">
                  Launch Interactive Tour
                </span>
              </button>
            </div>

            {/* Bottom Info Ribbon */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {currentTour.title}
                  </h3>
                  <p className="text-xs text-[#F5EEDB]/80 mt-0.5">{currentTour.location}</p>
                </div>
                <button
                  onClick={() => setActiveModalTour(currentTour)}
                  className="px-4 py-2 rounded-lg bg-[#DFBE6C] hover:bg-[#D4AF37] text-[#0D4A36] text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>360° Walkthrough</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Slide Selector & Architectural Highlights */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#DFBE6C]">
              Featured Virtual Walkthroughs ({currentIndex + 1} of {TOURS.length})
            </h4>

            {/* Tour Thumbnails List */}
            <div className="space-y-3">
              {TOURS.map((tour, idx) => (
                <button
                  key={tour.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3.5 ${
                    currentIndex === idx
                      ? 'bg-white/15 border-[#DFBE6C] shadow-lg ring-1 ring-[#DFBE6C]/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10">
                    <Image
                      src={tour.imageUrl}
                      alt={tour.title}
                      fill
                      sizes="80px"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                    {currentIndex === idx && (
                      <div className="absolute inset-0 bg-[#0D4A36]/40 flex items-center justify-center">
                        <Play className="w-4 h-4 text-[#DFBE6C] fill-current" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold text-[#DFBE6C] block truncate">
                      {tour.badge}
                    </span>
                    <h5 className="text-xs font-bold text-white truncate">{tour.title}</h5>
                    <span className="text-[11px] font-mono text-[#F5EEDB]/70 block mt-0.5">
                      {tour.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Current Tour Key Highlights */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#DFBE6C] block">
                Architectural Highlights:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {currentTour.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#FAF9F6]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBE6C] shrink-0" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={`/properties/${currentTour.slug}`}
                  className="text-xs font-semibold text-[#DFBE6C] hover:text-white flex items-center gap-1 group"
                >
                  <span>View Full Listing</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href={`https://wa.me/2347089581351?text=${encodeURIComponent(
                    `Hello Majesty Realty, I would like to schedule a private video or physical tour of ${currentTour.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/90 hover:text-[#DFBE6C] font-medium"
                >
                  Book Live Video Tour →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Walkthrough Modal */}
      {activeModalTour && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-4xl bg-[#0D4A36] rounded-2xl overflow-hidden border border-[#DFBE6C]/40 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Top Bar */}
            <div className="p-4 sm:px-6 bg-[#093527] border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFBE6C] block">
                  {activeModalTour.badge}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {activeModalTour.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveModalTour(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated 360° Panorama Stage */}
            <div className="relative aspect-16/9 w-full bg-black overflow-hidden flex items-center justify-center">
              <Image
                src={activeModalTour.imageUrl}
                alt={activeModalTour.title}
                fill
                sizes="1000px"
                referrerPolicy="no-referrer"
                className="object-cover scale-105"
              />
              <div className="absolute inset-0 bg-black/30" />

              {/* Simulated 360 viewer overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/50 backdrop-blur-xs">
                <Compass className="w-16 h-16 text-[#DFBE6C] animate-spin mb-4" style={{ animationDuration: '12s' }} />
                <h4 className="text-xl sm:text-2xl font-bold text-white">
                  Live Virtual Walkthrough Simulator
                </h4>
                <p className="text-xs sm:text-sm text-[#F5EEDB]/90 max-w-md mt-2">
                  Our private client advisory desk provides bespoke live video walkthroughs with our senior licensed brokers via WhatsApp Video or Zoom.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/2347089581351?text=${encodeURIComponent(
                      `Hello Majesty Realty, I want to initiate a live private video inspection of ${activeModalTour.title} (${activeModalTour.price}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFBE6C] to-[#D4AF37] text-[#0D4A36] text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                  >
                    Start WhatsApp Video Walkthrough Now
                  </a>
                  <Link
                    href={`/properties/${activeModalTour.slug}`}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider border border-white/20 transition-all"
                  >
                    View Specifications & Documents
                  </Link>
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="p-4 px-6 bg-[#093527] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F5EEDB]/80">
              <span>{activeModalTour.location} · Asking Price: <strong className="text-white font-mono">{activeModalTour.price}</strong></span>
              <span>Available for scheduled accompanied physical inspections</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
