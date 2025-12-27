import { Plan } from '@/lib/data';

export function PlanCard({ plan, highlight }: { plan: Plan; highlight?: boolean }) {
    return (
        <div className={`p-5 rounded-xl border transition-all hover:shadow-md ${highlight ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary/20' : 'border-neutral-200 bg-white'}`}>
            <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium text-neutral-500 uppercase tracking-wider">{plan.validity}</div>
                {highlight && <span className="text-xs font-bold text-white bg-brand-primary px-2 py-0.5 rounded-full">BEST VALUE</span>}
            </div>

            <div className="mb-1">
                <span className="text-4xl font-extrabold text-brand-primary">{(plan.dataMB / (plan.dataMB >= 1000 ? 1024 : 1)).toFixed(plan.dataMB >= 1000 ? 1 : 0)}</span>
                <span className="text-lg font-bold text-neutral-400 ml-1">{plan.dataMB >= 1000 ? 'GB' : 'MB'}</span>
            </div>

            <div className="text-2xl font-bold text-brand-secondary mb-4">₦{plan.price.toLocaleString()}</div>

            <div className="w-full bg-neutral-100 rounded-lg p-2 flex items-center justify-between text-xs">
                <span className="text-neutral-500">Value Score</span>
                <span className="font-bold text-brand-primary">{plan.valueScore.toFixed(2)} MB/₦</span>
            </div>

            <button className="w-full mt-4 py-2 rounded-lg bg-brand-secondary text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                Subscribe
            </button>
        </div>
    );
}
