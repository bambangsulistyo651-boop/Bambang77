import React from 'react';
import { Home, FileText, Search, MoreHorizontal } from 'lucide-react';
import { useAppContext } from '../store';
import { cn } from '../utils';

export default function BottomNav() {
  const { currentScreen, navigate } = useAppContext();

  // Highlight 'cari' if we are in 'cari' or 'FilterCari' screen
  const isActive = (screens: string[]) => screens.includes(currentScreen);

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-6 py-2 pb-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        <button 
          onClick={() => navigate('home')}
          className={cn("flex flex-col items-center space-y-1", isActive(['home']) ? "text-green-600" : "text-gray-400")}
        >
          <Home size={24} className={isActive(['home']) ? "fill-green-600/20" : ""} />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button 
          onClick={() => navigate('pengajuan')}
          className={cn("flex flex-col items-center space-y-1", isActive(['pengajuan', 'detail', 'form', 'tracking', 'lampiran']) ? "text-green-600" : "text-gray-400")}
        >
          <FileText size={24} className={isActive(['pengajuan', 'detail', 'form', 'tracking', 'lampiran']) ? "fill-green-600/20" : ""} />
          <span className="text-[10px] font-medium">Pengajuan</span>
        </button>

        <button 
          onClick={() => navigate('cari')}
          className={cn("flex flex-col items-center space-y-1", isActive(['cari']) ? "text-green-600" : "text-gray-400")}
        >
          <Search size={24} />
          <span className="text-[10px] font-medium">Cari</span>
        </button>

        <button 
          onClick={() => navigate('lainnya')}
          className={cn("flex flex-col items-center space-y-1", isActive(['lainnya']) ? "text-green-600" : "text-gray-400")}
        >
          <MoreHorizontal size={24} />
          <span className="text-[10px] font-medium">Lainnya</span>
        </button>
      </div>
    </div>
  );
}
