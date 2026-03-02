'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Mail,
  Phone,
  Globe,
  ChevronDown,
  Heart,
  Menu,
  X,
  Home,
  Info,
  Briefcase,
  Images,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useDonation } from '@/components/providers/DonationProvider';
import Logo from '@/public/img/logo.png';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openDonationModal } = useDonation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const langRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Update direction based on language
    document.dir = i18n.language === 'ur' ? 'rtl' : 'ltr';

    return () => window.removeEventListener('scroll', handleScroll);
  }, [i18n.language]);

  const navLinks = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.about'), href: '/introduction', icon: Info },
    { name: t('nav.services'), href: '/service', icon: Briefcase },
    { name: t('nav.projects'), href: '/projects', icon: Images },
    { name: t('nav.contact'), href: '/contact', icon: Mail },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <header className="w-full z-1000">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2.5 text-xs md:text-sm border-b border-primary-foreground/10 transition-all duration-300">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <a href="mailto:contact@rarefoundation.com" className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors group">
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">{t('topbar.contactEmail')}</span>
            </a>
            <a href="tel:+923708733223" className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors group">
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span dir="ltr">{t('topbar.contactPhone')}</span>
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative group" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 hover:text-primary-foreground/80 transition-colors px-3 py-1 rounded-full hover:bg-primary-foreground/10"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">{i18n.language === 'ur' ? t('topbar.urdu') : t('topbar.english')}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", isLangOpen ? "rotate-180" : "group-hover:rotate-180")} />
              </button>
              <div className={cn(
                "absolute right-0 mt-2 w-32 bg-card text-foreground rounded-lg shadow-2xl origin-top-right transition-all z-1001 overflow-hidden border border-border",
                isLangOpen ? "scale-100 opacity-100 pointer-events-auto visible" : "scale-0 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible invisible"
              )}>
                <button
                  onClick={() => changeLanguage('en')}
                  className="block w-full text-left px-4 py-2.5 hover:bg-muted/10 transition-colors font-medium"
                >
                  {t('topbar.english')}
                </button>
                <button
                  onClick={() => changeLanguage('ur')}
                  className="block w-full px-4 py-2.5 hover:bg-muted/10 transition-colors font-medium text-right"
                >
                  {t('topbar.urdu')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "sticky top-0 w-full transition-all duration-500 z-1000 border-b border-transparent",
        isScrolled
          ? "bg-card/80 backdrop-blur-lg shadow-lg h-16 border-border/20"
          : "bg-card h-24 md:h-28"
      )}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src={Logo}
                alt="Rare Foundation Logo"
                width={300}
                height={100}
                priority
                className={cn(
                  "w-auto transition-all duration-500 group-hover:scale-105 object-contain dark:invert dark:brightness-200",
                  isScrolled ? "h-10 md:h-12" : "h-14 md:h-20"
                )}
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-foreground font-bold hover:text-primary transition-all relative group py-2 text-xs xl:text-sm uppercase tracking-wider",
                    pathname === link.href && "text-primary"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={openDonationModal}
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 xl:px-8 py-2.5 xl:py-3 rounded-full font-bold text-xs xl:text-sm transition-all shadow-lg hover:shadow-primary/50 flex items-center gap-2 group active:scale-95"
              >
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform fill-transparent group-hover:fill-current" />
                {t('nav.donate')}
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                className="text-foreground p-2 hover:bg-muted/10 rounded-lg transition-colors bg-muted/5 backdrop-blur-sm"
                onClick={toggleMenu}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-2000 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-border/50">
              <Image src={Logo} alt="Logo" width={150} height={50} className="h-14 w-auto dark:invert dark:brightness-200" />
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  onClick={toggleMenu}
                  className="p-2 hover:bg-muted/10 rounded-full transition-colors border border-transparent hover:border-border"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col p-6 overflow-y-auto grow">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 text-foreground font-semibold hover:bg-muted/5 hover:text-primary rounded-2xl transition-all group border border-transparent hover:border-border",
                      pathname === link.href && "bg-muted/5 text-primary border-border"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full bg-muted/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors",
                      pathname === link.href && "bg-primary/10"
                    )}>
                      <link.icon className={cn(
                        "w-5 h-5 text-foreground group-hover:text-primary transition-colors",
                        pathname === link.href && "text-primary"
                      )} />
                    </div>
                    <span className="text-lg">{link.name}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  toggleMenu();
                  openDonationModal();
                }}
                className="bg-linear-to-r from-primary to-primary-hover text-primary-foreground py-4 rounded-2xl mt-4 font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <Heart className="w-5 h-5 fill-current" />
                {t('nav.donateNow')}
              </motion.button>
            </div>

            {/* Footer / Socials */}
            <div className="p-6 border-t border-border/50 bg-muted/5">
              <div className="flex justify-center gap-6">
                {[
                  { Icon: Facebook, href: 'https://www.facebook.com/rarefoundation' },
                  { Icon: Twitter, href: 'https://x.com/rarefoundation' },
                  { Icon: Instagram, href: 'https://www.instagram.com/rarefoundation/' },
                  { Icon: Youtube, href: 'https://www.youtube.com/@rarefoundation' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors p-2"
                  >
                    <social.Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
              <p className="text-center text-xs text-muted mt-4">{t('footer.copyright')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </header>
  );
};

export default Navbar;
