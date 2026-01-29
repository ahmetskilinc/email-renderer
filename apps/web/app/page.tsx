import DesktopLayout from '@/components/desktop-layout';
import MobileLayout from '@/components/mobile-layout';
import { EditorProvider } from '@/hooks/use-editor';
import { Header } from '@/components/header';

export default function Page() {
  return (
    <EditorProvider>
      <div className="flex h-dvh flex-col bg-zinc-900">
        <Header />
        <DesktopLayout />
        <MobileLayout />
      </div>
    </EditorProvider>
  );
}
