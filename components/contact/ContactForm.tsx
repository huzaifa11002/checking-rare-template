'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
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
    );
};

export default ContactForm;
