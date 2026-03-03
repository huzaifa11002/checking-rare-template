'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface GalleryLightboxProps {
    selectedImg: StaticImageData | string | null;
    setSelectedImg: (img: StaticImageData | string | null) => void;
}

const GalleryLightbox = ({ selectedImg, setSelectedImg }: GalleryLightboxProps) => {
    return (
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
    );
};

export default GalleryLightbox;
