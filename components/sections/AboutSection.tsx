'use client';

import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import AboutImg from '@/public/img/about-img.jpeg';

const AboutSection = () => {
    const { t } = useTranslation();

    const aboutStats = [
        t('home.about.stats.lives'),
        t('home.about.stats.transparency'),
        t('home.about.stats.facilities'),
        t('home.about.stats.relief'),
        t('home.about.stats.projects'),
        t('home.about.stats.pumps')
    ];

    return (
        <section className="py-24 bg-background dark:bg-charcoal overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-background dark:border-charcoal/50 group">
                            <Image
                                src={AboutImg}
                                alt="Rare Foundation Work"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-onyx/40 to-transparent opacity-60" />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-background dark:bg-charcoal p-8 rounded-3xl shadow-2xl z-20 border border-border dark:border-primary-foreground/10 animate-float">
                            <p className="text-5xl font-black text-primary">15+</p>
                            <p className="text-[10px] font-black text-muted uppercase tracking-widest mt-1">{t('home.about.badge.years')}</p>
                        </div>

                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-onyx/10 rounded-full blur-3xl opacity-50" />
                    </div>

                    <div className="lg:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <span className="text-primary font-black uppercase tracking-widest text-sm">{t('home.about.tag')}</span>
                            <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black text-foreground leading-tight">
                                {t('home.about.title')}
                            </h2>
                            <p className="text-muted text-base md:text-lg leading-relaxed">
                                {t('home.about.description')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {aboutStats.map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                                    <span className="font-bold text-foreground/90">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <Link
                                href="/introduction"
                                className="inline-flex items-center gap-3 bg-onyx text-primary-foreground px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold shadow-lg shadow-onyx/20 hover:shadow-onyx/40 transition-all hover:-translate-y-1 active:scale-95 group text-sm md:text-base"
                            >
                                {t('home.about.discoverStory')}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
