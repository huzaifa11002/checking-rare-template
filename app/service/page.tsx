'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ArrowRight,
  Heart
} from 'lucide-react';
import { useDonation } from '@/components/providers/DonationProvider';
import { serviceDetails } from '@/lib/service-data';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { SloganTyper } from '@/components/ui/SloganTyper';

const ServicePage = () => {
  const { openDonationModal } = useDonation();
  const { t } = useTranslation();

  return (
    <div className="bg-background transition-colors duration-500">
      {/* Page Header */}
      <section className="relative py-24 bg-primary overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(2rem,6vw,4rem)] font-black text-primary-foreground mb-6"
          >
            {t('servicesPage.title')}
          </motion.h1>
          <div className="flex items-center justify-center mb-2">
            <SloganTyper />
          </div>
          <div className="flex items-center justify-center gap-3 text-primary-foreground/70 font-bold uppercase tracking-widest text-xs">
            <Link href="/" className="hover:text-primary-foreground transition-colors">{t('nav.home')}</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{t('nav.services')}</span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
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

          {/* Bottom Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 p-12 md:p-20 bg-primary rounded-[4rem] text-center text-primary-foreground relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <Heart className="w-16 h-16 text-primary-foreground mx-auto fill-primary-foreground animate-pulse" />
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black">{t('servicesPage.cta.title')}</h2>
              <p className="text-primary-foreground/70 text-base md:text-lg">{t('servicesPage.cta.text')}</p>
              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={openDonationModal}
                  className="bg-primary-foreground text-primary px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:shadow-primary/30 shadow-xl transition-all active:scale-95">
                  {t('servicesPage.cta.donate')}
                </button>
                <Link href="/contact" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all border border-primary-foreground/5 active:scale-95">
                  {t('servicesPage.cta.contact')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
