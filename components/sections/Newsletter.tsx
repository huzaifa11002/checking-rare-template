'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Newspaper } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import '@/lib/i18n';

export const Newsletter = () => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'exists' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/php/news_letter_email_submission.php', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status === 'success') {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setStatus('idle'), 5000);
            } else if (data.status === 'exists') {
                setStatus('exists');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Newsletter Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section className="py-24 bg-background transition-colors duration-500 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 opacity-30 dark:opacity-20" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-20 dark:opacity-10" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="relative overflow-hidden bg-onyx rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-2xl shadow-onyx/20">
                        {/* Glassmorphism Background Shapes */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-foreground/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
                            {/* Left Content */}
                            <div className="lg:col-span-12 xl:col-span-6 space-y-8">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    className="inline-flex items-center gap-3 px-5 py-2 bg-primary-foreground/10 backdrop-blur-md rounded-full border border-primary-foreground/20"
                                >
                                    <Newspaper className="w-5 h-5 text-primary-foreground/80" />
                                    <span className="text-primary-foreground text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                                        {t('newsletter.tag', 'Monthly Updates')}
                                    </span>
                                </motion.div>

                                <div className="space-y-4">
                                    <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-primary-foreground leading-[1.1] tracking-tight">
                                        {t('newsletter.title')}
                                    </h2>
                                    <p className="text-primary-foreground/80 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                                        {t('newsletter.subtitle')}
                                    </p>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap gap-8 pt-4">
                                    <div className="flex items-center gap-3 text-primary-foreground/60">
                                        <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse" />
                                        <span className="text-xs font-bold uppercase tracking-widest">{t('newsletter.trust.impact', 'Real Impact')}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-primary-foreground/60">
                                        <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse delay-75" />
                                        <span className="text-xs font-bold uppercase tracking-widest">{t('newsletter.trust.no_spam', 'No Spam')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Side */}
                            <div className="lg:col-span-12 xl:col-span-6">
                                <form onSubmit={handleSubmit} className="relative group">
                                    <div className="relative p-2 md:p-3 bg-primary-foreground/5 backdrop-blur-3xl rounded-4xl border-2 border-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-500 shadow-2xl flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-foreground/30 group-focus-within:text-primary-foreground/60 transition-colors">
                                                <Send className="w-5 h-5" />
                                            </div>
                                            <input
                                                required
                                                name="email"
                                                type="email"
                                                placeholder={t('newsletter.placeholder')}
                                                className="w-full pl-16 pr-6 py-5 bg-transparent rounded-2xl text-primary-foreground outline-none transition-all font-bold placeholder:text-primary-foreground/30 text-lg"
                                            />
                                        </div>
                                        <button
                                            disabled={status === 'loading'}
                                            type="submit"
                                            className={cn(
                                                "px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl relative overflow-hidden group/btn",
                                                status === 'loading' ? "bg-primary-foreground/20 text-primary-foreground/50 cursor-not-allowed" : "bg-primary-foreground text-primary hover:bg-primary-hover hover:text-primary-foreground"
                                            )}
                                        >
                                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                            {status === 'loading' ? (
                                                <div className="w-6 h-6 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                            ) : status === 'success' ? (
                                                <CheckCircle2 className="w-6 h-6" />
                                            ) : (
                                                <span className="uppercase tracking-widest">{t('newsletter.button')}</span>
                                            )}
                                            {status === 'loading' && <span className="uppercase tracking-widest text-sm">{t('newsletter.subscribing')}</span>}
                                        </button>
                                    </div>

                                    {/* Detailed Status Feedback */}
                                    <AnimatePresence>
                                        {status !== 'idle' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute -bottom-12 left-0 right-0 text-center sm:text-left sm:pl-8"
                                            >
                                                {status === 'success' && (
                                                    <p className="text-primary-foreground font-black text-sm uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                                                        <CheckCircle2 className="w-4 h-4" /> {t('newsletter.success')}
                                                    </p>
                                                )}
                                                {status === 'exists' && (
                                                    <p className="text-primary-foreground/80 font-bold text-sm italic">{t('newsletter.exists')}</p>
                                                )}
                                                {status === 'error' && (
                                                    <p className="text-red-300 font-bold text-sm">{t('newsletter.error')}</p>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>

                                <p className="mt-8 text-primary-foreground/40 text-[10px] md:text-xs font-medium text-center sm:text-left pl-0 sm:pl-8 leading-relaxed">
                                    By subscribing, you agree to receive digital communications from Rare Foundation.
                                    We respect your <span className="text-primary-foreground/60 underline cursor-pointer hover:text-primary-foreground transition-colors">Privacy Policy</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
