'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import '@/lib/i18n';

const IntroductionSection = () => {
    const { t } = useTranslation();

    return (
        <motion.section
            id="introduction"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
        >
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] font-black text-foreground">
                    {t('introduction.intro.title')}
                </h2>
            </div>
            <div className="space-y-6 text-muted font-medium text-lg leading-relaxed">
                <p>
                    <Trans
                        i18nKey="introduction.intro.text1"
                        components={[
                            <span key="trust" className="text-primary font-black" />,
                            <span key="beneficiaries" className="text-foreground font-black" />
                        ]}
                    />
                </p>
                <p>
                    <Trans
                        i18nKey="introduction.intro.text2"
                        components={[
                            <span key="trust" className="text-primary font-black" />,
                            <span key="beneficiaries" className="text-foreground font-black" />
                        ]}
                    />
                </p>
                <p>
                    <Trans
                        i18nKey="introduction.intro.text3"
                        components={[
                            <span key="trust" className="text-primary font-black" />,
                            <span key="beneficiaries" className="text-foreground font-black" />
                        ]}
                    />
                </p>
            </div>
        </motion.section>
    );
};

export default IntroductionSection;
