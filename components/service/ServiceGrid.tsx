'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { serviceDetails } from '@/lib/service-data';
import { useTranslation } from 'react-i18next';

const ServiceGrid = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {serviceDetails.map((service, idx) => (
                        <motion.div
                            key={service.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative bg-card rounded-[3rem] overflow-hidden border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                        >
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={t(`servicesData.${service.slug}.title`)}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent" />
                                </div>

                                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-between space-y-6">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <service.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-[clamp(1.25rem,4vw,1.75rem)] font-black text-foreground group-hover:text-primary transition-colors">
                                            {t(`servicesData.${service.slug}.title`)}
                                        </h3>
                                        <p className="text-muted line-clamp-3 leading-relaxed">
                                            {t(`servicesData.${service.slug}.description`)}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/service/${service.slug}`}
                                        className="inline-flex items-center gap-3 text-primary font-black text-sm uppercase tracking-wider group/link"
                                    >
                                        {t('home.services.learnMore')}
                                        <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
