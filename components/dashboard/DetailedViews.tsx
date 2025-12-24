'use client';

import { Order, Document } from '@/lib/types';
import { motion } from 'framer-motion';
import { FileText, Download, Search, Filter, ShoppingBag, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react';

export function OrdersView({ orders }: { orders: Order[] }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-charcoal/20 dark:focus:ring-white/20 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-medium">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Items</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Payment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-charcoal dark:text-white">{order.id}</td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{order.date}</td>
                                <td className="px-6 py-4 text-gray-900 dark:text-gray-200">{order.customerName}</td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{order.items} Items</td>
                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">₹{order.total.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${order.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                        order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                            'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                                        }`}>
                                        {order.status === 'Completed' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                                            order.status === 'Pending' ? <Clock className="w-3 h-3 mr-1" /> :
                                                <XCircle className="w-3 h-3 mr-1" />}
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <CreditCard className="w-3 h-3" />
                                    {order.paymentMethod}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export function DocumentsView({ documents }: { documents: Document[] }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
                <button className="px-4 py-2 bg-charcoal dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                    Upload Document
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <div key={doc.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="p-2 text-gray-400 dark:text-gray-500 hover:text-charcoal dark:hover:text-white transition-colors">
                                <Download className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{doc.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Added on {doc.date}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
