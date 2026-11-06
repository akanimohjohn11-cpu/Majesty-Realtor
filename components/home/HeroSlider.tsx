'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight, Search, Play, Pause } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  tagline: string;
  headline: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  locationTag: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: '/images/sunset_villa.jpg',
    tagline: 'The Trusted Real Estate Partner',
    headline: 'Your Next Property Starts With the Right Partner.',
    subtext:
      'Guiding discerning homeowners, corporate occupiers, and institutional investors across Nigeria with verified inventory, rigorous title due diligence, and bespoke advisory.',
    ctaText: 'Explore Verified Properties',
    ctaLink: '/properties',
    locationTag: 'Ikoyi & Banana Island Waterfront',
  },
  {
    id: 2,
    image: '/images/banana_island_aerial.jpg',
    tagline: 'Prime Island Living',
    headline: 'Exclusive Waterfront Enclaves on Banana Island & Ikoyi.',
    subtext:
      'Private yacht moorings, double-volume detached duplexes, and lagoon-view sanctuaries crafted with international finishes and verified Governor’s Consent.',
    ctaText: 'View Island Duplexes',
    ctaLink: '/properties?city=Ikoyi',
    locationTag: 'Banana Island, Lagos',
  },
  {
    id: 3,
    image: '/images/luxury_lounge.jpg',
    tagline: 'High-Altitude Luxury',
    headline: 'Bespoke Penthouses with Panoramic Atlantic Vistas.',
    subtext:
      'Floor-to-ceiling glass, Italian chandeliers, automated climate control, and direct biometric elevators overlooking the Lekki-Ikoyi Link Bridge.',
    ctaText: 'Explore Penthouses',
    ctaLink: '/properties?category=luxury',
    locationTag: 'Lekki Phase 1 Waterfront',
  },
  {
    id: 4,
    image: '/images/villa_maitama.jpg',
    tagline: 'Diplomatic Enclaves',
    headline: 'Contemporary Ambassadorial Mansions in Maitama, Abuja.',
    subtext:
      'Sprawling 1,400 SQM private grounds, grand paved circular driveways, private cinema lounges, and clean FCT Certificate of Occupancy documentation.',
    ctaText: 'Discover Abuja Mansions',
    ctaLink: '/properties?city=Maitama',
    locationTag: 'Maitama Diplomatic Zone',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const slide = SLIDES[current];

  return (
    <div className="relative w-full bg-[#0D4A36] text-white overflow-hidden min-h-[580px] lg:min-h-[660px] flex flex-col justify-between">
      {/* Background Slides with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority
              sizes="100vw"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            {/* Luminous Warm Emerald & Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D4A36]/95 via-[#0D4A36]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D4A36] via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Top Tag & Controls */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-8 flex items-center justify-between text-xs">
        <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[#DFBE6C]">
          <span className="w-2 h-2 rounded-full bg-[#DFBE6C] animate-pulse" />
          <span className="font-semibold tracking-wider uppercase text-[11px]">{slide.locationTag}</span>
        </div>

        {/* Carousel slide indicators and pause/play */}
        <div className="flex items-center gap-4">
          <div className="font-mono text-xs text-[#DFBE6C] tracking-widest">
            <span className="font-bold text-white">0{current + 1}</span> / 0{SLIDES.length}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#DFBE6C] hover:text-[#0D4A36] text-white flex items-center justify-center transition-all backdrop-blur-xs border border-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#DFBE6C] hover:text-[#0D4A36] text-white flex items-center justify-center transition-all backdrop-blur-xs border border-white/20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#DFBE6C] flex items-center justify-center transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 md:py-16">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div className="text-xs uppercase font-bold tracking-widest text-[#DFBE6C]">
                {slide.tagline}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight text-balance drop-shadow-md">
                {slide.headline}
              </h1>

              <p className="text-sm md:text-base text-[#F5EEDB]/90 font-light leading-relaxed max-w-2xl drop-shadow-xs">
                {slide.subtext}
              </p>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={slide.ctaLink}
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0D4A36] bg-gradient-to-r from-[#DFBE6C] to-[#D4AF37] hover:from-[#F2DFAC] hover:to-[#DFBE6C] rounded-md transition-all shadow-lg flex items-center gap-2 group"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://wa.me/2347089581351?text=Hello%20Majesty%20Realty%2C%20I%20would%20like%20to%20consult%20with%20a%20property%20advisor."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-black/40 hover:bg-black/60 rounded-md backdrop-blur-md transition-all flex items-center gap-2 border border-[#DFBE6C]/40"
                >
                  <MessageSquare className="w-4 h-4 text-[#DFBE6C]" />
                  <span>Talk to an Agent</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bars for Slides */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-6">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrent(idx)}
              className="text-left group focus:outline-none"
            >
              <div className="h-1 rounded-full bg-white/20 overflow-hidden mb-1.5 transition-all">
                <div
                  className={`h-full transition-all duration-300 ${
                    current === idx ? 'bg-[#DFBE6C] w-full' : 'bg-transparent w-0'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] hidden sm:block truncate uppercase font-semibold tracking-wider transition-colors ${
                  current === idx ? 'text-[#DFBE6C]' : 'text-white/60 group-hover:text-white'
                }`}
              >
                0{s.id}. {s.tagline}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
