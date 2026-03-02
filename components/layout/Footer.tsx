'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { SocialIcons } from '@/components/ui/SocialIcons';
import Logo from '@/public/img/logo.png';
import { serviceDetails } from '@/lib/service-data';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-onyx text-primary-foreground pt-20 pb-10 overflow-hidden relative transition-colors duration-500">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <Image
                src={Logo}
                alt="Rare Logo"
                width={250}
                height={80}
                className="h-16 md:h-20 w-auto group-hover:scale-105 transition-all duration-500 object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-primary-foreground/60 leading-relaxed text-sm md:text-base">
              {t('footer.brandText')}
            </p>
            <div className="flex gap-4">
              <SocialIcons
                className="gap-4"
                iconContainerClassName="w-10 h-10 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground hover:text-primary hover:-translate-y-1 border border-primary-foreground/10 text-primary-foreground"
                iconClassName="text-lg"
              />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-primary-foreground font-bold text-lg mb-8 relative inline-block">
              {t('footer.quickLinks')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-foreground/20 rounded-full"></span>
            </h5>
            <ul className="space-y-4 text-sm md:text-base">
              {[
                { name: t('footer.links.home'), href: '/' },
                { name: t('footer.links.about'), href: '/introduction' },
                { name: 'Message from Chairman', href: '/introduction#team' },
                { name: t('footer.links.services'), href: '/service' },
                { name: t('footer.links.projects'), href: '/projects' },
                { name: t('footer.links.contact'), href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary-foreground transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 text-primary-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h5 className="text-primary-foreground font-bold text-lg mb-8 relative inline-block">
              {t('footer.whatWeDo')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-foreground/20 rounded-full"></span>
            </h5>
            <ul className="space-y-4 text-sm md:text-base">
              {serviceDetails.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link href={`/service/${service.slug}`} className="hover:text-primary-foreground transition-colors flex items-center gap-2 group text-primary-foreground/60">
                    <ChevronRight className="w-4 h-4 text-primary-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {t(`servicesData.${service.slug}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h5 className="text-primary-foreground font-bold text-lg mb-8 relative inline-block">
              {t('footer.contactDetail')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-foreground/20 rounded-full"></span>
            </h5>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center shrink-0 border border-primary-foreground/10">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="text-xs text-primary-foreground/60 pt-1 leading-relaxed">
                  {t('footer.address')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center shrink-0 border border-primary-foreground/10">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <a href="tel:+923708733223" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors font-medium" dir="ltr">
                  +92 3002119323
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center shrink-0 border border-primary-foreground/10">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <a href="mailto:contact@rarefoundation.com" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors font-medium">
                  contact@rarefoundation.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-sm text-primary-foreground/40">
              &copy; {currentYear} {t('footer.copyright')}
            </p>
            <span className="hidden md:inline text-primary-foreground/10">|</span>
            <p className="text-sm text-primary-foreground/40">
              {t('footer.developedBy')}{' '}
              <Link
                href="https://techharf.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-semibold"
              >
                {t('footer.techHarf')}
              </Link>
            </p>
          </div>
          <div className="flex gap-8 text-xs text-primary-foreground/40">
            <Link href="#" className="hover:text-primary-foreground transition-colors">{t('footer.privacyPolicy')}</Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">{t('footer.termsOfService')}</Link>
            <Link href="/contact" className="hover:text-primary-foreground transition-colors">{t('footer.supportCenter')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
