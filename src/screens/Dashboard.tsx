import React, { useMemo } from 'react';
import { Bell, Search, Package, Clock, Users, PackageOpen, TrendingUp, ChevronRight, BarChart2, ChevronDown } from 'lucide-react';
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
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul']; // Limiting to Jul like in the image for exact visual match
    const data = months.map(name => ({ name, value: 0 }));

    pengajuanList.forEach(item => {
      let monthIndex = -1;
      const dateStr = item.date.toLowerCase();
      
      if (dateStr.includes('jan') || dateStr.includes('-01-')) monthIndex = 0;
      else if (dateStr.includes('feb') || dateStr.includes('-02-')) monthIndex = 1;
      else if (dateStr.includes('mar') || dateStr.includes('-03-')) monthIndex = 2;
      else if (dateStr.includes('apr') || dateStr.includes('-04-')) monthIndex = 3;
      else if (dateStr.includes('mei') || dateStr.includes('may') || dateStr.includes('-05-')) monthIndex = 4;
      else if (dateStr.includes('jun') || dateStr.includes('-06-')) monthIndex = 5;
      else if (dateStr.includes('jul') || dateStr.includes('-07-')) monthIndex = 6;

      if (monthIndex !== -1) {
        data[monthIndex].value += 1;
      }
    });

    return data;
  }, [pengajuanList]);

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-[#f8fafc] font-sans">
      
      {/* Curved Header */}
      <div className="bg-[#3b63f6] rounded-b-[2rem] pt-10 pb-8 px-6 text-white relative z-10 shadow-sm">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center space-x-4">
            <button className="text-white focus:outline-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div>
              <h1 className="text-lg font-bold leading-tight">Dashboard</h1>
              <p className="text-xs text-blue-100 opacity-90">Rekap pengajuan barang</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button><Search size={20} className="text-white" /></button>
            <div className="relative">
              <button><Bell size={20} className="text-white" /></button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#3b63f6]">3</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
              U
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 relative z-20 -mt-2">
        {/* Filter */}
        <div className="flex justify-between items-center py-2 px-1 mb-2">
          <button className="flex items-center space-x-1 text-sm font-semibold text-gray-800">
            <span>Tahun 2026</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#4a7dfa] to-[#2563eb] rounded-[1.5rem] p-5 shadow-lg relative overflow-hidden mb-6">
          <div className="relative z-10 w-[60%]">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <Package size={16} className="text-white" />
              </div>
              <span className="text-xs font-bold text-blue-100 tracking-wider">TOTAL PENGAJUAN</span>
            </div>
            <div className="text-[52px] font-bold text-white leading-none tracking-tight mb-2">
              {stats.total}
            </div>
            <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-5">
              <TrendingUp size={12} className="text-white" />
              <span className="text-xs font-semibold text-white">{stats.urgent} pengajuan urgent</span>
            </div>
            <button 
              onClick={() => navigate('pengajuan')}
              className="bg-white text-blue-600 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <BarChart2 size={16} className="text-blue-500" />
              <span>Lihat Pengajuan</span>
            </button>
          </div>
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-48 h-48 z-0">
             <img src="/hero-box.jpg" alt="Hero Illustration" className="w-full h-full object-contain mix-blend-screen opacity-90 scale-125 origin-right" onError={(e) => e.currentTarget.style.display = 'none'} />
          </div>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-[1.2rem] p-3 pt-4 pb-0 flex flex-col relative shadow-sm border border-gray-100 overflow-hidden h-[105px]">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mb-3">
              <PackageOpen size={16} className="text-red-500" />
            </div>
            <span className="text-2xl font-bold text-gray-900 leading-none mb-1">{stats.total}</span>
            <span className="text-[10px] text-gray-500 font-medium leading-tight">Total<br/>Pengajuan</span>
            <div className="absolute bottom-2 left-3 right-3 h-[3px] bg-red-400 rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-[1.2rem] p-3 pt-4 pb-0 flex flex-col relative shadow-sm border border-gray-100 overflow-hidden h-[105px]">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-3">
              <Clock size={16} className="text-blue-500" />
            </div>
            <span className="text-2xl font-bold text-gray-900 leading-none mb-1">{stats.diproses}</span>
            <span className="text-[10px] text-gray-500 font-medium leading-tight pt-1">Diproses</span>
            <div className="absolute bottom-2 left-3 right-3 h-[3px] bg-blue-500 rounded-full"></div>
          </div>

          <div className="bg-white rounded-[1.2rem] p-3 pt-4 pb-0 flex flex-col relative shadow-sm border border-gray-100 overflow-hidden h-[105px]">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mb-3">
              <Users size={16} className="text-green-500" />
            </div>
            <span className="text-2xl font-bold text-gray-900 leading-none mb-1">{stats.selesai}</span>
            <span className="text-[10px] text-gray-500 font-medium leading-tight pt-1">Selesai</span>
            <div className="absolute bottom-2 left-3 right-3 h-[3px] bg-green-500 rounded-full"></div>
          </div>

          <div className="bg-white rounded-[1.2rem] p-3 pt-4 pb-0 flex flex-col relative shadow-sm border border-gray-100 overflow-hidden h-[105px]">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mb-3">
              <Package size={16} className="text-orange-500" />
            </div>
            <span className="text-2xl font-bold text-gray-900 leading-none mb-1">{stats.urgent}</span>
            <span className="text-[10px] text-gray-500 font-medium leading-tight pt-1">Urgent</span>
            <div className="absolute bottom-2 left-3 right-3 h-[3px] bg-orange-400 rounded-full"></div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white border border-gray-100 rounded-[1.5rem] p-5 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-[15px] font-bold text-gray-900">Pengajuan per Bulan</h2>
             <button className="flex items-center space-x-1 text-xs font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg">
                <span>Tahun 2026</span>
                <ChevronDown size={14} />
             </button>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dynamicChartData} margin={{ top: 15, right: 0, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#6B7280', fontWeight: 500}} dy={10} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={16}>
                  <LabelList 
                    dataKey="value" 
                    position="top" 
                    fill="#111827"
                    fontSize={11}
                    fontWeight={700}
                    formatter={(val: number) => val > 0 ? val : ''}
                  />
                  {
                    dynamicChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#3b82f6" />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pengajuan Terbaru */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-[15px] font-bold text-gray-900">Pengajuan Terbaru</h2>
            <button 
              onClick={() => navigate('pengajuan')}
              className="text-xs text-blue-600 font-semibold"
            >
              Lihat semua
            </button>
          </div>
          
          <div className="space-y-3">
            {pengajuanList.slice(0,3).map((item, idx) => {
              const status = item.statusLabels.find(l => !['URGENT', 'MEDIUM', 'LOW'].includes(l)) || 'DIAJUKAN';
              const isSelesai = status.includes('SELESAI');
              const isUrgent = item.prioritas === 'Urgent';
              
              // Map colors based on index for the mock look, or status
              let iconBg = 'bg-blue-50';
              let iconColor = 'text-blue-500';
              if (idx === 1) { iconBg = 'bg-green-50'; iconColor = 'text-green-500'; }
              if (idx === 2) { iconBg = 'bg-orange-50'; iconColor = 'text-orange-500'; }

              return (
                <div 
                  key={item.id} 
                  onClick={() => navigate('detail', { item })}
                  className="bg-white p-3.5 rounded-[1.2rem] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex justify-between items-center cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center space-x-3.5 flex-1 min-w-0 pr-2">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
                       <Package size={20} className={iconColor} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-[13px] truncate">{item.title}</h3>
                      <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">{item.mesin} &bull; {item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 shrink-0">
                    <span className={cn("px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wide",
                      isSelesai ? "bg-green-50 text-green-600" : 
                      isUrgent ? "bg-orange-50 text-orange-500" : "bg-blue-50 text-blue-500"
                    )}>
                      {isUrgent ? 'Urgent' : isSelesai ? 'Selesai' : 'Diproses'}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
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
