'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { useDonation } from '@/components/providers/DonationProvider';
import { SloganTyper } from '@/components/ui/SloganTyper';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import Bg1 from "@/public/img/hero-bg-carasoul/bg-carasoul (1).jpeg"
import Bg2 from "@/public/img/hero-bg-carasoul/bg-carasoul (2).jpeg"
import Bg3 from "@/public/img/hero-bg-carasoul/bg-carasoul (3).jpeg"
import Bg4 from "@/public/img/hero-bg-carasoul/bg-carasoul (4).jpeg"
import Bg5 from "@/public/img/hero-bg-carasoul/bg-carasoul (5).jpeg"
import Bg6 from "@/public/img/hero-bg-carasoul/bg-carasoul (6).jpeg"
import Bg7 from "@/public/img/hero-bg-carasoul/bg-carasoul (7).jpeg"
const bgImages = [
  Bg1,
  Bg2,
  Bg3,
  Bg4,
  Bg5,
  Bg6,
  Bg7
];

const Hero = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { openDonationModal } = useDonation();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[750px] overflow-hidden flex items-center">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={bgImages[currentIdx]}
              alt="Rare Foundation Impact"
              fill
              className="object-cover"
              priority
            />
            {/* Advanced Multi-layer Overlay */}
            <div className="absolute inset-0 bg-onyx/50" />
            <div className="absolute inset-0 bg-linear-to-tr from-onyx via-onyx/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-onyx/80 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-12 bg-primary-foreground" />
              <span className="text-primary-foreground font-black uppercase tracking-[0.3em] text-xs">
                {t('home.hero.tag')}
              </span>
            </motion.div>

            <div className="space-y-3">
              <h2 className="text-[clamp(2.5rem,7vw,4.5rem)] font-black text-primary-foreground leading-[1.1] tracking-tight">
                {t('home.hero.title_welcome')}
              </h2>

              <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-black text-primary uppercase leading-[1.1] tracking-tight">
                {t('home.hero.title_name')}
              </h1>

              <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-primary-foreground/90 leading-[1.2]">
                {t('home.hero.title_sub')}
              </h3>
            </div>

            <SloganTyper />

            <p className="text-primary-foreground/80 text-sm md:text-lg lg:text-xl max-w-xl leading-relaxed font-medium border-l-4 border-primary-foreground/40 pl-5 md:pl-8">
              {t('home.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4 pb-10">
              <Link
                href="/introduction"
                className="relative bg-primary-foreground text-primary hover:bg-background hover:text-foreground px-7 md:px-10 py-3.5 md:py-4.5 rounded-[1.25rem] md:rounded-[1.5rem] font-bold text-base transition-all shadow-xl hover:shadow-primary/50 flex items-center justify-center gap-3 group active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {t('home.hero.exploreStory')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>

              <button
                onClick={openDonationModal}
                className="group relative bg-primary-foreground/10 backdrop-blur-2xl border-2 border-primary-foreground/20 hover:border-primary-foreground text-primary-foreground px-7 md:px-10 py-3.5 md:py-4.5 rounded-[1.25rem] md:rounded-[1.5rem] font-bold text-base transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                {t('home.hero.donateNow')} <Heart className="w-5 h-5 text-red-500 group-hover:fill-red-500 group-hover:scale-110 transition-all" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-0 opacity-40" />
    </section>
  );
};

export default Hero;
