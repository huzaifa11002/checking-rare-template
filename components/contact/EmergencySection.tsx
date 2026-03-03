'use client';

import { useTranslation } from 'react-i18next';

const EmergencySection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-muted/10 rounded-t-[5rem] transition-colors duration-500">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
                    <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black text-foreground">{t('contact.info.emergency')}</h2>
                    <p className="text-muted text-sm md:text-base">{t('contact.info.emergencyText')}</p>
                    <a href="tel:+923002119323" className="inline-block mt-4 text-xl md:text-2xl font-black text-primary hover:underline" dir="ltr">+92 3002119323</a>
                </div>
            </div>
        </section>
    );
};

export default EmergencySection;
