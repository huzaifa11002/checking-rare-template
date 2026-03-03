'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  Droplets,
  Heart,
  School,
  Utensils,
  Gift,
  Users,
  Baby,
  TrendingUp,
  Truck,
  Monitor,
  Home,
  Hammer,
  Scale,
  Mic
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

const ServicesGrid = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('home.services.items.water.title'),
      description: t('home.services.items.water.desc'),
      icon: Droplets,
      slug: 'clean-water',
      delay: 0
    },
    {
      title: t('home.services.items.ration.title'),
      description: t('home.services.items.ration.desc'),
      icon: Utensils,
      slug: 'ration-distribution',
      delay: 0.1
    },
    {
      title: t('home.services.items.ambulance.title'),
      description: t('home.services.items.ambulance.desc'),
      icon: Truck,
      slug: 'ambulance-service',
      delay: 0.2
    },
    {
      title: t('home.services.items.computer.title'),
      description: t('home.services.items.computer.desc'),
      icon: Monitor,
      slug: 'computer-training',
      delay: 0.3
    },
    {
      title: t('home.services.items.schools.title'),
      description: t('home.services.items.schools.desc'),
      icon: School,
      slug: 'establish-schools',
      delay: 0.4
    },
    {
      title: t('home.services.items.industrial.title'),
      description: t('home.services.items.industrial.desc'),
      icon: Home,
      slug: 'industrial-home',
      delay: 0.5
    },
    {
      title: t('home.services.items.vocational.title'),
      description: t('home.services.items.vocational.desc'),
      icon: Hammer,
      slug: 'vocational-training',
      delay: 0.6
    },
    {
      title: t('home.services.items.justice.title'),
      description: t('home.services.items.justice.desc'),
      icon: Scale,
      slug: 'justice-for-poor',
      delay: 0.7
    },
    {
      title: t('home.services.items.seminars.title'),
      description: t('home.services.items.seminars.desc'),
      icon: Mic,
      slug: 'organize-seminars',
      delay: 0.8
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold uppercase tracking-widest text-[10px]">{t('home.services.tag')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(1.75rem,6vw,3.5rem)] font-black text-foreground tracking-tight"
          >
            {t('home.services.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg md:text-xl leading-relaxed"
          >
            {t('home.services.description')}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: service.delay, duration: 0.5 }}
              className="group relative bg-card dark:bg-card/50 p-10 rounded-[2.5rem] border border-border/60 dark:border-primary-foreground/5 hover:border-primary/30 dark:hover:border-primary/20 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col items-start"
            >
              {/* Card Corner Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />

              <div className="relative z-10 w-full mb-8">
                <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <service.icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
              </div>

              <div className="relative z-10 grow">
                <h3 className="text-[clamp(1.25rem,4vw,1.5rem)] font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed mb-8 text-base">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 w-full mt-auto">
                <Link
                  href={`/service/${service.slug}`}
                  className="inline-flex items-center gap-3 text-primary font-bold text-sm uppercase tracking-wider group/link border-b-2 border-transparent hover:border-primary transition-all pb-1"
                >
                  {t('home.services.learnMore')}
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-primary/2 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
