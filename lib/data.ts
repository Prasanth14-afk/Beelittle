import { addDays, format, subDays } from 'date-fns';
import { StoreData, StoreId, SKU, SalesData, CategoryPerformance, VMData, InventoryAlert, KPI, Order, Document, PaymentStats, RegionalSales } from './types';

const CATEGORIES = ['Newborn Essentials', 'Toddler Boys', 'Toddler Girls', 'Baby Gear', 'Feeding & Nursing', 'Toys & Gifts'];
const STORES: StoreId[] = ['Tirupur', 'Coimbatore', 'Chennai'];

// Helper to generate random integer
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
// Helper to generate random float
const randomFloat = (min: number, max: number, decimals = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

// Generate Sales History (Last 30 days)
const generateSalesHistory = (): SalesData[] => {
    const history: SalesData[] = [];
    for (let i = 29; i >= 0; i--) {
        const date = subDays(new Date(), i);
        // Add some seasonality/randomness
        const baseRevenue = 50000;
        const randomFactor = randomFloat(0.8, 1.2);
        const weekendBoost = (date.getDay() === 0 || date.getDay() === 6) ? 1.3 : 1.0;

        history.push({
            date: format(date, 'yyyy-MM-dd'),
            revenue: Math.round(baseRevenue * randomFactor * weekendBoost),
            orders: Math.round((baseRevenue * randomFactor * weekendBoost) / 1200), // Avg order value ~1200
            footfall: Math.round((baseRevenue * randomFactor * weekendBoost) / 400 * randomFloat(0.8, 1.2)) // Conversion ~30%
        });
    }
    return history;
};

// Generate SKUs
const generateSKUs = (count: number): SKU[] => {
    const productTypes = [
        'Cotton Romper', 'Muslin Swaddle', 'Diaper Bag', 'Feeding Bottle', 'Soft Toy',
        'Party Dress', 'Denim Dungaree', 'Baby Walker', 'Teether Set', 'Crib Sheet'
    ];

    const skus: SKU[] = [];
    for (let i = 0; i < count; i++) {
        const category = CATEGORIES[randomInt(0, CATEGORIES.length - 1)];
        const type = productTypes[randomInt(0, productTypes.length - 1)];
        const price = randomInt(299, 3999);
        const stock = randomInt(0, 150);
        const sellThrough = randomFloat(10, 95);
        let status: SKU['status'] = 'Normal';
        if (sellThrough > 80) status = 'Fast Moving';
        if (sellThrough < 20) status = 'Slow Moving';
        if (stock > 100 && sellThrough < 15) status = 'Dead Stock';

        skus.push({
            id: `SKU-${1000 + i}`,
            name: `Premium ${type} - ${category.split(' ')[0]}`,
            category,
            price,
            stockOnHand: stock,
            sellThroughRate: sellThrough,
            daysSalesInventory: randomInt(5, 120),
            status,
            replenishmentNeeded: stock < 20 && sellThrough > 50,
            replenishmentQty: stock < 20 ? randomInt(50, 100) : 0,
            lastRestocked: format(subDays(new Date(), randomInt(1, 60)), 'yyyy-MM-dd'),
        });
    }
    return skus;
};

// Generate VM Data
const generateVMData = (): VMData[] => {
    return [
        {
            campaignName: 'Newborn Essentials Fair',
            startDate: format(subDays(new Date(), 45), 'yyyy-MM-dd'),
            endDate: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
            complianceScore: randomInt(85, 98),
            salesUplift: randomFloat(12, 25),
            beforeSales: randomInt(40000, 45000),
            afterSales: randomInt(50000, 60000),
            auditResult: 'Pass',
            windowDisplayRating: 4.5,
            floorDisplayRating: 4.2,
        },
        {
            campaignName: 'Diwali Kids Collection',
            startDate: format(subDays(new Date(), 90), 'yyyy-MM-dd'),
            endDate: format(subDays(new Date(), 80), 'yyyy-MM-dd'),
            complianceScore: randomInt(90, 100),
            salesUplift: randomFloat(30, 50),
            beforeSales: randomInt(45000, 50000),
            afterSales: randomInt(70000, 90000),
            auditResult: 'Pass',
            windowDisplayRating: 5.0,
            floorDisplayRating: 4.9,
        },
        {
            campaignName: 'Summer Cotton Fest',
            startDate: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
            endDate: format(new Date(), 'yyyy-MM-dd'),
            complianceScore: randomInt(70, 90),
            salesUplift: randomFloat(5, 15),
            beforeSales: randomInt(42000, 48000),
            afterSales: randomInt(45000, 55000),
            auditResult: randomInt(0, 1) ? 'Warning' : 'Pass',
            windowDisplayRating: 3.8,
            floorDisplayRating: 4.0,
        }
    ];
};

// Generate Orders
const generateOrders = (count: number): Order[] => {
    const names = ['Priya M', 'Divya S', 'Karthik R', 'Anitha K', 'Rahul V', 'Sangeetha P', 'Lakshmi N', 'Vikram S'];
    const orders: Order[] = [];
    for (let i = 0; i < count; i++) {
        orders.push({
            id: `ORD-${randomInt(10000, 99999)}`,
            customerName: names[randomInt(0, names.length - 1)],
            date: format(subDays(new Date(), randomInt(0, 7)), 'yyyy-MM-dd HH:mm'),
            items: randomInt(1, 5),
            total: randomInt(800, 8000),
            status: Math.random() > 0.9 ? 'Returned' : Math.random() > 0.8 ? 'Pending' : 'Completed',
            paymentMethod: Math.random() > 0.6 ? 'UPI' : Math.random() > 0.3 ? 'Card' : 'Cash'
        })
    }
    return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate Documents
const generateDocuments = (): Document[] => {
    return [
        { id: 'DOC-001', title: 'Monthly Sales Report - Nov', type: 'Report', date: '2024-12-01', size: '2.4 MB' },
        { id: 'DOC-002', title: 'VM Audit Checklist', type: 'Audit', date: '2024-12-10', size: '1.1 MB' },
        { id: 'DOC-003', title: 'Inventory Stock Sheet', type: 'Report', date: '2024-12-22', size: '4.5 MB' },
        { id: 'DOC-004', title: 'Festive Campaign Guidelines', type: 'Policy', date: '2024-11-20', size: '8.2 MB' },
        { id: 'DOC-005', title: 'Invoice #INV-2024-001', type: 'Invoice', date: '2024-12-20', size: '150 KB' },
    ];
}

const generatePaymentStats = (totalSales: number): PaymentStats[] => {
    const upi = Math.round(totalSales * 0.45);
    const card = Math.round(totalSales * 0.35);
    const cash = totalSales - upi - card;
    return [
        { method: 'UPI', amount: upi, percentage: 45 },
        { method: 'Card', amount: card, percentage: 35 },
        { method: 'Cash', amount: cash, percentage: 20 },
    ];
}

const generateRegionalSales = (totalSales: number): RegionalSales[] => {
    const regions = [
        'Chennai', 'Coimbatore', 'Tiruppur', // Top 3 forced
        'Madurai', 'Tiruchirappalli', 'Salem',
        'Tirunelveli', 'Erode', 'Vellore', 'Thoothukkudi',
        'Kancheepuram', 'Thiruvallur', 'Cuddalore', 'Dindigul'
    ];

    return regions.map(region => {
        let baseAmount = totalSales / 15; // Average base
        let multiplier = 1.0;

        // Force Top 3 Hierarchy
        if (region === 'Chennai') multiplier = 5.0;      // #1 clearly
        else if (region === 'Coimbatore') multiplier = 4.0; // #2
        else if (region === 'Tiruppur') multiplier = 3.5;   // #3
        else if (['Madurai', 'Tiruchirappalli', 'Salem'].includes(region)) multiplier = 1.5; // Tier 2
        else multiplier = randomFloat(0.3, 0.8); // Rest are smaller

        // Add small variance but not enough to break hierarchy for top 3
        const variance = region === 'Chennai' || region === 'Coimbatore' || region === 'Tiruppur'
            ? randomFloat(0.95, 1.05)
            : randomFloat(0.5, 1.5);

        const sales = Math.round(baseAmount * multiplier * variance);

        return {
            region,
            sales,
            growth: randomFloat(-5, 20),
            percentage: 0 // calculate after
        };
    }).sort((a, b) => b.sales - a.sales).map(item => ({
        ...item,
        percentage: Math.round((item.sales / totalSales) * 100)
    }));
}

export const generateStoreData = (storeId: StoreId): StoreData => {
    const salesHistory = generateSalesHistory();
    const totalSales = salesHistory.reduce((acc, curr) => acc + curr.revenue, 0);
    const skus = generateSKUs(50);

    const topSkus = [...skus].sort((a, b) => b.sellThroughRate - a.sellThroughRate).slice(0, 5);
    const slowSkus = [...skus].sort((a, b) => a.sellThroughRate - b.sellThroughRate).slice(0, 5);

    const inventoryAlerts: InventoryAlert[] = skus
        .filter(s => s.replenishmentNeeded || s.status === 'Dead Stock')
        .map(s => ({
            id: `ALERT-${s.id}`,
            skuId: s.id,
            skuName: s.name,
            type: (s.status === 'Dead Stock' ? 'High Age' : 'Low Stock') as InventoryAlert['type'],
            severity: (s.status === 'Dead Stock' ? 'Warning' : 'Critical') as InventoryAlert['severity'],
            message: s.status === 'Dead Stock' ? 'Item is not moving. Visual change recommended.' : 'Stock critical. Replenish immediately.'
        })).slice(0, 5);

    const kpi: KPI = {
        totalSales,
        salesGrowth: randomFloat(5, 20),
        conversionRate: randomFloat(15, 35),
        conversionImpact: randomFloat(2, 5),
        stockVelocity: randomFloat(50, 150),
        outOfStockRisk: skus.filter(s => s.stockOnHand < 10).length,
        overstockAlerts: skus.filter(s => s.status === 'Dead Stock').length,
        vmCompliance: randomInt(80, 99)
    };

    const categoryPerformance: CategoryPerformance[] = CATEGORIES.map(cat => {
        const revenue = randomInt(totalSales * 0.1, totalSales * 0.3);
        return {
            category: cat,
            revenue,
            percentage: Math.round((revenue / totalSales) * 100),
            growth: randomFloat(-5, 15)
        };
    });

    return {
        storeId,
        kpi,
        salesHistory,
        categoryPerformance,
        topSkus,
        slowSkus,
        vmCampaigns: generateVMData(),
        inventoryAlerts,
        inventoryTurnover: randomFloat(3, 8),
        recentOrders: generateOrders(20),
        documents: generateDocuments(),
        paymentStats: generatePaymentStats(totalSales),
        regionalSales: generateRegionalSales(totalSales)
    };
};

export const ALL_DATA: Record<StoreId, StoreData> = {
    'Tirupur': generateStoreData('Tirupur'),
    'Coimbatore': generateStoreData('Coimbatore'),
    'Chennai': generateStoreData('Chennai'),
};
