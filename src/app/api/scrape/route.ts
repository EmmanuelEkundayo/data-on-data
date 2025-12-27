
import { NextResponse } from 'next/server';
import { scrapePlans } from '@/lib/scraper';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const plans = await scrapePlans();
        return NextResponse.json({ success: true, count: plans.length, plans });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
