'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

export const SloganTyper = () => {
  const { t, i18n } = useTranslation();
  const slogans = React.useMemo(() => (t('home.slogans', { returnObjects: true }) as string[]) || [
    "Serving Humanity with Honesty & Trust."
  ], [t]);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Reset typing when language changes during render phase to avoid cascading renders
  const [lastLang, setLastLang] = useState(i18n.language);
  if (lastLang !== i18n.language) {
    setLastLang(i18n.language);
    setIndex(0);
    setSubIndex(0);
    setReverse(false);
  }

  // Blinking cursor effect
  useEffect(() => {
    const blinker = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinker);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!slogans[index]) return; // Safety check

    if (subIndex === slogans[index].length + 1 && !reverse) {
      // Finished typing, wait before deleting
      const timeout = setTimeout(() => {
        setReverse(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      // Finished deleting, switch to next slogan
      // Using a microtask/setTimeout to avoid synchronous setState in effect if triggered too fast
      const timer = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % slogans.length);
      }, 0);
      return () => clearTimeout(timer);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100); // Deleting is faster than typing

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, slogans]);

  return (
    <div className="h-10 md:h-12 lg:h-14 flex items-center">
      <motion.h4
        className="text-primary font-bold text-xl md:text-3xl lg:text-4xl tracking-wide italic leading-tight"
      >
        {slogans[index] ? slogans[index].substring(0, subIndex) : ''}
        <i className={`${blink ? 'opacity-100' : 'opacity-0'} inline-block ms-1 w-1 h-7 md:h-9 lg:h-11 bg-primary align-middle mb-1 transition-opacity duration-100 not-italic`}></i>
      </motion.h4>
    </div>
  );
};
