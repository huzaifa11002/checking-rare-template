'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Landmark, Smartphone, Heart, Upload, Send, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { cn } from '@/lib/utils';
import { serviceDetails } from '@/lib/service-data';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedQr, setSelectedQr] = React.useState<{ src: string; alt: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/php/submit_donation_form.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
          setStatus('idle');
          onClose();
        }, 3000);
      } else {
        setStatus('error');
        alert(data.message || 'Something went wrong. Please try again.');
        setStatus('idle');
      }
    } catch (error) {
      console.error('Donation Form Error:', error);
      setStatus('error');
      alert('Failed to submit. Please check your connection.');
      setStatus('idle');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-3000"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-5xl h-fit max-h-[90vh] bg-card rounded-4xl md:rounded-[3rem] shadow-2xl z-3001 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 md:p-8 pb-4 flex justify-between items-center bg-card border-b border-border">
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-black text-foreground">{t('donationModal.title')}</h2>
                  <p className="text-muted font-medium text-sm md:text-base">{t('donationModal.subtitle')}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 md:p-3 hover:bg-muted/10 rounded-full transition-colors border border-transparent hover:border-border"
                >
                  <X className="w-6 h-6 text-muted" />
                </button>
              </div>

              <div className="p-6 md:p-8 pt-6 overflow-y-auto w-full custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

                  {/* Left Side: Account Info */}
                  <div className="lg:col-span-12 xl:col-span-5 space-y-8 md:space-y-10">
                    {/* Bank Transfers */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-primary">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Landmark className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">{t('donationModal.bankTransfers')}</h3>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            bank: 'Bank Name',
                            bankColor: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary',
                            title: 'Rare Foundation',
                            account: 'xxxxxxxxxxxx',
                            iban: 'xxxxxxxxxxxx',
                            qr: '/img/qr/faysalbank.jpeg',
                            color: 'border-primary/20 bg-primary/5'
                          },
                          {
                            bank: 'Bank Name',
                            bankColor: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary',
                            title: 'Rare Foundation',
                            account: 'xxxxxxxxxxxx',
                            iban: 'xxxxxxxxxxxx',
                            qr: '/img/qr/dubaibank.jpeg',
                            color: 'border-primary/20 bg-primary/5 dark:bg-primary/10'
                          }
                        ].map((bank) => (
                          <div key={bank.account} className={cn("p-5 rounded-4xl border-2 group hover:scale-[1.02] transition-transform cursor-pointer flex flex-col md:flex-row gap-6", bank.color)}>
                            {/* Left Side: QR Code */}
                            {bank.qr && (
                              <button
                                onClick={() => setSelectedQr({ src: bank.qr!, alt: `${bank.bank} QR` })}
                                className="relative w-28 h-28 rounded-2xl overflow-hidden border border-border bg-background p-1 shrink-0 shadow-lg active:scale-95 transition-transform mx-auto md:mx-0"
                              >
                                <Image
                                  src={bank.qr}
                                  alt={`${bank.bank} QR`}
                                  fill
                                  className="object-contain"
                                />
                                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                  <span className="text-[10px] font-black text-black/40 uppercase tracking-tighter">Enlarge</span>
                                </div>
                              </button>
                            )}

                            {/* Right Side: Details */}
                            <div className="flex-1 space-y-4">
                              <div className="flex justify-between items-start">
                                <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", bank.bankColor)}>
                                  {bank.bank}
                                </span>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-1">{t('donationModal.titleField')}</p>
                                  <p className="text-sm font-bold text-foreground leading-tight">{bank.title}</p>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-0.5">Account #</p>
                                    <p className="text-lg font-mono font-black text-primary select-all tracking-wider">{bank.account}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-0.5">{t('donationModal.ibanField')}</p>
                                    <p className="text-[10px] font-mono font-bold text-muted select-all break-all">{bank.iban}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Wallets */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-secondary">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{t('donationModal.wallets')}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-4">
                        {[
                          { provider: 'Bank Name', name: 'Name', number: 'xxxxxxxxxxxx', color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400', qr: '/img/qr/jazzcash.png' },
                          { provider: 'Bank Name', name: 'Name', number: 'xxxxxxxxxxxx', color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400', qr: '/img/qr/easypaisa.png' }
                        ].map((wallet) => (
                          <div key={wallet.provider} className="bg-card p-5 rounded-2xl border-2 border-border flex items-center justify-between group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => setSelectedQr({ src: wallet.qr, alt: `${wallet.provider} QR` })}
                                className="relative w-24 h-24 rounded-xl overflow-hidden border border-border bg-muted/5 shrink-0 active:scale-95 transition-transform"
                              >
                                <Image
                                  src={wallet.qr}
                                  alt={`${wallet.provider} QR`}
                                  fill
                                  className="object-contain p-1"
                                />
                              </button>
                              <div className="space-y-1">
                                <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", wallet.color)}>
                                  {wallet.provider}
                                </span>
                                <p className="text-lg font-black text-foreground">{wallet.number}</p>
                                <p className="text-[10px] text-muted font-bold">{wallet.name}</p>
                              </div>
                            </div>
                            <div className="w-10 h-10 bg-muted/5 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                              <Heart className="w-5 h-5" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Divider for Desktop */}
                  <div className="xl:col-span-1 xl:block hidden">
                    <div className="h-full w-px bg-border mx-auto" />
                  </div>

                  {/* Right Side: Confirmation Form */}
                  <div className="lg:col-span-12 xl:col-span-6 space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-foreground">{t('donationModal.confirmTitle')}</h3>
                      <p className="text-muted text-sm font-medium">{t('donationModal.confirmSubtitle')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="full_name" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-3">{t('donationModal.form.fullName')}</label>
                          <input
                            required
                            id="full_name"
                            name="full_name"
                            type="text"
                            className="w-full px-5 py-3.5 bg-muted/5 border-2 border-transparent focus:border-primary focus:bg-card rounded-2xl outline-none transition-all font-bold text-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email_address" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-3">{t('donationModal.form.email')}</label>
                          <input
                            required
                            id="email_address"
                            name="email_address"
                            type="email"
                            className="w-full px-5 py-3.5 bg-muted/5 border-2 border-transparent focus:border-primary focus:bg-card rounded-2xl outline-none transition-all font-bold text-foreground"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="donation_amount" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-3">{t('donationModal.form.amount')}</label>
                          <input
                            required
                            id="donation_amount"
                            name="donation_amount"
                            type="number"
                            className="w-full px-5 py-3.5 bg-muted/5 border-2 border-transparent focus:border-primary focus:bg-card rounded-2xl outline-none transition-all font-bold text-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="purpose_of_donation" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-3">{t('donationModal.form.purpose')}</label>
                          <select
                            id="purpose_of_donation"
                            name="purpose_of_donation"
                            className="w-full px-5 py-3.5 bg-muted/5 border-2 border-transparent focus:border-primary focus:bg-card rounded-2xl outline-none transition-all font-bold text-foreground"
                          >
                            <option value="General Donation">{t('home.donationBar.options.general')}</option>
                            {serviceDetails.map((service) => (
                              <option key={service.slug} value={t(`servicesData.${service.slug}.title`)}>
                                {t(`servicesData.${service.slug}.title`)}
                              </option>
                            ))}
                            <option value="Medical Assistance">{t('home.donationBar.options.medical')}</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="comment" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-3">{t('donationModal.form.comment')}</label>
                        <textarea
                          id="comment"
                          name="comment"
                          rows={3}
                          className="w-full px-5 py-3.5 bg-muted/5 border-2 border-transparent focus:border-primary focus:bg-card rounded-2xl outline-none transition-all font-bold text-foreground resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="receipt" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-3">{t('donationModal.form.receipt')}</label>
                        <div className="relative group/file">
                          <input
                            required
                            id="receipt"
                            name="receipt"
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full px-5 py-8 bg-muted/5 border-2 border-dashed border-border group-hover/file:border-primary group-hover/file:bg-primary/5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all">
                            <Upload className="w-8 h-8 text-muted/30 group-hover/file:text-primary transition-colors" />
                            <span className="text-sm font-bold text-muted group-hover/file:text-primary/70">{t('donationModal.form.receipt')}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        disabled={status === 'loading'}
                        type="submit"
                        className={cn(
                          "w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95",
                          status === 'loading' ? "bg-muted/10 text-muted cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary-hover"
                        )}
                      >
                        {status === 'loading' ? (
                          <>
                            <div className="w-5 h-5 border-3 border-muted/30 border-t-primary rounded-full animate-spin" />
                            {t('donationModal.form.submitting')}
                          </>
                        ) : status === 'success' ? (
                          <>
                            <CheckCircle2 className="w-6 h-6" />
                            {t('donationModal.form.success')}
                          </>
                        ) : (
                          <>
                            <Send className="w-6 h-6" />
                            {t('donationModal.form.submit')}
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedQr && (
          <div className="fixed inset-0 z-6000 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQr(null)}
              className="fixed inset-0 bg-primary/90 backdrop-blur-xl cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm aspect-square bg-card rounded-[3rem] p-10 shadow-2xl z-6001 flex flex-col items-center justify-center gap-6"
            >
              <button
                onClick={() => setSelectedQr(null)}
                className="absolute top-6 right-6 p-2 hover:bg-muted/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-muted" />
              </button>

              <div className="relative w-full h-full">
                <Image
                  src={selectedQr.src}
                  alt={selectedQr.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="text-center space-y-1">
                <p className="font-black text-foreground text-lg">{selectedQr.alt}</p>
                <p className="text-sm font-bold text-muted uppercase tracking-widest">Scan to pay securely</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DonationModal;
