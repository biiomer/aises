import SongGeneratorForm from '@/components/SongGeneratorForm';

export default function GeneratePage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Yeni Bir Başyapıt <span className="text-blue-500">Yarat.</span></h1>
          <p className="text-white/50 text-lg">AI gücüyle saniyeler içinde Türkçe şarkını üret.</p>
        </div>
        <SongGeneratorForm />
      </div>
    </div>
  );
}
