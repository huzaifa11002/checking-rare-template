'use client';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

export const WhatsAppButton = () => {
  const { t } = useTranslation();
  const phoneNumber = '923002119323';
  const message = t('whatsapp.message');

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, translateY: -5 }}
      className="fixed bottom-20 right-8 z-4000 bg-[#25D366] text-primary-foreground p-3.5 rounded-full shadow-2xl flex items-center justify-center border-4 border-card group transition-all"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      <span className="absolute right-full mr-4 px-4 py-2 bg-card text-foreground text-sm font-black rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
        {t('whatsapp.chatWithUs')}
      </span>
    </motion.a>
  );
};
