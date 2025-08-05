import VoiceTranscriber from '@/components/VoiceTranscriber';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <VoiceTranscriber />
        </div>
      </div>
    </div>
  );
}
