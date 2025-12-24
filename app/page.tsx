'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { ALL_DATA } from '@/lib/data';
import { StoreId } from '@/lib/types';
import OverviewCards from '@/components/dashboard/OverviewCards';
import { SalesChart, CategoryChart, PaymentChart } from '@/components/dashboard/Charts';
import VMSection from '@/components/dashboard/VMSection';
import InventoryList from '@/components/dashboard/InventoryList';
import { OrdersView, DocumentsView } from '@/components/dashboard/DetailedViews';
import DistrictSalesTable from '@/components/dashboard/DistrictSalesTable';
import dynamic from 'next/dynamic';

const SatelliteMap = dynamic(() => import('@/components/dashboard/SatelliteSalesMap'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse flex items-center justify-center">Loading 3D Map...</div>
});
import { Download, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedStore, setSelectedStore] = useState<StoreId>('Tirupur');
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState<typeof ALL_DATA['Tirupur'] | null>(null);

  useEffect(() => {
    setData(ALL_DATA[selectedStore]);
  }, [selectedStore]);

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal"></div></div>;

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beelittle-${selectedStore.toLowerCase()}-analytics.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950 dark:to-emerald-950/20 transition-colors duration-300">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Wrapper */}
      <div className="md:ml-64 transition-all duration-300">

        {/* Helper Header */}
        <header className="sticky top-0 right-0 left-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full">
            <button className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <div className="md:hidden flex items-center gap-2 text-charcoal dark:text-white font-bold text-lg">
              <span>Beelittle</span>
            </div>
            <div className="hidden md:block w-full">
              <Header selectedStore={selectedStore} onStoreChange={setSelectedStore} />
            </div>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
          {/* Dynamic Content based on Active Tab */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time retail insights for <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedStore}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button className="px-4 py-2 bg-charcoal dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-gray-900/10">
                    + Audit
                  </button>
                </div>
              </div>

              <OverviewCards data={data} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SalesChart data={data.salesHistory} />
                </div>
                <div className="lg:col-span-1">
                  <CategoryChart data={data.categoryPerformance} />
                </div>
              </div>

              <div className="space-y-8">
                <InventoryList alerts={data.inventoryAlerts} skus={data.topSkus} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <VMSection data={data.vmCampaigns} />
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
                <button className="px-4 py-2 bg-charcoal dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                  + Add Stock
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Stock Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{(data.kpi.totalSales * 0.4).toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Low Stock SKUs</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{data.kpi.outOfStockRisk}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Dead Stock Value</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">₹{(data.kpi.overstockAlerts * 2500).toLocaleString()}</p>
                </div>
              </div>

              <InventoryList alerts={data.inventoryAlerts} skus={data.topSkus} />
            </motion.div>
          )}

          {activeTab === 'vm-analytics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Visual Merchandising Analytics</h1>
                <button className="px-4 py-2 bg-charcoal dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                  View Guidelines
                </button>
              </div>
              <VMSection data={data.vmCampaigns} />
            </motion.div>
          )}


          {activeTab === 'orders' && (
            <OrdersView orders={data.recentOrders} />
          )}

          {activeTab === 'documents' && (
            <DocumentsView documents={data.documents} />
          )}

          {activeTab === 'sales' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Reports</h1>
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                    Last 30 Days
                  </button>
                  <button className="px-3 py-2 bg-charcoal dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-gray-900/10">
                    <Download className="w-4 h-4 inline-block mr-2" />
                    Export Report
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <SalesChart data={data.salesHistory} />
                </div>
                <div className="lg:col-span-1">
                  <CategoryChart data={data.categoryPerformance} />
                </div>
                <div className="lg:col-span-1">
                  <PaymentChart data={data.paymentStats} />
                </div>
                <div className="lg:col-span-1">
                  <SatelliteMap data={data.regionalSales} />
                </div>
                <div className="lg:col-span-1">
                  <DistrictSalesTable data={data.regionalSales} />
                </div>
              </div>
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
}
