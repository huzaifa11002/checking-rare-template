'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageCircle,
  Clock
} from 'lucide-react';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

const ContactPage = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);

    // PHP script expects 'number' not 'phone'
    const phone = formData.get('phone') as string;
    formData.append('number', phone);
    formData.delete('phone');

    try {
      const response = await fetch('/php/submit_contact_form.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        alert(data.message || 'Something went wrong. Please try again.');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Contact Form Error:', error);
      setStatus('error');
      alert('Failed to send message. Please check your connection.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-background transition-colors duration-500">
      {/* Page Header */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 right-0 w-200 h-200 bg-primary rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-primary-foreground mb-6"
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20">

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-foreground">{t('contact.form.title')}</h2>
                <p className="text-muted">{t('contact.form.subtitle')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">{t('contact.form.name')}</label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder={t('contact.form.placeholders.name')}
                      className="w-full px-6 py-4 bg-muted/10 border-2 border-border rounded-2xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">{t('contact.form.phone')}</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder={t('contact.form.placeholders.phone')}
                      className="w-full px-6 py-4 bg-muted/10 border-2 border-border rounded-2xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">{t('contact.form.email')}</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder={t('contact.form.placeholders.email')}
                    className="w-full px-6 py-4 bg-muted/10 border-2 border-border rounded-2xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">{t('contact.form.subject')}</label>
                  <input
                    required
                    name="subject"
                    type="text"
                    placeholder={t('contact.form.placeholders.subject')}
                    className="w-full px-6 py-4 bg-muted/10 border-2 border-border rounded-2xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">{t('contact.form.message')}</label>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder={t('contact.form.placeholders.message')}
                    className="w-full px-6 py-4 bg-muted/10 border-2 border-border rounded-4xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold resize-none text-foreground"
                  />
                </div>

                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className={cn(
                    "w-full py-4 md:py-5 rounded-3xl md:rounded-4xl font-black text-lg md:text-xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95",
                    status === 'loading' ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary-hover hover:shadow-primary/20",
                    status === 'error' && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  )}
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-4 border-slate-300 border-t-primary rounded-full animate-spin" />
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      {t('contact.form.sent')}
                    </>
                  ) : status === 'error' ? (
                    <>
                      Try Again
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      {t('contact.form.send')}
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Map Placeholder/Iframe */}
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-border h-96 relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3618.4591213434996!2d67.09570877537269!3d24.91642467789276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDU0JzU5LjEiTiA2N8KwMDUnNTMuOCJF!5e0!3m2!1sen!2s!4v1739300431629!5m2!1sen!2s"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-card/90 backdrop-blur-md rounded-2xl shadow-xl border border-border">
                  <div className="flex gap-4">
                    <MapPin className="text-primary w-6 h-6 shrink-0" />
                    <p className="font-bold text-foreground text-sm">{t('footer.address')}</p>
                  </div>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Phone, title: t('contact.info.call'), info: '+92 3002119323', sub: 'Mon-Sat, 9AM-8PM' },
                  { icon: Mail, title: t('contact.info.email'), info: 'contact@rarefoundation.com', sub: 'Response in 24h' },
                  { icon: MessageCircle, title: t('contact.info.whatsapp'), info: '+92 3002119323', sub: 'Fastest Response' },
                  { icon: Clock, title: t('contact.info.hours'), info: '10:30 AM - 05:30 PM', sub: 'Standard PK Time' },
                ].map((item) => (
                  <div key={item.title} className="bg-muted/10 p-8 rounded-4xl border border-border hover:border-primary/20 transition-all group">
                    <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-black text-foreground mb-1">{item.title}</h4>
                    <p className="font-bold text-muted text-sm" dir="ltr">{item.info}</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted mt-2">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="pt-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 ml-1">{t('contact.info.follow')}</p>
                <SocialIcons
                  className="gap-4"
                  iconContainerClassName="w-14 h-14 bg-card shadow-lg rounded-2xl text-foreground hover:bg-primary hover:text-primary-foreground hover:-translate-y-2 border border-border"
                  iconClassName="text-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs or Support Section */}
      <section className="py-24 bg-muted/10 rounded-t-[5rem] transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
            <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black text-foreground">{t('contact.info.emergency')}</h2>
            <p className="text-muted text-sm md:text-base">{t('contact.info.emergencyText')}</p>
            <a href="tel:+923708733223" className="inline-block mt-4 text-xl md:text-2xl font-black text-primary hover:underline" dir="ltr">+92 3002119323</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
