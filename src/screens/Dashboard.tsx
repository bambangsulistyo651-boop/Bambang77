import React, { useMemo } from 'react';
import { Bell, Menu, Package, Clock, Users, PackageOpen } from 'lucide-react';
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer, LabelList } from 'recharts';
import { useAppContext } from '../store';
import { cn } from '../utils';

export default function Dashboard() {
  const { pengajuanList, navigate } = useAppContext();
  
  const stats = useMemo(() => {
    let diproses = 0;
    let selesai = 0;
    let urgent = 0;

    pengajuanList.forEach(item => {
      if (item.statusLabels.includes('DIPROSES')) diproses++;
      if (item.statusLabels.includes('SELESAI')) selesai++;
      if (item.prioritas === 'Urgent' || item.statusLabels.includes('URGENT')) urgent++;
    });

    return {
      total: pengajuanList.length,
      diproses,
      selesai,
      urgent
    };
  }, [pengajuanList]);

  const dynamicChartData = useMemo(() => {
    // Initialize array with 12 months for 2026
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const data = months.map(name => ({ name, value: 0 }));

    pengajuanList.forEach(item => {
      // item.date format from store is like "18 Agu 2026" or "2026-08-18" or "Unknown Date"
      let monthIndex = -1;
      
      const dateStr = item.date.toLowerCase();
      
      if (dateStr.includes('jan') || dateStr.includes('-01-')) monthIndex = 0;
      else if (dateStr.includes('feb') || dateStr.includes('-02-')) monthIndex = 1;
      else if (dateStr.includes('mar') || dateStr.includes('-03-')) monthIndex = 2;
      else if (dateStr.includes('apr') || dateStr.includes('-04-')) monthIndex = 3;
      else if (dateStr.includes('mei') || dateStr.includes('may') || dateStr.includes('-05-')) monthIndex = 4;
      else if (dateStr.includes('jun') || dateStr.includes('-06-')) monthIndex = 5;
      else if (dateStr.includes('jul') || dateStr.includes('-07-')) monthIndex = 6;
      else if (dateStr.includes('agu') || dateStr.includes('aug') || dateStr.includes('-08-')) monthIndex = 7;
      else if (dateStr.includes('sep') || dateStr.includes('-09-')) monthIndex = 8;
      else if (dateStr.includes('okt') || dateStr.includes('oct') || dateStr.includes('-10-')) monthIndex = 9;
      else if (dateStr.includes('nov') || dateStr.includes('-11-')) monthIndex = 10;
      else if (dateStr.includes('des') || dateStr.includes('dec') || dateStr.includes('-12-')) monthIndex = 11;

      if (monthIndex !== -1) {
        data[monthIndex].value += 1;
      }
    });

    // Only show months up to the current active month (e.g., up to August for the design)
    // Find the last month that has data, or default to showing at least up to August (index 7)
    let lastActiveMonth = 7; 
    for (let i = 11; i >= 0; i--) {
      if (data[i].value > 0) {
        lastActiveMonth = Math.max(lastActiveMonth, i);
        break;
      }
    }
    
    // Return all 12 months so it can be scrolled horizontally
    return data;

  }, [pengajuanList]);

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-white">
      <div className="px-5 pt-8 pb-6">
        <h1 className="text-xl font-semibold text-gray-900 mt-2 flex items-center space-x-2">
          <span>Selamat datang</span>
          <span className="text-xl">👋</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">Rekap pengajuan barang<br/>Tahun 2026</p>

        {/* Summary Grid */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          <div className="bg-red-50/80 rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center justify-center space-x-3 mb-1">
              <PackageOpen size={18} className="text-red-500" />
              <span className="text-[28px] font-bold text-gray-900 leading-none">{stats.total}</span>
            </div>
            <span className="text-[11px] text-gray-700 leading-tight text-center mt-1">Total<br/>Pengajuan</span>
          </div>
          <div className="bg-blue-50/80 rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center justify-center space-x-3 mb-1">
              <Clock size={18} className="text-blue-500" />
              <span className="text-[28px] font-bold text-gray-900 leading-none">{stats.diproses}</span>
            </div>
            <span className="text-[11px] text-gray-700 leading-tight text-center mt-1 pt-1.5">Diproses</span>
          </div>
          <div className="bg-green-50/80 rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center justify-center space-x-3 mb-1">
              <Users size={18} className="text-green-600" />
              <span className="text-[28px] font-bold text-gray-900 leading-none">{stats.selesai}</span>
            </div>
            <span className="text-[11px] text-gray-700 leading-tight text-center mt-1 pt-1.5">Selesai</span>
          </div>
          <div className="bg-orange-50/80 rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center justify-center space-x-3 mb-1">
              <Package size={18} className="text-orange-500" />
              <span className="text-[28px] font-bold text-gray-900 leading-none">{stats.urgent}</span>
            </div>
            <span className="text-[11px] text-gray-700 leading-tight text-center mt-1 pt-1.5">Urgent</span>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm overflow-hidden">
          <h2 className="text-sm font-bold text-gray-900 mb-6">Pengajuan per Bulan</h2>
          <div className="h-44 w-full pt-4 overflow-x-auto pb-2 -mb-2" style={{ scrollbarWidth: 'none' }}>
            <div style={{ minWidth: '500px', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dynamicChartData} margin={{ top: 15, right: 10, left: 10, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#6B7280'}} dy={10} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={16}>
                    <LabelList 
                      dataKey="value" 
                      position="top" 
                      fill="#374151"
                      fontSize={10}
                      fontWeight={600}
                      formatter={(val: number) => val > 0 ? val : ''}
                    />
                    {
                      dynamicChartData.map((entry, index) => {
                        // Find the last active month to highlight it green
                        let lastActiveIndex = 0;
                        dynamicChartData.forEach((d, i) => { if (d.value > 0) lastActiveIndex = i; });
                        return (
                          <Cell key={`cell-${index}`} fill={index === lastActiveIndex ? '#16A34A' : '#A7F3D0'} />
                        );
                      })
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pengajuan Terbaru */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Pengajuan Terbaru</h2>
            <button 
              onClick={() => navigate('pengajuan')}
              className="text-xs text-green-600 font-medium"
            >
              Lihat semua
            </button>
          </div>
          
          <div className="space-y-3">
            {pengajuanList.slice(0,3).map((item) => {
              const status = item.statusLabels.find(l => !['URGENT', 'MEDIUM', 'LOW'].includes(l)) || 'DIAJUKAN';
              const isSelesai = status.includes('SELESAI');
              const isUrgent = item.prioritas === 'Urgent';
              const isMedium = item.prioritas === 'Medium';

              return (
                <div 
                  key={item.id} 
                  onClick={() => navigate('detail', { item })}
                  className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex justify-between items-center cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-start space-x-3 flex-1 min-w-0 pr-4">
                    <div className={cn("w-3 h-3 rounded-full mt-1.5 shrink-0", 
                      isUrgent ? 'bg-red-500' : 
                      isMedium ? 'bg-orange-400' : 'bg-green-500'
                    )}></div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 truncate">{item.mesin} &bull; {item.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2 shrink-0">
                    <span className={cn("px-2 py-0.5 text-[10px] font-medium rounded-md uppercase",
                      isSelesai ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-600"
                    )}>
                      {status}
                    </span>
                    <span className="text-xs font-medium text-gray-700">{item.qty} {item.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
