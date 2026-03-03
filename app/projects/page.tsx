'use client';

import React, { useState } from 'react';
import { StaticImageData } from 'next/image';
import PageHeader from '@/components/sections/PageHeader';
import GalleryGrid from '@/components/projects/GalleryGrid';
import GalleryLightbox from '@/components/projects/GalleryLightbox';
import GalleryCTA from '@/components/projects/GalleryCTA';
import { useTranslation } from 'react-i18next';
import { projectImages, ProjectImage } from '@/lib/projects-data';
import '@/lib/i18n';

const GalleryPage = () => {
  const [selectedImg, setSelectedImg] = useState<StaticImageData | string | null>(null);
  const [filter, setFilter] = useState('All');
  const { t } = useTranslation();

  const filteredImages = filter === 'All'
    ? projectImages
    : projectImages.filter((img: ProjectImage) => img.category === filter);

  return (
    <div className="bg-background transition-colors duration-500">
      <PageHeader
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
      />

      <GalleryGrid
        filter={filter}
        setFilter={setFilter}
        filteredImages={filteredImages}
        setSelectedImg={setSelectedImg}
      />

      <GalleryLightbox
        selectedImg={selectedImg}
        setSelectedImg={setSelectedImg}
      />

      <GalleryCTA />
    </div>
  );
};

export default GalleryPage;
