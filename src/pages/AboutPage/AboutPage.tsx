import { AboutHeroSection } from './sections/AboutHeroSection';
import { CodeOfConductSection } from './sections/CodeOfConductSection';
import { CommunityIntroSection } from './sections/CommunityIntroSection';
import { GoalsSection } from './sections/GoalsSection';

export function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <CommunityIntroSection />
      <GoalsSection />
      <CodeOfConductSection />
    </>
  );
}
