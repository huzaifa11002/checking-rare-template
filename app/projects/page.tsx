'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDonation } from '@/components/providers/DonationProvider';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

import { projectImages, ProjectImage } from '@/lib/projects-data';

const GalleryPage = () => {
  const { openDonationModal } = useDonation();
  const [selectedImg, setSelectedImg] = useState<StaticImageData | string | null>(null);
  const [filter, setFilter] = useState('All');
  const { t } = useTranslation();

  const categories = [
    { value: 'All', label: t('projects.categories.all') },
    { value: 'Education', label: t('projects.categories.education') },
    { value: 'Food', label: t('projects.categories.food') },
    { value: 'Water', label: t('projects.categories.water') },
    { value: 'Other', label: t('projects.categories.other') },
  ];

  const filteredImages = filter === 'All'
    ? projectImages
    : projectImages.filter((img: ProjectImage) => img.category === filter);

  return (
    <div className="bg-background transition-colors duration-500">
      {/* Page Header */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-160 h-160 bg-primary rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-primary-foreground mb-6"
          >
            {t('projects.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed"
          >
            {t('projects.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4">

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center gap-3 mr-4 text-muted">
              <Filter className="w-5 h-5" />
              <span className="font-bold uppercase tracking-widest text-xs">{t('projects.filter')}</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={cn(
                  "px-6 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black text-xs md:text-sm transition-all border-2 active:scale-95",
                  filter === cat.value
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card border-border text-foreground hover:border-primary/30"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredImages.map((img: ProjectImage, index: number) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-primary/10 transition-shadow border-4 border-border"
                  onClick={() => setSelectedImg(img.src)}
                >
                  <Image
                    src={img.src}
                    alt={`Impact Photo ${img.id}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                    <div className="w-14 h-14 bg-primary-foreground/20 backdrop-blur-md rounded-full flex items-center justify-center text-primary-foreground scale-0 group-hover:scale-100 transition-transform duration-500">
                      <ZoomIn className="w-8 h-8" />
                    </div>
                    <span className="px-4 py-1.5 bg-primary-foreground text-primary rounded-full text-[10px] font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {t(`projects.categories.${img.category.toLowerCase()}`)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-32 space-y-4">
              <Camera className="w-20 h-20 text-muted/20 mx-auto" />
              <p className="text-muted font-bold">{t('projects.noItems')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 bg-primary/95 z-3000 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 m-auto w-fit h-fit max-w-[95vw] max-h-[90vh] z-3001 pointer-events-none"
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute -top-16 right-0 p-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground rounded-full transition-all pointer-events-auto"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-primary-foreground/10 flex items-center justify-center bg-black/50">
                <Image
                  src={selectedImg}
                  alt="Enlarged impact view"
                  width={1200}
                  height={800}
                  className="max-h-[85vh] w-auto object-contain"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20 bg-muted/5 text-center transition-colors duration-500">
        <div className="container mx-auto px-4 space-y-6">
          <h3 className="text-[clamp(1.5rem,5vw,2.5rem)] font-black text-foreground">{t('projects.transparency')}</h3>
          <p className="text-muted max-w-xl mx-auto text-sm md:text-base">{t('projects.transparencyText')}</p>
          <button
            onClick={openDonationModal}
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold shadow-lg transition-all active:scale-95 text-sm md:text-base">
            {t('projects.support')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
