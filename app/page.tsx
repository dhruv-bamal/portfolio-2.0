import { CanvasRoot } from '@/components/three/CanvasRoot';
import { ScrollDirector } from '@/components/three/ScrollDirector';
import { AboutSection } from '@/components/sections/AboutSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { BuildSection } from '@/components/sections/BuildSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FlagshipSection } from '@/components/sections/FlagshipSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { WorkSection } from '@/components/sections/WorkSection';

export default function HomePage() {
  return (
    <>
      {/* The persistent 3D world. Purely decorative: every fact lives in the DOM below. */}
      <CanvasRoot />
      <ScrollDirector />

      <main id="main" className="content-root">
        <HeroSection />
        <FlagshipSection />
        <AboutSection />
        <AchievementsSection />
        <SkillsSection />
        <WorkSection />
        <BuildSection />
        <ContactSection />
      </main>
    </>
  );
}
