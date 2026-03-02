'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    return (
        <section className="relative py-32 bg-primary overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-160 h-160 bg-primary-foreground/20 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[clamp(2rem,6vw,4rem)] font-black text-primary-foreground mb-6"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            </div>
        </section>
    );
};

export default PageHeader;
