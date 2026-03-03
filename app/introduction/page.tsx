'use client';

import { useDonation } from '@/components/providers/DonationProvider';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';


//Team Images
import President from '@/public/img/team-img/president.jpeg';
import FinanceSecretary from '@/public/img/team-img/finance-secretary.jpeg';
import GeneralSecretary from '@/public/img/team-img/general-secretary.jpeg';

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
      id: 'president',
      name: t('introduction.team.members.president.name'),
      role: t('introduction.team.members.president.role'),
      image: President,
      delay: 0,
      shortBio: t('introduction.team.members.president.shortBio'),
      fullBio: t('introduction.team.members.president.fullBio')
    },
    {
      id: 'financeSecretary',
      name: t('introduction.team.members.financeSecretary.name'),
      role: t('introduction.team.members.financeSecretary.role'),
      image: FinanceSecretary,
      delay: 0.2,
      shortBio: t('introduction.team.members.financeSecretary.shortBio'),
      fullBio: t('introduction.team.members.financeSecretary.fullBio')
    },
    {
      id: 'generalSecretary',
      name: t('introduction.team.members.generalSecretary.name'),
      role: t('introduction.team.members.generalSecretary.role'),
      image: GeneralSecretary,
      delay: 0.1,
      shortBio: t('introduction.team.members.generalSecretary.shortBio'),
      fullBio: t('introduction.team.members.generalSecretary.fullBio')
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
