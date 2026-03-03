'use client';

import { useDonation } from '@/components/providers/DonationProvider';
import { useTranslation } from 'react-i18next';

const GalleryCTA = () => {
    const { openDonationModal } = useDonation();
    const { t } = useTranslation();

    return (
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
    );
};

export default GalleryCTA;
