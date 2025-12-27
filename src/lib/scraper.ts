
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

interface Plan {
    id: string;
    isp: 'MTN' | 'Airtel' | 'Glo';
    name: string;
    price: number;
    dataMB: number;
    validity: string;
    valueScore: number;
}

function parseDataToMB(dataStr: string): number {
    const normalize = dataStr.toUpperCase().replace(/\s/g, '');
    let mb = 0;
    if (normalize.includes('TB')) {
        mb = parseFloat(normalize) * 1024 * 1024;
    } else if (normalize.includes('GB')) {
        mb = parseFloat(normalize) * 1024;
    } else if (normalize.includes('MB')) {
        mb = parseFloat(normalize);
    }
    return Math.round(mb);
}

function cleanPrice(priceStr: string): number {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
}

export async function scrapePlans() {
    console.log('Starting scraper...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const plans: Plan[] = [];

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });

        // --- SCRAPE MTN ---
        try {
            console.log('Navigating to MTN...');
            await page.goto('https://www.mtn.ng/personal/data/data-plans/', { waitUntil: 'networkidle2', timeout: 60000 });

            // Auto-click tabs if possible (simplified for stability: just scrape what is visible or try to execute JS to get all)
            // MTN often loads all in DOM or via tabs.
            // We will try to extract from _card-deal elements

            const mtnRaw = await page.evaluate(() => {
                const items: any[] = [];
                document.querySelectorAll('._card-deal').forEach((card: any) => {
                    const title = card.querySelector('h3')?.innerText || ''; // "75MB"
                    const priceText = card.querySelector('._card-deal__footer p')?.innerText || '';
                    const validText = (Array.from(card.querySelectorAll('li')).find((li: any) => li.innerText.toLowerCase().includes('valid')) as any)?.innerText || 'N/A';

                    if (title && priceText) {
                        items.push({ name: title + ' Plan', priceRaw: priceText, dataRaw: title, validity: validText });
                    }
                });
                return items;
            });

            mtnRaw.forEach(p => {
                const price = cleanPrice(p.priceRaw);
                const dataMB = parseDataToMB(p.dataRaw);
                if (price > 0 && dataMB > 0) {
                    plans.push({
                        id: `mtn-${dataMB}mb-${price}`,
                        isp: 'MTN',
                        name: p.name,
                        price,
                        dataMB,
                        validity: p.validity,
                        valueScore: dataMB / price
                    });
                }
            });
            console.log(`Scraped ${mtnRaw.length} MTN plans.`);
        } catch (e) {
            console.error('Error scraping MTN:', e);
        }

        // --- SCRAPE AIRTEL ---
        try {
            console.log('Navigating to Airtel...');
            await page.goto('https://www.airtel.com.ng/data/data_offers/data_plans', { waitUntil: 'domcontentloaded', timeout: 60000 });
            // Wait for ajax
            await new Promise(r => setTimeout(r, 5000));

            // Click accordions
            await page.evaluate(() => {
                const headers = Array.from(document.querySelectorAll('p')).filter((p: any) => p.innerText.includes('Plans') || p.innerText.includes('Bundles'));
                headers.forEach((h: any) => h.click());
            });
            await new Promise(r => setTimeout(r, 2000));

            const airtelRaw = await page.evaluate(() => {
                const items: any[] = [];
                document.querySelectorAll('table').forEach((table: any) => {
                    const rows = Array.from(table.querySelectorAll('tr'));
                    rows.forEach((row: any) => {
                        const cells = Array.from(row.querySelectorAll('td'));
                        if (cells.length >= 3) {
                            // Heuristic: Check for price (N) and Volume (GB/MB)
                            const cellTexts = cells.map((c: any) => c.innerText.trim());
                            const pricePart = cellTexts.find(t => t.startsWith('N') || (parseFloat(t.replace(/,/g, '')) > 50 && !t.includes('MB') && !t.includes('GB')));
                            const dataPart = cellTexts.find(t => t.includes('MB') || t.includes('GB'));
                            const validPart = cellTexts.find(t => t.toLowerCase().includes('day') || t.toLowerCase().includes('month') || t.includes('Valid'));

                            if (pricePart && dataPart) {
                                items.push({ name: dataPart + ' Plan', priceRaw: pricePart, dataRaw: dataPart, validity: validPart || 'N/A' });
                            }
                        }
                    });
                });
                return items;
            });

            airtelRaw.forEach(p => {
                const price = cleanPrice(p.priceRaw);
                const dataMB = parseDataToMB(p.dataRaw);
                if (price > 0 && dataMB > 0) {
                    plans.push({
                        id: `airtel-${dataMB}mb-${price}`,
                        isp: 'Airtel',
                        name: p.name,
                        price,
                        dataMB,
                        validity: p.validity,
                        valueScore: dataMB / price
                    });
                }
            });
            console.log(`Scraped ${airtelRaw.length} Airtel plans.`);

        } catch (e) {
            console.error('Error scraping Airtel:', e);
        }

        // --- SCRAPE GLO ---
        try {
            console.log('Navigating to Glo...');
            await page.goto('https://www.gloworld.com/ng/personal/data/data-plans', { waitUntil: 'domcontentloaded', timeout: 60000 });
            await new Promise(r => setTimeout(r, 5000));

            // Expand all
            await page.evaluate(() => {
                document.querySelectorAll('.accordion-toggle.collapsed').forEach((t: any) => t.click());
            });
            await new Promise(r => setTimeout(r, 3000));

            const gloRaw = await page.evaluate(() => {
                const items: any[] = [];
                // Strategy: Buttons with ID data-plan-...
                document.querySelectorAll('button[id^="data-plan-"]').forEach((btn: any) => {
                    const id = btn.id; // data-plan-N500/7 days-1.55GB-2
                    const parts = id.split('-');
                    if (parts.length >= 4) {
                        // parts[2] is N500/7 days
                        // parts[3] is 1.55GB
                        const priceVal = parts[2].split('/')[0];
                        const validVal = parts[2].split('/')[1] || 'N/A';
                        const dataVal = parts[3];
                        items.push({ name: dataVal + ' Plan', priceRaw: priceVal, dataRaw: dataVal, validity: validVal });
                    }
                });
                return items;
            });

            gloRaw.forEach(p => {
                const price = cleanPrice(p.priceRaw);
                const dataMB = parseDataToMB(p.dataRaw);
                if (price > 0 && dataMB > 0) {
                    plans.push({
                        id: `glo-${dataMB}mb-${price}`,
                        isp: 'Glo',
                        name: p.name,
                        price,
                        dataMB,
                        validity: p.validity,
                        valueScore: dataMB / price
                    });
                }
            });
            console.log(`Scraped ${gloRaw.length} Glo plans.`);

        } catch (e) {
            console.error('Error scraping Glo:', e);
        }

    } finally {
        await browser.close();
    }

    // Deduplicate by ID
    const uniquePlans = Array.from(new Map(plans.map(item => [item.id, item])).values());

    // Save to file
    const filePath = path.join(process.cwd(), 'src', 'lib', 'plans.json');
    const dataToSave = {
        lastUpdated: Date.now(),
        plans: uniquePlans
    };
    fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));

    console.log(`Total unique plans saved: ${uniquePlans.length}`);
    return uniquePlans;
}
