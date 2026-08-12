import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';

const initialData = [
  { name: 'Jan', pengeluaran: 450, keuntungan: 200 },
  { name: 'Feb', pengeluaran: 380, keuntungan: 320 },
  { name: 'Mar', pengeluaran: 400, keuntungan: 450 },
  { name: 'Apr', pengeluaran: 300, keuntungan: 600 },
  { name: 'Mei', pengeluaran: 350, keuntungan: 800 },
  { name: 'Jun', pengeluaran: 320, keuntungan: 950 },
  { name: 'Jul', pengeluaran: 400, keuntungan: 1100 },
  { name: 'Ags', pengeluaran: 420, keuntungan: 1300 },
  { name: 'Sep', pengeluaran: 380, keuntungan: 1550 },
];

export default function Analytics() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const lastItem = newData[newData.length - 1];
        
        // Simulate real-time trading chart fluctuation
        const newPengeluaran = Math.max(100, lastItem.pengeluaran + (Math.random() * 40 - 20));
        const newKeuntungan = Math.max(100, lastItem.keuntungan + (Math.random() * 60 - 20));
        
        newData[newData.length - 1] = {
          ...lastItem,
          pengeluaran: newPengeluaran,
          keuntungan: newKeuntungan
        };
        return newData;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="analitik" className="lazy-section py-8 md:py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Analisis Finansial & Pertumbuhan</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Pantau efisiensi anggaran pengeluaran (Expenses) dan akselerasi keuntungan (Profit) perusahaan dalam metrik real-time.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="clay p-6 md:p-8 relative"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <InteractiveIcon icon={TrendingUp} colorClass="clay-icon-box-alt2" size={24} />
              <h3 className="text-xl md:text-2xl font-bold text-text">Live Cashflow Market</h3>
            </div>
            <div className="md:ml-auto flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-green-500 opacity-90">Market Open (Real-time)</span>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#beccda" opacity={0.3} vertical={false} />
                <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#636E72', fontWeight: 600, fontSize: 12 }} 
                   dy={10}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#636E72', fontWeight: 600, fontSize: 12 }}
                   dx={-10}
                   tickFormatter={(val) => `$${val}k`}
                />
                <Tooltip 
                  cursor={{ stroke: 'rgba(255,255,255,0.4)', strokeWidth: 2 }}
                  contentStyle={{ 
                     borderRadius: '15px', 
                     border: 'none', 
                     boxShadow: '10px 10px 30px #beccda, -10px -10px 30px #ffffff',
                     backgroundColor: '#f0f4f8'
                  }}
                  itemStyle={{ fontWeight: 'bold' }}
                  labelStyle={{ color: '#636E72', marginBottom: '5px' }}
                  formatter={(value: number, name: string) => [`$${value.toFixed(1)}k`, name === 'keuntungan' ? 'Keuntungan' : 'Pengeluaran']}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '14px', fontWeight: 600 }} />
                
                <Line 
                  type="monotone" 
                  dataKey="keuntungan" 
                  name="Keuntungan" 
                  stroke="#00cec9" 
                  strokeWidth={4} 
                  dot={{ r: 4, strokeWidth: 2, fill: '#f0f4f8' }} 
                  activeDot={{ r: 8, strokeWidth: 2, fill: '#00cec9' }}
                  animationDuration={500}
                />
                <Line 
                  type="monotone" 
                  dataKey="pengeluaran" 
                  name="Pengeluaran" 
                  stroke="#FF7675" 
                  strokeWidth={3} 
                  dot={{ r: 4, strokeWidth: 2, fill: '#f0f4f8' }} 
                  activeDot={{ r: 6, strokeWidth: 2, fill: '#FF7675' }}
                  animationDuration={500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
