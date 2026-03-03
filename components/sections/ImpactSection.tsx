'use client';

import { useTranslation } from 'react-i18next';

const ImpactSection = () => {
    const { t } = useTranslation();

    const impactStats = [
        { label: t('home.impact.stats.donors'), value: '50K+' },
        { label: t('home.impact.stats.projects'), value: '2.5K+' },
        { label: t('home.impact.stats.volunteers'), value: '5K+' },
        { label: t('home.impact.stats.cities'), value: '55+' },
    ];

    return (
        <section className="py-24 bg-light dark:bg-primary-foreground/5 relative overflow-hidden transition-colors duration-500 border-t border-transparent dark:border-primary-foreground/5">
            <div className="container mx-auto px-4 text-center space-y-12">
                <div className="space-y-4">
                    <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black text-foreground">{t('home.impact.title')}</h2>
                    <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('home.impact.description')}
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {impactStats.map((stat) => (
                        <div key={stat.label} className="text-center group">
                            <p className="text-[clamp(1.5rem,5vw,4rem)] font-black text-primary mb-1 group-hover:scale-110 transition-transform">{stat.value}</p>
                            <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
