import { useEffect, useMemo, useState } from "react";
import { Meteors } from "../components/ui/meteors";
import axios from "axios";
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ScatterChart, Scatter,
} from "recharts";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Visuals() {
    const [data,setData]=useState([])
    const [parsedData,setParsedData]=useState([])
    useEffect(() => {
        const f=async ()=>{
            const res=await axios.post('https://backend.jotish.in/backend_dev/gettabledata.php',{
                "username":"test",
                "password":"123456"
            })
            console.log(res.data)
            const newData=res?.data?.TABLE_DATA?.data
            console.log(newData)
            setData(newData)
            const parsed = newData.map((item: any) => ({
                name: item[0],
                role: item[1],
                location: item[2],
                pincode: item[3],
                joiningDate: new Date(item[4]), 
                salary: Number(item[5].replace(/[^0-9.-]+/g, "")) 
            }));
            setParsedData(parsed)
        }
        f()
    },[])

    const locationChartData = useMemo(() => {
        if (parsedData.length === 0) return [];

        const locCounts = parsedData.reduce((acc: any, curr: any) => {
            acc[curr.location] = (acc[curr.location] || 0) + 1;
            return acc;
        }, {});

        // Convert the object { Tokyo: 3, London: 2 } into an array for Recharts
        return Object.keys(locCounts).map(key => ({
            name: key,
            value: locCounts[key]
        }));
    }, [parsedData]);

    const averageSalaryData = useMemo(() => {
        if (parsedData.length === 0) return [];

        // 1. Sum up all salaries and count employees per location
        const stats = parsedData.reduce((acc: any, curr: any) => {
            if (!acc[curr.location]) {
                acc[curr.location] = { sum: 0, count: 0 };
            }
            acc[curr.location].sum += curr.salary;
            acc[curr.location].count += 1;
            return acc;
        }, {});

        // 2. Divide sum by count to get the average
        return Object.keys(stats).map(key => ({
            location: key,
            averageSalary: Math.round(stats[key].sum / stats[key].count)
        }));
    }, [parsedData]);

    // Transform data for Tenure vs Salary Scatter Plot
    const tenureSalaryData = useMemo(() => {
        if (parsedData.length === 0) return [];
        const currentDate = new Date();
        return parsedData.map((emp: any) => {
            // Calculate difference in milliseconds, convert to years
            const diffTime = Math.abs(currentDate.getTime() - emp.joiningDate.getTime());
            const tenureYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

            return {
                name: emp.name,
                role: emp.role,
                tenure: Number(tenureYears.toFixed(1)), // Rounds to 1 decimal place (e.g., 14.8 years)
                salary: emp.salary
            };
        });
    }, [parsedData]);

    // Custom Tooltip specifically for the Scatter Plot
    const CustomScatterTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload; // Grabs the specific employee object
            return (
                <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700 p-4 rounded-lg shadow-lg">
                    <p className="font-bold text-white text-lg">{data.name}</p>
                    <p className="text-slate-400 text-sm mb-3">{data.role}</p>
                    <p className="text-emerald-400 font-medium">Tenure: {data.tenure} years</p>
                    <p className="text-indigo-400 font-medium">Salary: ${data.salary.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    // The TopoJSON file that draws the world map boundaries
    const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

    // react-simple-maps requires coordinates in [Longitude, Latitude] format
    const cityCoordinates: Record<string, [number, number]> = {
        "Edinburgh": [-3.1883, 55.9533],
        "London": [-0.1276, 51.5072],
        "New York": [-74.0060, 40.7128],
        "San Francisco": [-122.4194, 37.7749],
        "Sidney": [151.2093, -33.8688], // Note: Matching your data's spelling
        "Singapore": [103.8198, 1.3521],
        "Tokyo": [139.6917, 35.6895],
    };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-white font-sans">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <Meteors number={40} /> 
        </div>

        {/* Main Content Container - Note the z-10 and relative positioning! */}
        <div className="relative z-10 flex flex-col items-center py-20 px-4">
            <h1 className="text-4xl font-bold mb-12">Employee Demographics</h1>

            {/* Glassmorphism Chart Card */}
            <div className="w-full max-w-2xl h-[450px] bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-semibold mb-6 text-center text-slate-200">
                    Workforce by Location
                </h2>
                
                {locationChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={locationChartData}
                                cx="50%"
                                cy="45%" // Slightly raised to make room for the Legend
                                innerRadius={80} // Donut style
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                                // Shows the exact percentage on the chart slices
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {locationChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center text-slate-500">
                        Loading data...
                    </div>
                )}
            </div>
        </div>

        <div className="relative z-10 flex flex-col items-center py-20 px-4">
            {/* Glassmorphism Bar Chart Card */}
            <div className="w-full max-w-2xl h-[450px] bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl mt-8">
                <h2 className="text-xl font-semibold mb-6 text-center text-slate-200">
                    Average Salary by Location
                </h2>
                
                {averageSalaryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                            data={averageSalaryData} 
                            margin={{ top: 10, right: 10, left: 20, bottom: 40 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis 
                                dataKey="location" 
                                stroke="#94a3b8" 
                                angle={-45} 
                                textAnchor="end" 
                                tick={{ fontSize: 13, fill: '#cbd5e1' }} 
                            />
                            <YAxis 
                                stroke="#94a3b8" 
                                tickFormatter={(value) => `$${value / 1000}k`} // Formats 300000 as $300k
                                tick={{ fill: '#cbd5e1' }}
                            />
                            <Tooltip 
                                cursor={{ fill: '#1e293b' }} // Subtle background highlight on hover
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Average Salary']}
                            />
                            <Bar 
                                dataKey="averageSalary" 
                                fill="#6366f1" // Indigo color
                                radius={[6, 6, 0, 0]} // Rounds the top corners of the bars
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center text-slate-500">
                        Loading data...
                    </div>
                )}
            </div>
        </div>


        <div className="relative z-10 flex flex-col items-center py-20 px-4">
            {/* Glassmorphism Scatter Chart Card */}
            <div className="w-full max-w-2xl h-[450px] bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl mt-8 mb-20">
                <h2 className="text-xl font-semibold mb-6 text-center text-slate-200">
                    Tenure vs. Pay Correlation
                </h2>
                
                {tenureSalaryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 55, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            
                            {/* X-Axis: Tenure (Years) */}
                            <XAxis 
                                type="number" 
                                dataKey="tenure" 
                                name="Tenure" 
                                unit=" yrs" 
                                stroke="#94a3b8"
                                tick={{ fill: '#cbd5e1' }}
                                label={{ value: 'Years with Company', position: 'insideBottom', offset: -20, fill: '#94a3b8' }}
                            />
                            
                            {/* Y-Axis: Salary */}
                            <YAxis 
                                type="number" 
                                dataKey="salary" 
                                name="Salary" 
                                stroke="#94a3b8"
                                tick={{ fill: '#cbd5e1' }}
                                tickFormatter={(value) => `$${value / 1000}k`}
                                label={{ value: 'Salary', angle: -90, position: 'left', fill: '#94a3b8' }}
                            />
                            
                            {/* Our custom tooltip component */}
                            <Tooltip 
                                cursor={{ strokeDasharray: '3 3', stroke: '#475569' }} 
                                content={<CustomScatterTooltip />} 
                            />
                            
                            {/* The actual dots */}
                            <Scatter name="Employees" data={tenureSalaryData} fill="#10b981" />
                        </ScatterChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center text-slate-500">
                        Loading data...
                    </div>
                )}
            </div>
        </div>

        <div className="relative z-10 flex flex-col items-center py-20 px-4">
            <div className="w-full max-w-4xl h-[500px] bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl mt-8 relative">
                <h2 className="text-xl font-semibold mb-2 text-center text-slate-200">
                    Global Distribution
                </h2>
                
                <div className="w-full h-full overflow-hidden">
                    {locationChartData.length > 0 ? (
                        <ComposableMap 
                            projectionConfig={{ scale: 140 }} // Zooms the map out slightly to fit everything
                            width={800}
                            height={400}
                        >
                            {/* 1. Draw the actual world map */}
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="#1e293b" // slate-800 - dark map body
                                            stroke="#334155" // slate-700 - map borders
                                            strokeWidth={0.5}
                                            style={{
                                                default: { outline: "none" },
                                                hover: { fill: "#334155", outline: "none" },
                                                pressed: { outline: "none" },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>

                            {/* 2. Draw the markers based on your Pie Chart data */}
                            {locationChartData.map(({ name, value }) => {
                                const coords = cityCoordinates[name];
                                if (!coords) return null; // Skip if we don't have coords for a city

                                return (
                                    <Marker key={name} coordinates={coords}>
                                        {/* The glowing dot */}
                                        <circle 
                                            r={value * 2.5} // Scales the dot size based on headcount!
                                            fill="#10b981"  // Emerald green
                                            opacity={0.8}
                                            stroke="#047857"
                                            strokeWidth={1}
                                        />
                                        {/* The city label */}
                                        <text
                                            textAnchor="middle"
                                            y={-10}
                                            style={{ 
                                                fontFamily: "system-ui", 
                                                fill: "#cbd5e1", 
                                                fontSize: "10px",
                                                pointerEvents: "none" 
                                            }}
                                        >
                                            {name} ({value})
                                        </text>
                                    </Marker>
                                );
                            })}
                        </ComposableMap>
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">
                            Loading map...
                        </div>
                    )}
                </div>
            </div>
        </div>

    </div>
  )
}