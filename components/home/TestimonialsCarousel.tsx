'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle,
  Building,
  ShieldCheck,
  Pause,
  Play,
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  property: string;
  avatar: string;
  rating: number;
  quote: string;
  verifiedTransaction: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Engr. Babatunde Alabi & Family',
    role: 'UK-Based Petroleum Executive',
    location: 'London & Lagos',
    property: '5-Bedroom Waterfront Villa, Banana Island',
    avatar: 'https://picsum.photos/seed/babtunde/200/200',
    rating: 5,
    quote:
      'Operating from London, buying property in Nigeria always felt like a legal minefield. Majesty Realty conducted exhaustive Lands Bureau searches, coordinated chartered beacon charting, and handled Governor’s Consent without a single hiccup. Incomparable integrity.',
    verifiedTransaction: '₦1.85B Acquisition · Title Authenticated',
  },
  {
    id: 'test-2',
    name: 'Dr. (Mrs.) Ifeoma Okonkwo',
    role: 'Managing Partner, Private Healthcare Group',
    location: 'Abuja (FCT)',
    property: 'Diplomatic Compound, Maitama',
    avatar: 'https://picsum.photos/seed/ifeoma/200/200',
    rating: 5,
    quote:
      'We required an ambassadorial residence in Maitama with strict security parameters for high-level diplomatic hosting. Majesty understood our privacy requirements immediately and presented only fully unencumbered inventory with flawless documentation.',
    verifiedTransaction: '₦2.8B Diplomatic Acquisition · Turnkey Close',
  },
  {
    id: 'test-3',
    name: 'Tariq Al-Mansoor',
    role: 'Chief Investment Officer, Gulf Coast Capital',
    location: 'Dubai & Victoria Island',
    property: 'Grade-A Commercial Office Tower, Victoria Island',
    avatar: 'https://picsum.photos/seed/tariq/200/200',
    rating: 5,
    quote:
      'Majesty’s commercial brokerage team negotiated our three-floor corporate lease in Victoria Island with institutional precision. Their lease structuring and yield appraisals are world-class.',
    verifiedTransaction: 'Commercial Multi-Floor Long Lease · 100% Vetted',
  },
  {
    id: 'test-4',
    name: 'Olusegun & Kemi Adeleke',
    role: 'Fintech Co-Founder & Diaspora Investors',
    location: 'San Francisco & Lekki Phase 1',
    property: 'The Royal Zenith Penthouse, Lekki Phase 1',
    avatar: 'https://picsum.photos/seed/olusegun/200/200',
    rating: 5,
    quote:
      'The virtual tour and drone walkthrough gave us complete confidence before flying into Murtala Muhammed Airport. When we inspected the penthouse physically, every square meter was exactly as represented. They set the standard for Nigerian luxury real estate.',
    verifiedTransaction: '₦850M Penthouse Acquisition · Prompt Deed Delivery',
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-20 px-6 lg:px-12 bg-[#FAF9F6] border-y border-[#0D4A36]/10 relative overflow-hidden">
      {/* Subtle decorative background shapes */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#DFBE6C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D4A36]/10 text-[#0D4A36] text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Verified Client Experiences</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0D4A36]">
              Trusted by Discerning Investors & Families
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6F66] mt-2 max-w-xl leading-relaxed">
              Real accounts from high-net-worth buyers, diaspora homeowners, and corporate tenants who rely on Majesty Realty for transparent property transactions.
            </p>
          </div>

          {/* Navigation and Play/Pause */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#F5F3EC] border border-[#0D4A36]/15 text-xs text-[#0D4A36] font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              title={isPlaying ? 'Pause carousel' : 'Resume carousel'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#0D4A36]" /> : <Play className="w-3.5 h-3.5 text-[#0D4A36]" />}
              <span>{isPlaying ? 'Auto-Advancing' : 'Paused'}</span>
            </button>

            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-white hover:bg-[#F5F3EC] border border-[#0D4A36]/15 flex items-center justify-center text-[#0D4A36] transition-colors shadow-xs"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-white hover:bg-[#F5F3EC] border border-[#0D4A36]/15 flex items-center justify-center text-[#0D4A36] transition-colors shadow-xs"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Active Card Stage */}
        <div className="relative min-h-[340px] md:min-h-[290px] bg-white rounded-3xl border border-[#DFBE6C]/30 shadow-xl p-8 sm:p-12 overflow-hidden">
          {/* Large decorative quotation mark */}
          <Quote className="absolute top-6 right-8 w-24 h-24 text-[#DFBE6C]/15 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6 max-w-4xl"
            >
              {/* Star Rating & Verified Transaction Pill */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#D4AF37]" />
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D4A36]/10 text-[#0D4A36] text-[11px] font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0D4A36]" />
                  <span>{current.verifiedTransaction}</span>
                </div>
              </div>

              {/* Quote text */}
              <blockquote className="text-base sm:text-xl font-medium text-[#1E332B] leading-relaxed italic">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Author & Property Info */}
              <div className="pt-4 border-t border-[#0D4A36]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#DFBE6C] shadow-sm shrink-0">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      sizes="48px"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0D4A36]">{current.name}</h4>
                    <p className="text-xs text-[#5B6F66]">
                      {current.role} · <span className="text-[#1E332B] font-medium">{current.location}</span>
                    </p>
                  </div>
                </div>

                <div className="text-xs text-[#5B6F66] bg-[#FAF9F6] px-3.5 py-2 rounded-xl border border-[#0D4A36]/10 flex items-center gap-2 self-start sm:self-center">
                  <Building className="w-4 h-4 text-[#DFBE6C] shrink-0" />
                  <span className="font-medium text-[#1E332B] truncate">{current.property}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Indicators */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-[#0D4A36]/10">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-[#0D4A36]'
                    : 'w-2 bg-[#0D4A36]/20 hover:bg-[#0D4A36]/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
            <span className="text-xs text-[#5B6F66] ml-2 font-mono">
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
