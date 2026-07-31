import { RecruitSection } from '@/components/sections/RecruitSection/RecruitSection';

import { AboutSection } from './sections/AboutSection';
import { ActivitiesSection } from './sections/ActivitiesSection';
import { HeroSection } from './sections/HeroSection';
import { MembersSection } from './sections/MembersSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ActivitiesSection />
      <MembersSection />
      <RecruitSection />
    </>
  );
}
