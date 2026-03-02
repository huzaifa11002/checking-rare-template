'use client';

import { useDonation } from '@/components/providers/DonationProvider';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

// Import images
import ViceChairman from '@/public/img/ceo-image/vice-chairmain.jpeg';
import Chairman from '@/public/img/ceo-image/chairman.jpeg';
import FinanceSecretary from '@/public/img/ceo-image/finance-secretary.jpeg';

// Import components
import PageHeader from '@/components/sections/PageHeader';
import IntroductionSection from '@/components/introduction/IntroductionSection';
import MissionVision from '@/components/introduction/MissionVision';
import RunningProjects from '@/components/introduction/RunningProjects';
import UpcomingProjects from '@/components/introduction/UpcomingProjects';
import TeamSection from '@/components/sections/TeamSection';
import FutureTargets from '@/components/introduction/FutureTargets';
import IntroductionCTA from '@/components/introduction/IntroductionCTA';

const IntroductionPage = () => {
  const { openDonationModal } = useDonation();
  const { t } = useTranslation();

  const teamMembers = [
    {
      id: 'ceo',
      name: t('introduction.team.members.ceo.name'),
      role: t('introduction.team.members.ceo.role'),
      image: FinanceSecretary,
      delay: 0,
      shortBio: t('introduction.team.members.ceo.shortBio'),
      fullBio: t('introduction.team.members.ceo.fullBio')
    },
    {
      id: 'sarfaraz',
      name: t('introduction.team.members.sarfaraz.name'),
      role: t('introduction.team.members.sarfaraz.role'),
      image: ViceChairman,
      delay: 0.2,
      shortBio: t('introduction.team.members.sarfaraz.shortBio'),
      fullBio: t('introduction.team.members.sarfaraz.fullBio')
    },
    {
      id: 'babar',
      name: t('introduction.team.members.babar.name'),
      role: t('introduction.team.members.babar.role'),
      image: Chairman,
      delay: 0.1,
      shortBio: t('introduction.team.members.babar.shortBio'),
      fullBio: t('introduction.team.members.babar.fullBio')
    },
  ];

  return (
    <div className="bg-background transition-colors duration-500">
      {/* Page Header */}
      <PageHeader
        title={t('introduction.title')}
        subtitle={t('introduction.subtitle')}
      />

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-24">
            {/* Introduction */}
            <IntroductionSection />

            {/* Mission & Vision */}
            <MissionVision />

            {/* Running Projects */}
            <RunningProjects onDonateClick={openDonationModal} />

            {/* Upcoming Projects */}
            <UpcomingProjects />

            {/* Team Section */}
            <TeamSection
              teamMembers={teamMembers}
              onDonateClick={openDonationModal}
            />

            {/* Future Targets */}
            <FutureTargets />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <IntroductionCTA onDonateClick={openDonationModal} />
    </div>
  );
};

export default IntroductionPage;
