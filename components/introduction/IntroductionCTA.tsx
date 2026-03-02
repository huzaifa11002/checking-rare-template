'use client';

import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

interface IntroductionCTAProps {
    onDonateClick: () => void;
}

const IntroductionCTA = ({ onDonateClick }: IntroductionCTAProps) => {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-primary text-primary-foreground text-center rounded-t-[5rem]">
            <div className="container mx-auto px-4 space-y-8">
                <Heart className="w-16 h-16 text-primary-foreground mx-auto animate-pulse" />
                <h2 className="text-[clamp(1.5rem,6vw,3.5rem)] font-black">
                    {t('introduction.cta.title')}
                </h2>
                <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto">
                    {t('introduction.cta.text')}
                </p>
                <div className="flex justify-center gap-6">
                    <button
                        onClick={onDonateClick}
                        className="bg-primary-foreground text-primary hover:bg-background hover:text-foreground px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-base md:text-lg transition-all shadow-xl shadow-primary/20 active:scale-95"
                    >
                        {t('introduction.cta.button')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default IntroductionCTA;
