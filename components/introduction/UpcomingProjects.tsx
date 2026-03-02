'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

const UpcomingProjects = () => {
    const { t } = useTranslation();

    return (
        <motion.section
            id="upcoming-projects"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
        >
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Construction className="w-8 h-8" />
                </div>
                <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] font-black text-foreground">
                    {t('upcomingProjects.title')}
                </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(t('upcomingProjects.items', { returnObjects: true }) as Array<{ title: string, description: string }>).map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-muted/5 p-8 rounded-[2.5rem] border border-border hover:border-primary/30 hover:bg-card hover:shadow-xl transition-all duration-300 group"
                    >
                        <h3 className="text-xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-muted leading-relaxed text-sm">
                            {project.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default UpcomingProjects;
