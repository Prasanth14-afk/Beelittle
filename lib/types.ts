export type StoreId = 'Tirupur' | 'Coimbatore' | 'Chennai';

export interface Store {
    id: StoreId;
    name: StoreId;
    location: string;
}

export interface KPI {
    totalSales: number;
    salesGrowth: number; // percentage
    conversionRate: number; // percentage
    conversionImpact: number; // uplift due to VM
    stockVelocity: number; // items per day
    outOfStockRisk: number; // count of SKUs
    overstockAlerts: number; // count of SKUs
    vmCompliance: number; // score 0-100
}

export interface SalesData {
    date: string;
    revenue: number;
    orders: number;
    footfall: number;
}

export interface CategoryPerformance {
    category: string;
    revenue: number;
    percentage: number;
    growth: number;
}

export interface SKU {
    id: string;
    name: string;
    category: string;
    price: number;
    stockOnHand: number;
    sellThroughRate: number; // percentage
    daysSalesInventory: number; // Stock Aging
    status: 'Fast Moving' | 'Slow Moving' | 'Normal' | 'Dead Stock';
    replenishmentNeeded: boolean;
    replenishmentQty: number;
    lastRestocked: string;
    imageUrl?: string;
}

export interface VMData {
    campaignName: string;
    startDate: string;
    endDate: string;
    complianceScore: number;
    salesUplift: number; // percentage
    beforeSales: number;
    afterSales: number;
    auditResult: 'Pass' | 'Fail' | 'Warning';
    windowDisplayRating: number; // 1-5
    floorDisplayRating: number; // 1-5
}

export interface InventoryAlert {
    id: string;
    skuId: string;
    skuName: string;
    type: 'Low Stock' | 'Overstock' | 'High Age';
    severity: 'Critical' | 'Warning' | 'Info';
    message: string;
}

export interface Order {
    id: string;
    customerName: string;
    date: string;
    items: number;
    total: number;
    status: 'Completed' | 'Pending' | 'Returned' | 'Cancelled';
    paymentMethod: 'UPI' | 'Card' | 'Cash';
}

export interface Document {
    id: string;
    title: string;
    type: 'Invoice' | 'Report' | 'Audit' | 'Policy';
    date: string;
    size: string;
}

export interface StoreData {
    storeId: StoreId;
    kpi: KPI;
    salesHistory: SalesData[]; // Last 30 days
    categoryPerformance: CategoryPerformance[];
    topSkus: SKU[];
    slowSkus: SKU[];
    vmCampaigns: VMData[];
    inventoryAlerts: InventoryAlert[];
    inventoryTurnover: number;
    recentOrders: Order[];
    documents: Document[];
    paymentStats: PaymentStats[];
    regionalSales: RegionalSales[];
}

export interface RegionalSales {
    region: string;
    sales: number;
    growth: number;
    percentage: number;
}

export interface PaymentStats {
    method: 'UPI' | 'Card' | 'Cash';
    amount: number;
    percentage: number;
}
