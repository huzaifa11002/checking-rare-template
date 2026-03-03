'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, Camera, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { ProjectImage } from '@/lib/projects-data';

interface GalleryGridProps {
    filter: string;
    setFilter: (filter: string) => void;
    filteredImages: ProjectImage[];
    setSelectedImg: (img: StaticImageData | string | null) => void;
}

const GalleryGrid = ({ filter, setFilter, filteredImages, setSelectedImg }: GalleryGridProps) => {
    const { t } = useTranslation();

    const categories = [
        { value: 'All', label: t('projects.categories.all') },
        { value: 'Education', label: t('projects.categories.education') },
        { value: 'Food', label: t('projects.categories.food') },
        { value: 'Water', label: t('projects.categories.water') },
        { value: 'Other', label: t('projects.categories.other') },
    ];

    return (
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
                    <AnimatePresence mode="popLayout">
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
    );
};

export default GalleryGrid;
