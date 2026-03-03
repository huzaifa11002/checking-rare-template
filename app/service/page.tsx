'use client';

import React from 'react';
import ServiceHero from '@/components/service/ServiceHero';
import ServiceGrid from '@/components/service/ServiceGrid';
import ServiceCTA from '@/components/service/ServiceCTA';
import '@/lib/i18n';

const ServicePage = () => {
  return (
    <div className="bg-background transition-colors duration-500">
      <ServiceHero />
      <ServiceGrid />
      <ServiceCTA />
    </div>
  );
};

export default ServicePage;
