import React, { useMemo, useState, useRef } from 'react';
import { Bell, Search, Package, Clock, Users, PackageOpen, TrendingUp, ChevronRight, ChevronLeft, BarChart2, ChevronDown } from 'lucide-react';
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer, LabelList } from 'recharts';
import { useAppContext } from '../store';
import { cn } from '../utils';

export default function Dashboard() {
  const { pengajuanList, navigate } = useAppContext();
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false);
  const chartScrollRef = useRef<HTMLDivElement>(null);

  const scrollChart = (direction: 'left' | 'right') => {
    if (chartScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      chartScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const availableYears = useMemo(() => {
    const years = new Set<string>();
    years.add('2026');
    pengajuanList.forEach(item => {
      if (item.createdAt) {
        const y = new Date(item.createdAt).getFullYear();
        if (!isNaN(y) && y > 2000) years.add(y.toString());
      }
      const match = item.date?.match(/\b(202\d)\b/);
      if (match) {
        years.add(match[1]);
      }
    });
    return Array.from(years).sort().reverse();
  }, [pengajuanList]);

  const stats = useMemo(() => {
    let diproses = 0;
    let selesai = 0;
    let urgent = 0;
    let total = 0;

    pengajuanList.forEach(item => {
      if (selectedYear && selectedYear !== 'Semua') {
        let itemYear: string | null = null;
        if (item.createdAt) {
          const d = new Date(item.createdAt);
          if (!isNaN(d.getTime())) itemYear = d.getFullYear().toString();
        }
        if (!itemYear && item.date) {
          const match = item.date.match(/\b(202\d)\b/);
          if (match) itemYear = match[1];
        }
        if (itemYear && itemYear !== selectedYear) return;
      }

      total++;
      if (item.statusLabels.includes('DIPROSES')) diproses++;
      if (item.statusLabels.includes('SELESAI')) selesai++;
      if (item.prioritas === 'Urgent' || item.statusLabels.includes('URGENT')) urgent++;
    });

    return {
      total,
      diproses,
      selesai,
      urgent
    };
  }, [pengajuanList, selectedYear]);

  const dynamicChartData = useMemo(() => {
    // 12 bulan lengkap dari Januari sampai Desember
    const monthConfigs = [
      { name: 'Jan', aliases: ['jan', '-01-', '/01/', '.01.', '01-'] },
      { name: 'Feb', aliases: ['feb', '-02-', '/02/', '.02.', '02-'] },
      { name: 'Mar', aliases: ['mar', '-03-', '/03/', '.03.', '03-'] },
      { name: 'Apr', aliases: ['apr', '-04-', '/04/', '.04.', '04-'] },
      { name: 'Mei', aliases: ['mei', 'may', '-05-', '/05/', '.05.', '05-'] },
      { name: 'Jun', aliases: ['jun', '-06-', '/06/', '.06.', '06-'] },
      { name: 'Jul', aliases: ['jul', '-07-', '/07/', '.07.', '07-'] },
      { name: 'Agu', aliases: ['agu', 'agt', 'aug', '-08-', '/08/', '.08.', '08-'] },
      { name: 'Sep', aliases: ['sep', '-09-', '/09/', '.09.', '09-'] },
      { name: 'Okt', aliases: ['okt', 'oct', '-10-', '/10/', '.10.', '10-'] },
      { name: 'Nov', aliases: ['nov', '-11-', '/11/', '.11.', '11-'] },
      { name: 'Des', aliases: ['des', 'dec', '-12-', '/12/', '.12.', '12-'] },
    ];

    const data = monthConfigs.map(m => ({ name: m.name, value: 0 }));

    pengajuanList.forEach(item => {
      // Filter berdasarkan tahun terpilih
      if (selectedYear && selectedYear !== 'Semua') {
        let itemYear: string | null = null;
        if (item.createdAt) {
          const d = new Date(item.createdAt);
          if (!isNaN(d.getTime())) itemYear = d.getFullYear().toString();
        }
        if (!itemYear && item.date) {
          const match = item.date.match(/\b(202\d)\b/);
          if (match) itemYear = match[1];
        }
        if (itemYear && itemYear !== selectedYear) return;
      }

      let monthIndex = -1;
      const dateStr = (item.date || '').toLowerCase();

      for (let i = 0; i < monthConfigs.length; i++) {
        if (monthConfigs[i].aliases.some(alias => dateStr.includes(alias))) {
          monthIndex = i;
          break;
        }
      }

      // Fallback ke createdAt jika belum terdeteksi dari string tanggal
      if (monthIndex === -1 && item.createdAt) {
        const d = new Date(item.createdAt);
        if (!isNaN(d.getTime())) {
          monthIndex = d.getMonth();
        }
      }

      if (monthIndex >= 0 && monthIndex < 12) {
        data[monthIndex].value += 1;
      }
    });

    return data;
  }, [pengajuanList, selectedYear]);


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
          <div className="relative">
            <button 
              onClick={() => setShowYearDropdown(prev => !prev)}
              className="flex items-center space-x-1.5 text-sm font-semibold text-gray-800 bg-white/70 hover:bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-2xs transition-all"
            >
              <span>{selectedYear === 'Semua' ? 'Semua Tahun' : `Tahun ${selectedYear}`}</span>
              <ChevronDown size={16} className={cn("text-gray-500 transition-transform duration-200", showYearDropdown && "rotate-180")} />
            </button>
          </div>
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
        <div className="bg-white border border-gray-100 rounded-[1.5rem] p-5 shadow-sm mb-6 relative">
          <div className="flex justify-between items-center mb-3">
             <div>
               <h2 className="text-[15px] font-bold text-gray-900 leading-tight">Pengajuan per Bulan</h2>
               <p className="text-[11px] text-gray-400 font-medium">Januari – Desember</p>
             </div>
             
             <div className="flex items-center space-x-2">
               {/* Tombol Geser Kiri / Kanan */}
               <div className="flex items-center space-x-1 bg-gray-50 border border-gray-100 rounded-lg p-0.5">
                 <button 
                   onClick={() => scrollChart('left')}
                   className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-white active:scale-95 transition-all"
                   aria-label="Geser ke kiri"
                   title="Geser ke kiri"
                 >
                   <ChevronLeft size={15} />
                 </button>
                 <div className="w-[1px] h-3 bg-gray-200"></div>
                 <button 
                   onClick={() => scrollChart('right')}
                   className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-white active:scale-95 transition-all"
                   aria-label="Geser ke kanan"
                   title="Geser ke kanan"
                 >
                   <ChevronRight size={15} />
                 </button>
               </div>

               {/* Dropdown Pilihan Tahun */}
               <div className="relative">
                 <button 
                   onClick={() => setShowYearDropdown(prev => !prev)}
                   className="flex items-center space-x-1 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg border border-gray-100 transition-colors"
                 >
                    <span>{selectedYear === 'Semua' ? 'Semua Tahun' : `Tahun ${selectedYear}`}</span>
                    <ChevronDown size={14} className={cn("text-gray-400 transition-transform duration-200", showYearDropdown && "rotate-180")} />
                 </button>
                 
                 {showYearDropdown && (
                   <>
                     <div 
                       className="fixed inset-0 z-30" 
                       onClick={() => setShowYearDropdown(false)}
                     />
                     <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-40 text-xs animate-in fade-in zoom-in-95">
                       {availableYears.map(year => (
                         <button
                           key={year}
                           onClick={() => {
                             setSelectedYear(year);
                             setShowYearDropdown(false);
                           }}
                           className={cn(
                             "w-full text-left px-3 py-2 font-medium hover:bg-blue-50 transition-colors flex items-center justify-between",
                             selectedYear === year ? "text-blue-600 font-bold bg-blue-50/50" : "text-gray-700"
                           )}
                         >
                           <span>Tahun {year}</span>
                           {selectedYear === year && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                         </button>
                       ))}
                       <button
                         onClick={() => {
                           setSelectedYear('Semua');
                           setShowYearDropdown(false);
                         }}
                         className={cn(
                           "w-full text-left px-3 py-2 font-medium border-t border-gray-50 hover:bg-blue-50 transition-colors flex items-center justify-between",
                           selectedYear === 'Semua' ? "text-blue-600 font-bold bg-blue-50/50" : "text-gray-700"
                         )}
                       >
                         <span>Semua Tahun</span>
                         {selectedYear === 'Semua' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                       </button>
                     </div>
                   </>
                 )}
               </div>
             </div>
          </div>

          {/* Hint Swipe / Geser */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2 px-0.5">
            <span className="flex items-center gap-1.5 font-medium text-gray-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Geser ke kiri / kanan untuk melihat bulan lainnya
            </span>
            <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full">
              12 Bulan (Jan - Des)
            </span>
          </div>

          {/* Scrollable Container dengan Touch Swipe */}
          <div 
            ref={chartScrollRef} 
            className="overflow-x-auto pb-2 custom-scrollbar touch-pan-x select-none -mx-1 px-1 scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="h-44 min-w-[660px] pr-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dynamicChartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 11, fill: '#6B7280', fontWeight: 600}} 
                    dy={10} 
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={18}>
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
