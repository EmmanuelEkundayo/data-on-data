import Link from 'next/link';
import { initialPlans } from '@/lib/data';

export default function Home() {
  const mtnCount = initialPlans.filter(p => p.isp.toLowerCase() === 'mtn').length;
  const airtelCount = initialPlans.filter(p => p.isp.toLowerCase() === 'airtel').length;
  const gloCount = initialPlans.filter(p => p.isp.toLowerCase() === 'glo').length;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-16 animate-in fade-in duration-1000">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-7xl font-black text-brand-secondary tracking-tighter leading-tight">
          Stop Overpaying for <span className="text-brand-text">Data</span>.
        </h1>
        <p className="text-2xl text-neutral-500 font-light leading-relaxed">
          Data-on-Data tracks every plan from MTN, Airtel, and Glo in real-time.
          We calculate the true value score of every bundle so you don't have to.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        <Link href="/mtn" className="group relative overflow-hidden p-10 rounded-3xl bg-[#FFCB05] transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(255,203,5,0.3)] hover:-translate-y-2">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10 text-left">
            <div className="text-5xl font-black text-black mb-4 tracking-tighter">MTN</div>
            <div className="text-black/80 font-bold text-lg">See {mtnCount} Plans</div>
            <div className="mt-8 flex items-center gap-2 text-black font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
              View Dashboard →
            </div>
          </div>
        </Link>

        <Link href="/airtel" className="group relative overflow-hidden p-10 rounded-3xl bg-[#FF0000] transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(255,0,0,0.3)] hover:-translate-y-2">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10 text-left">
            <div className="text-5xl font-black text-white mb-4 tracking-tighter">Airtel</div>
            <div className="text-white/90 font-bold text-lg">See {airtelCount} Plans</div>
            <div className="mt-8 flex items-center gap-2 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
              View Dashboard →
            </div>
          </div>
        </Link>

        <Link href="/glo" className="group relative overflow-hidden p-10 rounded-3xl bg-[#45B649] transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(69,182,73,0.3)] hover:-translate-y-2">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10 text-left">
            <div className="text-5xl font-black text-white mb-4 tracking-tighter">Glo</div>
            <div className="text-white/90 font-bold text-lg">See {gloCount} Plans</div>
            <div className="mt-8 flex items-center gap-2 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
              View Dashboard →
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
