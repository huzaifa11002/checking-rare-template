'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, Info, CheckCircle2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDonation } from '@/components/providers/DonationProvider'; // Using existing provider

// Current Nisab values (These ideally should be fetched from an API or updated regularly)
const NISAB_SILVER_PKR = 2640; // Example value per tola - highly volatile
const SILVER_TOLA_THRESHOLD = 52.5;

export const ZakatCalculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openDonationModal } = useDonation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // State for user assets
  const [assets, setAssets] = useState({
    gold: 0, // Value in PKR
    silver: 0,
    cash: 0,
    savings: 0,
    investments: 0,
    businessGoods: 0,
    liabilities: 0,
  });

  const [totalAssets, setTotalAssets] = useState(0);
  const [totalZakat, setTotalZakat] = useState(0);
  const [nisabStatus, setNisabStatus] = useState<'eligible' | 'not_eligible' | 'calculating'>('calculating');

  const handleInputChange = (field: keyof typeof assets, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAssets(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const calculateZakat = () => {
    setLoading(true);
    // Simulate calculation delay for effect
    setTimeout(() => {
      const total =
        assets.gold +
        assets.silver +
        assets.cash +
        assets.savings +
        assets.investments +
        assets.businessGoods;

      const netAssets = total - assets.liabilities;
      const zakatPayable = netAssets * 0.025;

      // Determine Nisab threshold (Using Silver as the safer/lower threshold for more eligibility generally, but can be complex)
      // A common simple check: if net assets > equivalent of 52.5 tolas of silver
      const nisabThreshold = SILVER_TOLA_THRESHOLD * NISAB_SILVER_PKR;

      setTotalAssets(netAssets);
      setTotalZakat(Math.max(0, zakatPayable));

      if (netAssets >= nisabThreshold) {
        setNisabStatus('eligible');
      } else {
        setNisabStatus('not_eligible');
      }

      setStep(2);
      setLoading(false);
    }, 1500);
  };

  const resetCalculator = () => {
    setAssets({
      gold: 0,
      silver: 0,
      cash: 0,
      savings: 0,
      investments: 0,
      businessGoods: 0,
      liabilities: 0,
    });
    setStep(1);
    setNisabStatus('calculating');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-90 bg-card text-primary p-4 rounded-full shadow-2xl border-2 border-primary/20 hover:border-primary flex items-center gap-3 group"
      >
        <div className="relative">
          <Calculator className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </div>
        <span className="font-bold text-sm hidden md:block pr-2">Zakat Calculator</span>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-2000 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-card w-full max-w-2xl rounded-4xl shadow-2xl overflow-hidden border border-border"
            >
              {/* Header */}
              <div className="bg-primary p-6 md:p-8 flex justify-between items-center text-primary-foreground">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black mb-1">Zakat Calculator</h2>
                  <p className="text-primary-foreground/80 text-sm font-medium">Simplify your purification process</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {step === 1 ? (
                  <div className="space-y-6">
                    <div className="bg-primary/5 p-4 rounded-xl flex gap-3 text-primary text-sm border border-primary/10">
                      <Info className="w-5 h-5 shrink-0" />
                      <p>Enter quantity/value of your assets in PKR. Nisab is automatically calculated based on current silver rates.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { id: 'gold', label: 'Value of Gold', icon: '🟡' },
                        { id: 'silver', label: 'Value of Silver', icon: '⚪' },
                        { id: 'cash', label: 'Cash in Hand/Bank', icon: '💵' },
                        { id: 'savings', label: 'Savings & Bonds', icon: '🏦' },
                        { id: 'investments', label: 'Stock Investments', icon: '📈' },
                        { id: 'businessGoods', label: 'Business Inventory', icon: '📦' },
                      ].map((item) => (
                        <div key={item.id} className="space-y-2">
                          <label className="text-sm font-bold text-muted uppercase tracking-widest ml-1">
                            {item.icon} {item.label}
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">Rs.</span>
                            <input
                              type="number"
                              min="0"
                              value={assets[item.id as keyof typeof assets] || ''}
                              onChange={(e) => handleInputChange(item.id as keyof typeof assets, e.target.value)}
                              placeholder="0"
                              className="w-full pl-12 pr-4 py-3 bg-muted/5 border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-foreground"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary uppercase tracking-widest ml-1">
                          Current Liabilities / Loans
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 font-bold">Rs.</span>
                          <input
                            type="number"
                            min="0"
                            value={assets.liabilities || ''}
                            onChange={(e) => handleInputChange('liabilities', e.target.value)}
                            placeholder="Amount you owe"
                            className="w-full pl-12 pr-4 py-3 bg-primary/5 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={calculateZakat}
                      disabled={loading}
                      className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span className="w-6 h-6 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      ) : (
                        <>
                          CALCULATE NOW <Calculator className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8 text-center py-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-2">
                      <Calculator className="w-10 h-10 text-primary" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-4xl font-black text-primary">Rs. {Math.round(totalZakat).toLocaleString()}</h3>
                      <p className="text-muted font-bold uppercase tracking-widest text-sm">Total Zakat Payable</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-muted/5 p-6 rounded-2xl border border-border">
                      <div className="text-left space-y-1">
                        <p className="text-xs font-bold text-muted uppercase">Net Assets</p>
                        <p className="text-xl font-bold text-foreground">Rs. {totalAssets.toLocaleString()}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-xs font-bold text-muted uppercase">Status</p>
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase",
                          nisabStatus === 'eligible'
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                          {nisabStatus === 'eligible' ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          {nisabStatus === 'eligible' ? 'Eligible' : 'Not Eligible'}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => {
                          // Pass calculated amount to donation modal if implemented
                          setIsOpen(false);
                          // We might want to pass the calculated zakat amount contextually, 
                          // but for now we just open the modal. User enters amount manually or we enhance DonationProvider later.
                          openDonationModal();
                        }}
                        className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95"
                      >
                        PAY ZAKAT NOW
                      </button>
                      <button
                        onClick={resetCalculator}
                        className="w-full py-4 bg-transparent text-muted hover:text-primary font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" /> Recalculate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
