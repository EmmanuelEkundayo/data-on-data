
const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'lib', 'plans.json');
const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const gloRaw = [
    { "isp": "Glo", "name": "N50/1 day", "data": "45MB", "price": 50 },
    { "isp": "Glo", "name": "N100/1 day", "data": "125MB", "price": 100 },
    { "isp": "Glo", "name": "N200/2 Days", "data": "275MB", "price": 200 },
    { "isp": "Glo", "name": "N500/7 days", "price": 500, "data": "1.55GB" },
    { "isp": "Glo", "name": "N750/14 Days", "price": 750, "data": "1.1GB" },
    { "isp": "Glo", "name": "N1,000/7 Days", "price": 1000, "data": "3.7GB" },
    { "isp": "Glo", "name": "N1500/7 days", "price": 1500, "data": "6GB" },
    { "isp": "Glo", "name": "N2,000/7 Days", "price": 2000, "data": "9GB" },
    { "isp": "Glo", "name": "N5,000/7 Days", "price": 5000, "data": "24.5GB" },
    { "isp": "Glo", "name": "N1,000/30 days", "price": 1000, "data": "2.6GB" },
    { "isp": "Glo", "name": "N1,500/30 days", "price": 1500, "data": "5.2GB" },
    { "isp": "Glo", "name": "N2,000/30 days", "price": 2000, "data": "6.25GB" },
    { "isp": "Glo", "name": "N2,500/30 days", "price": 2500, "data": "7.25GB" },
    { "isp": "Glo", "name": "N3,000/30 days", "price": 3000, "data": "10.5GB" },
    { "isp": "Glo", "name": "N4,000/30 days", "price": 4000, "data": "12.5GB" },
    { "isp": "Glo", "name": "N5,000/30 days", "price": 5000, "data": "16.5GB" },
    { "isp": "Glo", "name": "N6000/30 Days", "price": 6000, "data": "20.5GB" },
    { "isp": "Glo", "name": "N8,000/30 days", "price": 8000, "data": "28GB" },
    { "isp": "Glo", "name": "N10,000/30 days", "price": 10000, "data": "42GB" },
    { "isp": "Glo", "name": "N15,000/30 days", "price": 15000, "data": "64GB" },
    { "isp": "Glo", "name": "N20,000/30 days", "price": 20000, "data": "107GB" },
    { "isp": "Glo", "name": "N30,000/30 days", "price": 30000, "data": "165GB" },
    { "isp": "Glo", "name": "N60,000/90 days", "price": 60000, "data": "355GB" },
    { "isp": "Glo", "name": "N150,000/1 year", "price": 150000, "data": "1000GB" },
    { "isp": "Glo", "name": "N350/1 Day", "price": 350, "data": "1GB" },
    { "isp": "Glo", "name": "N500/1 Day", "price": 500, "data": "2GB" },
    { "isp": "Glo", "name": "N1500/7 Days", "price": 1500, "data": "5.9GB" },
    { "isp": "Glo", "name": "N50/3 Days", "price": 50, "data": "135MB" },
    { "isp": "Glo", "name": "N100/7 Days", "price": 100, "data": "335MB" },
    { "isp": "Glo", "name": "N300/10 Days", "price": 300, "data": "1.1GB" },
    { "isp": "Glo", "name": "N500/15 Days", "price": 500, "data": "1.8GB" },
    { "isp": "Glo", "name": "N100/1 day", "price": 100, "data": "245MB" },
    { "isp": "Glo", "name": "N200/2 Days", "price": 200, "data": "525MB" },
    { "isp": "Glo", "name": "N500/7 Days", "price": 500, "data": "2.1GB" },
    { "isp": "Glo", "name": "N1,000/30 Days", "price": 1000, "data": "4.2GB" },
    { "isp": "Glo", "name": "N2,000/30 Days", "price": 2000, "data": "10GB" },
    { "isp": "Glo", "name": "N5,000/30 Days", "price": 5000, "data": "32GB" },
    { "isp": "Glo", "name": "N100/1 Day", "price": 100, "data": "300MB" },
    { "isp": "Glo", "name": "N300/3 Days", "price": 300, "data": "1GB" },
    { "isp": "Glo", "name": "N500/7 Days", "price": 500, "data": "1.5GB" },
    { "isp": "Glo", "name": "N1000/30 Days", "price": 1000, "data": "3.5GB" },
    { "isp": "Glo", "name": "N60/1 Night", "price": 60, "data": "350MB" },
    { "isp": "Glo", "name": "N120/1 Night", "price": 120, "data": "750MB" },
    { "isp": "Glo", "name": "N200/1 Hour", "price": 200, "data": "500MB" },
    { "isp": "Glo", "name": "N300/2 Hours", "price": 300, "data": "1GB" },
    { "isp": "Glo", "name": "N200/Sat-Sun", "price": 200, "data": "875MB" },
    { "isp": "Glo", "name": "N500/Sat-Sun", "price": 500, "data": "2.5GB" },
    { "isp": "Glo", "name": "N2,000 Always ON/15 Days", "price": 2000, "data": "6.1GB" },
    { "isp": "Glo", "name": "N3,500 Always ON/30 Days", "price": 3500, "data": "15GB" },
    { "isp": "Glo", "name": "N5,000 Always ON/30 Days", "price": 5000, "data": "30GB" },
    { "isp": "Glo", "name": "N7,000 Always ON/30 Days", "price": 7000, "data": "45GB" }
];

function parseDataToMB(dataStr) {
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

const gloPlans = gloRaw.map(p => {
    const dataMB = parseDataToMB(p.data);
    const validMatch = p.name.match(/\/([0-9a-zA-Z\s]+)/);
    const validity = validMatch ? validMatch[1].trim() : '30 Days';

    return {
        id: `glo-${dataMB}mb-${p.price}`,
        isp: 'Glo',
        name: p.name.includes('Plan') ? p.name : `${p.name} Plan`,
        price: p.price,
        dataMB: dataMB,
        validity: validity,
        valueScore: p.price > 0 ? (dataMB / p.price) : 0
    };
});

// Remove existing Glo plans if any to avoid dupes
const otherPlans = currentData.plans.filter(p => p.isp !== 'Glo');
const finalPlans = [...otherPlans, ...gloPlans];

fs.writeFileSync(filePath, JSON.stringify({
    lastUpdated: Date.now(),
    plans: finalPlans
}, null, 2));

console.log(`Merged ${gloPlans.length} Glo plans. Total: ${finalPlans.length}`);
