import { RecruitSection } from '@/components/sections/RecruitSection/RecruitSection';

import { ContactSection } from './sections/ContactSection';
import { JoinSection } from './sections/JoinSection';
import { RoleSection } from './sections/RoleSection';
import { ScheduleSection } from './sections/ScheduleSection';
import { schedules } from './sections/recruitData';

export function RecruitPage() {
  return (
    <>
      <RecruitSection variant="page" />
      <JoinSection />
      <RoleSection />
      <ScheduleSection schedule={schedules[0]} />
      <ScheduleSection schedule={schedules[1]} />
      <ContactSection />
    </>
  );
}
