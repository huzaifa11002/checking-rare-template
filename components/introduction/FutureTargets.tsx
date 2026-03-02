'use client';

import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

const FutureTargets = () => {
    const { t } = useTranslation();

    return (
        <motion.section
            id="targets"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-muted/5 p-12 rounded-[4rem] border border-border"
        >
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="space-y-6 flex-1">
                    <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black text-foreground">
                        {t('introduction.targets.title')}
                    </h2>
                    <p className="text-muted text-lg leading-relaxed">
                        {t('introduction.targets.text')}
                    </p>
                    <div className="flex gap-4">
                        <div className="bg-card p-4 rounded-2xl shadow-sm border border-border flex-1 text-center">
                            <p className="text-3xl font-black text-primary">50+</p>
                            <p className="text-xs font-bold text-muted uppercase">
                                {t('introduction.targets.schools')}
                            </p>
                        </div>
                        <div className="bg-card p-4 rounded-2xl shadow-sm border border-border flex-1 text-center">
                            <p className="text-3xl font-black text-primary">100+</p>
                            <p className="text-xs font-bold text-muted uppercase">
                                {t('introduction.targets.water')}
                            </p>
                        </div>
                        <div className="bg-card p-4 rounded-2xl shadow-sm border border-border flex-1 text-center">
                            <p className="text-3xl font-black text-primary">5+</p>
                            <p className="text-xs font-bold text-muted uppercase">
                                {t('introduction.targets.shelter')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 aspect-square bg-card rounded-full flex items-center justify-center p-8 shadow-2xl relative">
                    <div className="absolute inset-0 border-12 border-primary/10 rounded-full animate-spin-slow" />
                    <Gem className="w-24 h-24 text-primary" />
                </div>
            </div>
        </motion.section>
    );
};

export default FutureTargets;
