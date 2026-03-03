'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
    const { t } = useTranslation();

    const contactItems = [
        { icon: Phone, title: t('contact.info.call'), info: '+92 3002119323', sub: 'Mon-Sat, 9AM-8PM' },
        { icon: Mail, title: t('contact.info.email'), info: 'contact@rarefoundation.com', sub: 'Response in 24h' },
        { icon: MessageCircle, title: t('contact.info.whatsapp'), info: '+92 3002119323', sub: 'Fastest Response' },
        { icon: Clock, title: t('contact.info.hours'), info: '10:30 AM - 05:30 PM', sub: 'Standard PK Time' },
    ];

    return (
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
                {contactItems.map((item) => (
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
    );
};

export default ContactInfo;
