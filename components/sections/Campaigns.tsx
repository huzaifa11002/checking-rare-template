'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { useDonation } from '@/components/providers/DonationProvider';
import Food from '@/public/img/food.jpeg';
import ITStudent from '@/public/img/IT-student.jpeg';
import Students from '@/public/img/students.jpeg';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

const Campaigns = () => {
  const { openDonationModal } = useDonation();
  const { t } = useTranslation();

  const campaigns = [
    {
      title: t('home.campaigns.items.food.title'),
      description: t('home.campaigns.items.food.desc'),
      image: Food,
      category: t('home.campaigns.items.food.category'),
      delay: 0
    },
    {
      title: t('home.campaigns.items.vocational.title'),
      description: t('home.campaigns.items.vocational.desc'),
      image: Students,
      category: t('home.campaigns.items.vocational.category'),
      delay: 0.1
    },
    {
      title: t('home.campaigns.items.it.title'),
      description: t('home.campaigns.items.it.desc'),
      image: ITStudent,
      category: t('home.campaigns.items.it.category'),
      delay: 0.2
    }
  ];

  return (
    <section className="py-24 bg-background text-foreground overflow-hidden relative transition-colors duration-500">
      {/* Background gradients */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-120 h-120 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-160 h-160 bg-primary rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black uppercase tracking-widest text-sm"
            >
              {t('home.campaigns.tag')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(1.75rem,5vw,3rem)] font-black text-foreground"
            >
              {t('home.campaigns.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted max-w-xl text-base md:text-lg"
            >
              {t('home.campaigns.description')}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/gallery"
              className="group text-primary hover:text-primary-foreground font-black flex items-center gap-3 transition-all bg-primary/5 dark:bg-primary-foreground/5 hover:bg-primary px-6 py-3 rounded-full border border-primary/20"
            >
              {t('home.campaigns.viewGallery')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {campaigns.map((campaign) => (
            <motion.div
              key={campaign.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: campaign.delay, duration: 0.6 }}
              className="group relative h-120 rounded-[2.5rem] overflow-hidden border border-border shadow-2xl"
            >
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/40 to-transparent" />

              {/* Category Tag */}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-5 py-2 bg-primary/90 text-primary-foreground rounded-full text-xs font-black uppercase tracking-widest shadow-lg backdrop-blur-md">
                  {campaign.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 p-6 md:p-10 space-y-4 md:space-y-6 w-full z-20">
                <div className="space-y-2 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-[clamp(1.25rem,4vw,1.75rem)] font-black text-primary-foreground group-hover:text-primary transition-colors">{campaign.title}</h4>
                  <p className="text-primary-foreground/60 text-sm md:text-base line-clamp-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                    {campaign.description}
                  </p>
                </div>

                <button
                  onClick={openDonationModal}
                  className="w-full bg-card text-foreground py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-base md:text-lg transform md:translate-y-20 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 shadow-xl shadow-black/50 flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  {t('home.campaigns.donateNow')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campaigns;
