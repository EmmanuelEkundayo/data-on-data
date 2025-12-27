
import { initialPlans as plans, hotspots, lastUpdated } from '@/lib/data';
import { PlanCard } from '@/components/PlanCard';
import { notFound } from 'next/navigation';

export default async function ISPPage({ params }: { params: Promise<{ isp: string }> }) {
    const { isp } = await params;

    if (!['mtn', 'airtel', 'glo'].includes(isp.toLowerCase())) {
        return notFound();
    }

    const ispDisplay = isp.charAt(0).toUpperCase() + isp.slice(1);
    const ispPlans = plans.filter(p => p.isp.toLowerCase() === isp.toLowerCase());

    // Categorize
    const lowVol = ispPlans.filter(p => p.price <= 1500).sort((a, b) => b.valueScore - a.valueScore);
    const midVol = ispPlans.filter(p => p.dataMB > 2000 && p.dataMB <= 40000 && p.price > 1500).sort((a, b) => b.valueScore - a.valueScore);
    const highVol = ispPlans.filter(p => p.dataMB > 40000).sort((a, b) => b.valueScore - a.valueScore);

    // Fallbacks if empty categories
    const bestLow = lowVol.length > 0 ? lowVol[0] : null;
    const bestMid = midVol.length > 0 ? midVol[0] : (ispPlans.length > 0 ? ispPlans[0] : null);
    const bestHigh = highVol.length > 0 ? highVol[0] : null;

    const stateHotspots = hotspots.filter(h => h.isp.toLowerCase() === isp.toLowerCase()).sort((a, b) => b.coverageScore - a.coverageScore);

    const hoursAgo = Math.floor((Date.now() - lastUpdated) / (1000 * 60 * 60));
    const timeDisplay = hoursAgo < 1 ? 'Just now' : `${hoursAgo} hours ago`;

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-4 border-b border-neutral-200 pb-8">
                <div className="inline-flex self-start px-3 py-1 rounded-full bg-brand-primary/10 text-brand-text font-bold text-sm uppercase tracking-wide">
                    {ispDisplay} Network
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-brand-secondary">
                    Data Plans
                </h1>
                <p className="text-xl text-neutral-500 max-w-2xl">
                    We've analyzed {ispPlans.length} plans to find the best value for your money.
                    Prices updated <span className="font-semibold text-brand-secondary">{timeDisplay}</span>.
                </p>
            </header>

            {/* Best for You Section */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-brand-secondary">Best Value Picks</h2>
                    <div className="text-sm text-brand-text font-medium hover:underline cursor-pointer">How we calculate this?</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Low Volume */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-brand-primary/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 -z-10"></div>
                        <div className="mb-4 px-2">
                            <h3 className="font-bold text-lg">Budget Friendly</h3>
                            <p className="text-sm text-neutral-500">Best under ₦1,500</p>
                        </div>
                        {bestLow ? <PlanCard plan={bestLow} highlight /> : <div className="p-8 text-center text-neutral-400 bg-white rounded-xl border border-dashed">No plans</div>}
                    </div>

                    {/* Medium Volume */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-brand-primary/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 -z-10"></div>
                        <div className="mb-4 px-2">
                            <h3 className="font-bold text-lg">Daily Driver</h3>
                            <p className="text-sm text-neutral-500">Best 2GB - 40GB</p>
                        </div>
                        {bestMid ? <PlanCard plan={bestMid} highlight /> : <div className="p-8 text-center text-neutral-400 bg-white rounded-xl border border-dashed">No plans</div>}
                    </div>

                    {/* High Volume */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-brand-primary/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 -z-10"></div>
                        <div className="mb-4 px-2">
                            <h3 className="font-bold text-lg">Heavy User</h3>
                            <p className="text-sm text-neutral-500">Best 100GB+</p>
                        </div>
                        {bestHigh ? <PlanCard plan={bestHigh} highlight /> : <div className="p-8 text-center text-neutral-400 bg-white rounded-xl border border-dashed">No big plans found</div>}
                    </div>
                </div>
            </section>

            {/* Full List */}
            <section className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-brand-secondary/5">
                    <h3 className="text-xl font-bold text-brand-secondary">All Available Plans</h3>
                    <button className="text-xs font-semibold uppercase tracking-wider text-brand-text border border-brand-primary/30 px-3 py-1.5 rounded-lg hover:bg-brand-primary hover:text-brand-contrast transition-colors">
                        Download CSV
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-100">
                            <tr>
                                <th className="p-6">Plan Name</th>
                                <th className="p-6">Price</th>
                                <th className="p-6">Data Volume</th>
                                <th className="p-6">Validity</th>
                                <th className="p-6">Value Score</th>
                                <th className="p-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-sm">
                            {ispPlans.map(plan => (
                                <tr key={plan.id} className="hover:bg-brand-primary/5 transition-colors group">
                                    <td className="p-6 font-bold text-neutral-700">{plan.name}</td>
                                    <td className="p-6 text-brand-secondary">₦{plan.price.toLocaleString()}</td>
                                    <td className="p-6 font-medium">{(plan.dataMB / (plan.dataMB >= 1000 ? 1024 : 1)).toFixed(2)} {plan.dataMB >= 1000 ? 'GB' : 'MB'}</td>
                                    <td className="p-6 text-neutral-500">{plan.validity}</td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-16 bg-neutral-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-brand-primary" style={{ width: `${Math.min(plan.valueScore * 20, 100)}% ` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-neutral-600">{plan.valueScore.toFixed(1)}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-text font-bold hover:underline">
                                            Select
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Network Hotspots */}
            <section>
                <h3 className="text-2xl font-bold mb-6">Network Hotspots ({ispDisplay})</h3>
                <p className="text-neutral-500 mb-6">Top performing locations based on 4G/5G signal strength.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {stateHotspots.map((spot, i) => (
                        <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-white to-neutral-50 border border-neutral-100 hover:border-brand-primary/30 hover:shadow-lg transition-all text-center">
                            <div className="text-xs font-bold text-neutral-400 mb-2 uppercase tracking-widest">Rank #{i + 1}</div>
                            <div className="font-black text-xl text-brand-secondary mb-1">{spot.state}</div>
                            <div className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700">
                                {spot.coverageScore}% Coverage
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
