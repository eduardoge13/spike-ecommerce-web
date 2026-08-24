import type { ReactNode } from 'react';
import RevealController from './RevealController';
import ShowroomFooter from './ShowroomFooter';
import ShowroomHeader from './ShowroomHeader';

export default function PublicPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="store-shell min-h-screen overflow-hidden bg-[#07142f] text-white">
      <RevealController />
      <ShowroomHeader />
      <main>{children}</main>
      <ShowroomFooter />
    </div>
  );
}
