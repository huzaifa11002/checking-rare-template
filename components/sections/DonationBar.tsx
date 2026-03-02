'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDonation } from '@/components/providers/DonationProvider';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { serviceDetails } from '@/lib/service-data';

const DonationBar = () => {
  const { openDonationModal } = useDonation();
  const [amount, setAmount] = useState('1000');
  const [purpose, setPurpose] = useState('');
  const { t } = useTranslation();

  const quickAmounts = ['500', '1000', '2000', '5000'];

  return (
    <section className="relative z-20 -mt-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-10 border border-border transition-colors duration-500"
        >
          {/* Amount Selection */}
          <div className="flex-1 w-full space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              <label className="text-sm font-bold text-muted uppercase tracking-widest">{t('home.donationBar.selectAmount')}</label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={cn(
                    "py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all text-base md:text-lg border-2",
                    amount === amt
                      ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-muted/10 border-transparent text-foreground hover:bg-muted/20 hover:border-primary/20"
                  )}
                >
                  {amt === 'Custom' ? amt : `Rs. ${parseInt(amt).toLocaleString()}`}
                </button>
              ))}
            </div>

            <div className="relative mt-4">
              <span className="absolute start-5 top-1/2 -translate-y-1/2 text-muted font-bold">Rs.</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t('home.donationBar.customAmount')}
                className="w-full ps-12 pe-6 py-4 md:py-5 bg-muted/5 border-2 border-border rounded-xl md:rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-lg md:text-xl text-foreground"
              />
            </div>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block w-px h-32 bg-border" />

          {/* Purpose & Action */}
          <div className="lg:w-1/3 w-full space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full" />
                <label className="text-sm font-bold text-muted uppercase tracking-widest">{t('home.donationBar.impactPurpose')}</label>
              </div>
              <div className="relative group">
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-6 py-5 bg-muted/5 border-2 border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-semibold appearance-none cursor-pointer text-foreground"
                >
                  <option value="" className="bg-card">{t('home.donationBar.options.general')}</option>
                  {serviceDetails.map((service) => (
                    <option key={service.slug} value={service.slug} className="bg-card">
                      {t(`servicesData.${service.slug}.title`)}
                    </option>
                  ))}
                  {/* Keep Medical as a special option if it's high priority but not a service page */}
                  <option value="medical" className="bg-card">{t('home.donationBar.options.medical')}</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                  <ChevronDown className="w-5 h-5 transition-transform group-focus-within:rotate-180" />
                </div>
              </div>
            </div>

            <button
              onClick={openDonationModal}
              className="w-full bg-linear-to-r from-primary to-primary-hover text-primary-foreground py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-lg md:text-xl shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-3 translate-y-0 hover:-translate-y-1 glow-primary">
              <Heart className="w-6 h-6 fill-current" />
              {t('home.donationBar.processDonation')}
            </button>
          </div>
        </motion.div>

        {/* Floating Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 opacity-60">
          {[
            t('home.donationBar.trust.secure'),
            t('home.donationBar.trust.tax'),
            t('home.donationBar.trust.transparency')
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationBar;
