import React from 'react';
import { Home, FileText, Search, MoreHorizontal, Plus } from 'lucide-react';
import { useAppContext } from '../store';
import { cn } from '../utils';

export default function BottomNav() {
  const { currentScreen, navigate } = useAppContext();

  // Highlight 'cari' if we are in 'cari' or 'FilterCari' screen
  const isActive = (screens: string[]) => screens.includes(currentScreen);

  return (
    <div className="absolute bottom-0 w-full bg-white px-6 py-2 pb-6 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-end max-w-sm mx-auto relative h-12">
        <button 
          onClick={() => navigate('home')}
          className={cn("flex flex-col items-center space-y-1 w-12", isActive(['home']) ? "text-blue-600" : "text-gray-400")}
        >
          <Home size={22} className={isActive(['home']) ? "fill-blue-600/20" : ""} />
          <span className="text-[10px] font-bold">Dashboard</span>
        </button>

        <button 
          onClick={() => navigate('pengajuan')}
          className={cn("flex flex-col items-center space-y-1 w-12", isActive(['pengajuan', 'detail', 'form', 'tracking', 'lampiran']) ? "text-blue-600" : "text-gray-400")}
        >
          <FileText size={22} className={isActive(['pengajuan', 'detail', 'form', 'tracking', 'lampiran']) ? "fill-blue-600/20" : ""} />
          <span className="text-[10px] font-medium">Pengajuan</span>
        </button>

        <div className="w-14 flex justify-center h-full">
          <button 
            onClick={() => navigate('form')}
            className="absolute -top-5 bg-gradient-to-tr from-blue-600 to-blue-400 text-white rounded-full p-3.5 shadow-lg shadow-blue-500/40 active:scale-95 transition-transform"
          >
            <Plus size={24} />
          </button>
        </div>

        <button 
          onClick={() => navigate('cari')}
          className={cn("flex flex-col items-center space-y-1 w-12", isActive(['cari']) ? "text-blue-600" : "text-gray-400")}
        >
          <Search size={22} />
          <span className="text-[10px] font-medium">Cari</span>
        </button>

        <button 
          onClick={() => navigate('lainnya')}
          className={cn("flex flex-col items-center space-y-1 w-12", isActive(['lainnya']) ? "text-blue-600" : "text-gray-400")}
        >
          <MoreHorizontal size={22} />
          <span className="text-[10px] font-medium">Lainnya</span>
        </button>
      </div>
    </div>
  );
}
