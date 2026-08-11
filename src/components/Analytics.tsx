import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { Activity } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';

const initialData = [
  { name: 'PT Telkom', value: 85, color: '#6C5CE7' },
  { name: 'PT BCA', value: 78, color: '#00cec9' },
  { name: 'PT Astra', value: 72, color: '#FF7675' },
  { name: 'PT Mandiri', value: 65, color: '#55EFC4' },
  { name: 'PT BRI', value: 90, color: '#74B9FF' },
];

export default function Analytics() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => prevData.map(item => ({
        ...item,
        value: Math.max(10, Math.min(100, item.value + (Math.random() * 10 - 5)))
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="analitik" className="lazy-section py-8 md:py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Analitik Target Pasar</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Pantau penetrasi dan potensi target pasar ke perusahaan-perusahaan (PT) terkemuka secara real-time.
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
              <InteractiveIcon icon={Activity} colorClass="clay-icon-box" size={24} />
              <h3 className="text-xl md:text-2xl font-bold text-text">Live Market Penetration (%)</h3>
            </div>
            <div className="md:ml-auto flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-sm font-semibold opacity-60">Live Updating</span>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#beccda" opacity={0.5} vertical={false} />
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
                  domain={[0, 100]}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.4)' }}
                  contentStyle={{ 
                    borderRadius: '15px', 
                    border: 'none', 
                    boxShadow: '10px 10px 30px #beccda, -10px -10px 30px #ffffff',
                    backgroundColor: '#f0f4f8'
                  }}
                  itemStyle={{ color: '#2D3436', fontWeight: 'bold' }}
                  labelStyle={{ color: '#636E72', marginBottom: '5px' }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Penetrasi']}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={500}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
