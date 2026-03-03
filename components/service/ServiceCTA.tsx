'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useDonation } from '@/components/providers/DonationProvider';
import { useTranslation } from 'react-i18next';

const ServiceCTA = () => {
    const { openDonationModal } = useDonation();
    const { t } = useTranslation();

    return (
        <section className="pb-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 md:p-20 bg-primary rounded-[4rem] text-center text-primary-foreground relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                    <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                        <Heart className="w-16 h-16 text-primary-foreground mx-auto fill-primary-foreground animate-pulse" />
                        <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black">{t('servicesPage.cta.title')}</h2>
                        <p className="text-primary-foreground/70 text-base md:text-lg">{t('servicesPage.cta.text')}</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button
                                onClick={openDonationModal}
                                className="bg-primary-foreground text-primary px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:shadow-primary/30 shadow-xl transition-all active:scale-95">
                                {t('servicesPage.cta.donate')}
                            </button>
                            <Link href="/contact" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all border border-primary-foreground/5 active:scale-95">
                                {t('servicesPage.cta.contact')}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServiceCTA;
