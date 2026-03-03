'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SloganTyper } from '@/components/ui/SloganTyper';

const ServiceHero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative py-24 bg-primary overflow-hidden text-center">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[clamp(2rem,6vw,4rem)] font-black text-primary-foreground mb-6"
                >
                    {t('servicesPage.title')}
                </motion.h1>
                <div className="flex items-center justify-center mb-2">
                    <SloganTyper />
                </div>
                <div className="flex items-center justify-center gap-3 text-primary-foreground/70 font-bold uppercase tracking-widest text-xs">
                    <Link href="/" className="hover:text-primary-foreground transition-colors">{t('nav.home')}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span>{t('nav.services')}</span>
                </div>
            </div>
        </section>
    );
};

export default ServiceHero;
