import React, { useState, useMemo } from 'react';
import { Menu, SlidersHorizontal, Search, Plus, Calendar, Settings, ChevronDown } from 'lucide-react';
import { useAppContext } from '../store';
import { cn } from '../utils';

export default function DaftarPengajuan() {
  const { pengajuanList, navigate } = useAppContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState('Semua');
  const [filterBulan, setFilterBulan] = useState('');
  const [filterBagian, setFilterBagian] = useState('');
  const [filterMesin, setFilterMesin] = useState('');

  // Extract unique options for dropdowns
  const { bulanOptions, bagianOptions, mesinOptions } = useMemo(() => {
    const bagianSet = new Set<string>();
    const mesinSet = new Set<string>();
    
    pengajuanList.forEach(p => {
      if (p.bagian && p.bagian !== '-') bagianSet.add(p.bagian);
      if (p.mesin && p.mesin !== '-') mesinSet.add(p.mesin);
    });

    return {
      bulanOptions: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      bagianOptions: Array.from(bagianSet).sort(),
      mesinOptions: Array.from(mesinSet).sort()
    };
  }, [pengajuanList]);

  // Apply filters
  const filteredList = useMemo(() => {
    return pengajuanList.filter(item => {
      // Search
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchLower) || 
        item.mesin.toLowerCase().includes(searchLower) ||
        item.bagian.toLowerCase().includes(searchLower);

      // Chips
      let matchesChip = true;
      if (activeChip === 'Urgent') {
        matchesChip = item.prioritas === 'Urgent' || item.statusLabels.includes('URGENT');
      } else if (activeChip === 'Diproses') {
        matchesChip = item.statusLabels.includes('DIPROSES');
      } else if (activeChip === 'Selesai') {
        matchesChip = item.statusLabels.includes('SELESAI');
      }

      // Dropdowns
      const dateLower = item.date.toLowerCase();
      const matchesBulan = !filterBulan || dateLower.includes(filterBulan.toLowerCase()) || 
        (filterBulan === 'Agu' && dateLower.includes('aug')) || 
        (filterBulan === 'Okt' && dateLower.includes('oct')) ||
        (filterBulan === 'Des' && dateLower.includes('dec')) ||
        (filterBulan === 'Mei' && dateLower.includes('may'));

      const matchesBagian = !filterBagian || item.bagian === filterBagian;
      const matchesMesin = !filterMesin || item.mesin === filterMesin;

      return matchesSearch && matchesChip && matchesBulan && matchesBagian && matchesMesin;
    });
  }, [pengajuanList, searchQuery, activeChip, filterBulan, filterBagian, filterMesin]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-8 pb-4 bg-white border-b border-gray-100">
        <h1 className="font-semibold text-gray-900 text-lg">Pengajuan Barang</h1>
        <button onClick={() => navigate('cari')}>
            <SlidersHorizontal className="text-gray-600" size={22} />
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white px-5 py-3 shadow-sm z-10 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama barang, mesin, bagian..." 
            className="w-full bg-gray-100 text-sm rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-500/20"
          />
        </div>

        {/* Chips */}
        <div className="flex space-x-2 mt-4 overflow-x-auto no-scrollbar pb-1">
          {['Semua', 'Urgent', 'Diproses', 'Selesai'].map(chip => (
            <button 
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={cn(
                "px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors",
                activeChip === chip ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
              )}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Dropdowns */}
        <div className="flex space-x-2 mt-3">
          <div className="flex-1 relative">
            <select 
              value={filterBulan} 
              onChange={e => setFilterBulan(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 outline-none focus:border-green-500"
            >
              <option value="">Semua Bulan</option>
              {bulanOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown size={14} className="text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"/>
          </div>
          
          <div className="flex-1 relative">
            <select 
              value={filterBagian} 
              onChange={e => setFilterBagian(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 outline-none focus:border-green-500"
            >
              <option value="">Semua Bagian</option>
              {bagianOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown size={14} className="text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"/>
          </div>

          <div className="flex-1 relative">
            <select 
              value={filterMesin} 
              onChange={e => setFilterMesin(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 outline-none focus:border-green-500"
            >
              <option value="">Semua Mesin</option>
              {mesinOptions.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown size={14} className="text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"/>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 space-y-4">
        {filteredList.length === 0 ? (
           <div className="text-center text-gray-400 text-sm mt-10">Data tidak ditemukan.</div>
        ) : filteredList.map((item) => {
          const status = item.statusLabels.find(l => !['URGENT', 'MEDIUM', 'LOW'].includes(l)) || 'DIAJUKAN';
          const isSelesai = status.includes('SELESAI');
          const isUrgent = item.prioritas === 'Urgent';
          const isMedium = item.prioritas === 'Medium';

          return (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex space-x-2 mb-3">
                <span className={cn(
                  "px-2 py-0.5 text-[10px] font-bold rounded uppercase",
                  isUrgent ? 'bg-red-50 text-red-600' :
                  isMedium ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                )}>
                  {item.prioritas.toUpperCase()}
                </span>
                <span className={cn(
                  "px-2 py-0.5 text-[10px] font-bold rounded uppercase",
                  isSelesai ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-600'
                )}>
                  {status}
                </span>
              </div>
              
              <h3 className="font-bold text-gray-900 text-[15px]">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
              
              <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1.5 shrink-0">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center space-x-1.5 min-w-0 flex-1">
                  <Settings size={14} className="shrink-0" />
                  <span className="truncate">{item.mesin} • {item.bagian}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                <span className="font-semibold text-gray-900 text-sm">{item.qty} {item.unit}</span>
                <button 
                  onClick={() => navigate('detail', { item })}
                  className="text-green-600 font-medium text-xs flex items-center space-x-1"
                >
                  <span>Lihat Detail</span>
                  <span className="text-[10px]">&gt;</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAB */}
      <button 
        onClick={() => navigate('form')}
        className="absolute bottom-24 right-5 w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-600/30 active:scale-95 transition-transform z-20"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
