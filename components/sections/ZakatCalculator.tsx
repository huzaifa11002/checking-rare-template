'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle, Coins, Banknote, Building2, Briefcase, MinusCircle, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

// Current Nisab values
const SILVER_TOLA_THRESHOLD = 52.5;
const NISAB_SILVER_PKR = 2640;
const NISAB_THRESHOLD = SILVER_TOLA_THRESHOLD * NISAB_SILVER_PKR; // Approx 138,600

export const ZakatCalculator = () => {
  const { t } = useTranslation();

  const [assets, setAssets] = useState({
    gold: '',
    silver: '',
    cash: '',
    savings: '',
    investments: '',
    businessGoods: '',
    liabilities: '',
  });

  const [result, setResult] = useState<{
    totalAssets: number;
    zakatPayable: number;
    eligible: boolean;
  } | null>(null);

  const handleInputChange = (field: keyof typeof assets, value: string) => {
    setAssets(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculate = () => {
    const gold = parseFloat(assets.gold) || 0;
    const silver = parseFloat(assets.silver) || 0;
    const cash = parseFloat(assets.cash) || 0;
    const savings = parseFloat(assets.savings) || 0;
    const investments = parseFloat(assets.investments) || 0;
    const goods = parseFloat(assets.businessGoods) || 0;
    const loans = parseFloat(assets.liabilities) || 0;

    const total = gold + silver + cash + savings + investments + goods;
    const net = total - loans;
    const payable = Math.max(0, net * 0.025);

    setResult({
      totalAssets: net,
      zakatPayable: payable,
      eligible: net >= NISAB_THRESHOLD
    });
  };

  const reset = () => {
    setAssets({
      gold: '',
      silver: '',
      cash: '',
      savings: '',
      investments: '',
      businessGoods: '',
      liabilities: '',
    });
    setResult(null);
  };

  return (
    <section className="relative py-20 bg-background transition-colors duration-500 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-foreground">
            {t('home.zakat.title')}
          </h2>
          <p className="text-muted text-lg">
            {t('home.zakat.description')}
          </p>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card rounded-[2.5rem] shadow-2xl overflow-hidden border border-border"
        >
          <div className="grid lg:grid-cols-3">
            {/* Left Panel: Inputs */}
            <div className="lg:col-span-2 p-8 md:p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {[
                  { id: 'gold', label: t('home.zakat.inputs.gold'), icon: Coins, color: 'text-yellow-500' },
                  { id: 'silver', label: t('home.zakat.inputs.silver'), icon: Coins, color: 'text-slate-400' },
                  { id: 'cash', label: t('home.zakat.inputs.cash'), icon: Banknote, color: 'text-green-500' },
                  { id: 'savings', label: t('home.zakat.inputs.savings'), icon: Wallet, color: 'text-blue-500' },
                  { id: 'investments', label: t('home.zakat.inputs.investments'), icon: Building2, color: 'text-purple-500' },
                  { id: 'businessGoods', label: t('home.zakat.inputs.business'), icon: Briefcase, color: 'text-orange-500' },
                ].map((item) => (
                  <div key={item.id} className="space-y-3 group">
                    <label className="flex items-center gap-2 text-sm font-bold text-muted uppercase tracking-widest group-focus-within:text-primary transition-colors">
                      <item.icon className={cn("w-4 h-4", item.color)} /> {item.label}
                    </label>
                    <div className="relative">
                      <span className="absolute start-5 top-1/2 -translate-y-1/2 text-muted font-bold">Rs.</span>
                      <input
                        type="number"
                        min="0"
                        value={assets[item.id as keyof typeof assets]}
                        onChange={(e) => handleInputChange(item.id as keyof typeof assets, e.target.value)}
                        placeholder="0"
                        className="w-full ps-14 pe-6 py-4 bg-muted/5 border-2 border-border rounded-2xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-black text-lg text-foreground"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Liabilities Section */}
              <div className="pt-8 border-t border-border">
                <div className="max-w-md">
                  <label className="flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-widest mb-3">
                    <MinusCircle className="w-4 h-4" /> {t('home.zakat.inputs.liabilities')}
                  </label>
                  <div className="relative">
                    <span className="absolute start-5 top-1/2 -translate-y-1/2 text-primary/30 font-bold">Rs.</span>
                    <input
                      type="number"
                      min="0"
                      value={assets.liabilities}
                      onChange={(e) => handleInputChange('liabilities', e.target.value)}
                      placeholder={t('home.zakat.inputs.amountOwed')}
                      className="w-full ps-14 pe-6 py-4 bg-primary/5 border-2 border-primary/10 rounded-2xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-black text-lg text-foreground placeholder:text-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Results */}
            <div className="bg-primary p-8 md:p-12 text-primary-foreground flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-8">
                <div>
                  <h3 className="text-2xl font-black mb-2 flex items-center gap-2 text-primary-foreground">
                    {t('home.zakat.summary.title')}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm font-medium">{t('home.zakat.summary.subtitle')}</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/20">
                    <p className="text-xs font-bold text-primary-foreground/60 uppercase tracking-widest mb-1">{t('home.zakat.summary.netAssets')}</p>
                    <p className="text-2xl md:text-3xl font-black text-primary-foreground">Rs. {result ? result.totalAssets.toLocaleString() : '0'}</p>
                  </div>

                  <div className="bg-primary-foreground text-primary rounded-2xl p-6 shadow-xl transform scale-105">
                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">{t('home.zakat.summary.payable')}</p>
                    <p className="text-3xl md:text-4xl font-black">Rs. {result ? Math.round(result.zakatPayable).toLocaleString() : '0'}</p>
                  </div>
                </div>

                {result && (
                  <div className={cn(
                    "flex items-start gap-3 p-4 rounded-xl text-sm font-bold leading-relaxed",
                    result.eligible ? "bg-green-400/20 text-green-50" : "bg-red-400/20 text-red-50"
                  )}>
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>
                      {result.eligible
                        ? t('home.zakat.summary.eligible')
                        : t('home.zakat.summary.notEligible')
                      }
                    </p>
                  </div>
                )}
              </div>

              <div className="relative z-10 space-y-4 pt-10">
                <button
                  onClick={calculate}
                  className="w-full py-4 bg-primary-foreground text-primary hover:bg-background hover:text-foreground transition-all rounded-xl font-black shadow-lg hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
                >
                  {t('home.zakat.buttons.calculate')}
                </button>
                <button
                  onClick={reset}
                  className="w-full py-3 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <RefreshCw className="w-4 h-4" /> {t('home.zakat.buttons.reset')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
