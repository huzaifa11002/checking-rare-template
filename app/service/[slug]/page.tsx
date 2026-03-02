'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  ChevronRight,
  Share2,
  Check
} from 'lucide-react';
import { useDonation } from '@/components/providers/DonationProvider';
import { serviceDetails } from '@/lib/service-data';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

const ServiceDetailPage = () => {
  const { openDonationModal } = useDonation();
  const params = useParams();
  const slug = params?.slug;
  const { t } = useTranslation();
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const currentSlug = Array.isArray(slug) ? slug[0] : slug;
  const service = serviceDetails.find(s => s.slug === currentSlug);

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setShowCopiedToast(true);
        setTimeout(() => setShowCopiedToast(false), 3000);
      } catch (e) {
        alert('Failed to copy link');
      }
      document.body.removeChild(textArea);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <h1 className="text-4xl font-black text-foreground mb-4">{t('servicesPage.detail.serviceNotFound')}</h1>
        <Link href="/service" className="text-primary font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> {t('servicesPage.detail.backToServices')}
        </Link>
      </div>
    );
  }

  const Icon = service.icon;
  const fullContent = t(`servicesData.${currentSlug}.fullContent`) as string;
  const features = t(`servicesData.${currentSlug}.features`, { returnObjects: true }) as Array<{ title: string, text: string }>;

  return (
    <div className="bg-background transition-colors duration-500">
      {/* Page Header */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={t(`servicesData.${currentSlug}.title`)}
            fill
            className="object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-3xl flex items-center justify-center text-primary mx-auto"
            >
              <Icon className="w-10 h-10" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-black text-primary-foreground leading-tight"
            >
              {t(`servicesData.${currentSlug}.title`)}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-6 text-primary-foreground/80 font-bold uppercase tracking-widest text-xs"
            >
              <Link href="/service" className="hover:text-primary transition-colors">{t('nav.services')}</Link>
              <ChevronRight className="w-4 h-4 text-primary" />
              <span className="text-primary-foreground">{t('servicesPage.detail.details')}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20">

            {/* Main Content */}
            <div className="lg:w-2/3 space-y-16">
              <div className="space-y-8">
                <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black text-foreground">{t('servicesPage.detail.aboutInitiative')}</h2>
                <div className="text-muted text-lg leading-relaxed space-y-6">
                  {fullContent && fullContent.split('\n').map((para, i) => para.trim() && (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-1 gap-8">
                {features?.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 p-8 bg-muted/5 rounded-[2.5rem] border border-border group hover:bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                  >
                    <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-black text-foreground">{feature.title}</h4>
                      <p className="text-muted leading-relaxed font-medium">{feature.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Share and Action */}
              <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-muted uppercase tracking-widest">{t('servicesPage.detail.shareCause')}</span>
                  <div className="flex gap-3">
                    {[Share2].map((Icon, i) => (
                      <button
                        key={i}
                        onClick={handleShare}
                        className="w-10 h-10 rounded-full bg-muted/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-base md:text-lg hover:bg-primary-hover transition-all shadow-xl active:scale-95 border border-transparent"
                >
                  {t('servicesPage.detail.joinMission')}
                </Link>
              </div>
            </div>

            {/* Sidebar / Info Card */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 space-y-8">
                <div className="bg-primary text-primary-foreground p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                  <div className="relative z-10 space-y-6">
                    <Heart className="w-12 h-12 text-primary-foreground fill-primary-foreground animate-pulse" />
                    <h3 className="text-3xl font-black">{t('servicesPage.detail.impactToday')}</h3>
                    <p className="text-primary-foreground/70 leading-relaxed">{t('servicesPage.detail.impactDescription', { serviceTitle: t(`servicesData.${currentSlug}.title`) })}</p>
                    <div className="space-y-4 pt-4">
                      <button
                        onClick={openDonationModal}
                        className="w-full bg-primary-foreground hover:bg-background text-primary hover:text-foreground py-4 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all shadow-lg active:scale-95">
                        {t('home.hero.donateNow')}
                      </button>
                      <button className="w-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground py-4 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all border border-primary-foreground/10 active:scale-95">
                        {t('servicesPage.detail.becomeVolunteer')}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-8 border-2 border-border rounded-[3rem] space-y-6">
                  <h4 className="text-xl font-black text-foreground">{t('servicesPage.detail.otherServices')}</h4>
                  <div className="space-y-3">
                    {serviceDetails.filter(s => s.slug !== currentSlug).slice(0, 3).map(other => {
                      const OtherIcon = other.icon;
                      return (
                        <Link
                          key={other.slug}
                          href={`/service/${other.slug}`}
                          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/10 transition-all group"
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <OtherIcon className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-foreground text-sm leading-tight">{t(`servicesData.${other.slug}.title`)}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      <AnimatePresence>
        {showCopiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-foreground text-background px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold">Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetailPage;
