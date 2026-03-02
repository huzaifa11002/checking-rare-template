'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

const MissionVision = () => {
    const { t } = useTranslation();

    return (
        <motion.section
            id="mission"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
        >
            <div className="bg-muted/10 p-10 rounded-[3rem] border border-border hover:border-primary/20 transition-all group">
                <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4">
                    {t('introduction.mission.title')}
                </h3>
                <p className="text-muted leading-relaxed">
                    {t('introduction.mission.text')}
                </p>
            </div>
            <div className="bg-primary p-10 rounded-[3rem] text-primary-foreground hover:bg-primary-hover transition-all group">
                <div className="w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform">
                    <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-4">
                    {t('introduction.vision.title')}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                    {t('introduction.vision.text')}
                </p>
            </div>
        </motion.section>
    );
};

export default MissionVision;
