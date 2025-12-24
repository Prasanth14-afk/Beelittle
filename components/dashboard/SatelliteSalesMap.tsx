'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { RegionalSales } from '@/lib/types';
import L from 'leaflet';

// Fix for default marker icons in Next.js/Leaflet
// (Though we are using circles primarily, good to have if we switch)
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

const CITY_COORDINATES: Record<string, [number, number]> = {
    'Chennai': [13.0827, 80.2707],
    'Coimbatore': [11.0168, 76.9558],
    'Madurai': [9.9252, 78.1198],
    'Tiruchirappalli': [10.7905, 78.7047],
    'Salem': [11.6643, 78.1460],
    'Tirunelveli': [8.7139, 77.7567],
    'Tiruppur': [11.1085, 77.3411],
    'Erode': [11.3410, 77.7172],
    'Vellore': [12.9165, 79.1325],
    'Thoothukkudi': [8.7642, 78.1348],
    'Kancheepuram': [12.8185, 79.6947],
    'Thiruvallur': [13.1230, 79.9120],
    'Cuddalore': [11.7564, 79.7635],
    'Dindigul': [10.3689, 77.9585]
};

export default function SatelliteSalesMap({ data }: { data: RegionalSales[] }) {
    // Only render on client
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Fix Leaflet icon paths
        (delete (L.Icon.Default.prototype as any)._getIconUrl);
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: iconRetinaUrl,
            iconUrl: iconUrl,
            shadowUrl: shadowUrl,
        });
    }, []);

    if (!isMounted) {
        return <div className="h-[600px] w-full bg-gray-900 rounded-2xl animate-pulse flex items-center justify-center text-gray-500">Loading Satellite Map...</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-[600px] relative flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 h-8">Regional Sales (Satellite View)</h3>
            <div className="flex-1 w-full rounded-xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-600 relative z-0">
                <MapContainer
                    center={[10.8, 79.0]}
                    zoom={7}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                    className="z-0"
                >
                    {/* Esri World Imagery (Satellite) */}
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />

                    {/* Optional: Hybrid Labels for better context */}
                    <TileLayer
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
                        opacity={0.6}
                    />

                    {data.map((region) => {
                        const coords = CITY_COORDINATES[region.region];
                        if (!coords) return null;

                        // Calculate radius based on sales
                        // Max sales ~100k -> Radius 30
                        // Min sales ~10k -> Radius 10
                        const radius = Math.max(10, Math.min(40, (region.sales / 100000) * 30));
                        const isHighSales = region.sales > 60000;

                        return (
                            <CircleMarker
                                key={region.region}
                                center={coords}
                                pathOptions={{
                                    fillColor: isHighSales ? '#ff8c00' : '#3b82f6', // Dark Orange for high, Blue for normal
                                    fillOpacity: 0.6,
                                    color: isHighSales ? '#ffffff' : '#93c5fd',
                                    weight: 2
                                }}
                                radius={radius}
                            >
                                <Popup>
                                    <div className="p-2 text-center">
                                        <div className="font-bold text-gray-800">{region.region}</div>
                                        <div className="text-sm text-gray-600">Sales: ₹{region.sales.toLocaleString()}</div>
                                        {isHighSales && <div className="text-xs text-orange-600 font-bold mt-1">High Performance Zone</div>}
                                    </div>
                                </Popup>
                                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                                    <span className="font-bold">{region.region}: ₹{(region.sales / 1000).toFixed(1)}k</span>
                                </Tooltip>
                            </CircleMarker>
                        );
                    })}
                </MapContainer>
            </div>
            <div className="mt-4 flex gap-4 text-xs text-gray-500 justify-end">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500 border border-white"></span>
                    <span>High Volume</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500 border border-blue-200"></span>
                    <span>Standard Volume</span>
                </div>
            </div>
        </div>
    );
}
