'use client';

import PageHeader from '@/components/sections/PageHeader';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import EmergencySection from '@/components/contact/EmergencySection';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-background transition-colors duration-500">
      <PageHeader
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      {/* Main Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <EmergencySection />
    </div>
  );
};

export default ContactPage;
