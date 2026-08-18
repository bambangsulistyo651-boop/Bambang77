import React from 'react';
import { RefreshCcw, Settings, Database, Info, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export default function MenuLainnya() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 bg-white border-b border-gray-100">
        <h1 className="font-semibold text-gray-900 text-lg">Lainnya</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile */}
        <div className="px-5 py-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              A
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-900 text-base">Admin FPB</h2>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
        </div>

        {/* Menu Sections */}
        <div className="px-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3 ml-1">Menu</h3>
          
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-6">
            <MenuRow 
              icon={<RefreshCcw size={20} className="text-gray-500" />} 
              title="Sinkronisasi Data" 
              subtitle="Terakhir sync: 08 Agu 2026 10:30" 
              hasBorder
            />
            <MenuRow 
              icon={<Settings size={20} className="text-gray-500" />} 
              title="Pengaturan" 
              hasBorder
            />
            <MenuRow 
              icon={<Database size={20} className="text-gray-500" />} 
              title="Backup Data" 
            />
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-6">
            <MenuRow 
              icon={<Info size={20} className="text-gray-500" />} 
              title="Tentang Aplikasi" 
              hasBorder
            />
            <MenuRow 
              icon={<HelpCircle size={20} className="text-gray-500" />} 
              title="Panduan Penggunaan" 
            />
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center p-4 active:bg-gray-50 transition-colors">
              <div className="w-8 flex justify-center"><LogOut size={20} className="text-gray-500" /></div>
              <div className="flex-1 text-left ml-3">
                <span className="font-medium text-gray-900 text-sm">Keluar</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function MenuRow({ icon, title, subtitle, hasBorder }: any) {
  return (
    <button className={`w-full flex items-center p-4 active:bg-gray-50 transition-colors ${hasBorder ? 'border-b border-gray-100' : ''}`}>
      <div className="w-8 flex justify-center">{icon}</div>
      <div className="flex-1 text-left ml-3">
        <div className="font-medium text-gray-900 text-sm">{title}</div>
        {subtitle && <div className="text-[10px] text-gray-500 mt-0.5">{subtitle}</div>}
      </div>
      <ChevronRight className="text-gray-400" size={18} />
    </button>
  )
}
