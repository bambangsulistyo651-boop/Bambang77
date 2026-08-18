import React from 'react';
import { ArrowLeft, ScanLine } from 'lucide-react';
import { useAppContext } from '../store';
import { cn } from '../utils';

export default function DetailPengajuan() {
  const { activeItem, goBack, navigate } = useAppContext();

  if (!activeItem) return null;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <button onClick={goBack} className="p-1 -ml-1 text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold text-gray-900 text-lg">Detail Pengajuan</h1>
        <button className="p-1 -mr-1 text-gray-600">
          <ScanLine size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Main Info Card */}
        <div className="bg-white px-5 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{activeItem.title}</h2>
          
          <div className="flex space-x-2 mb-4">
              {activeItem.statusLabels.map(label => (
                <span key={label} className={cn(
                  "px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wide",
                  label === 'URGENT' ? 'bg-red-50 text-red-600' :
                  label === 'MEDIUM' ? 'bg-orange-50 text-orange-600' :
                  label === 'DIPROSES' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                )}>
                  {label}
                </span>
              ))}
          </div>

          <div className="flex flex-wrap gap-y-3 gap-x-6 text-xs text-gray-600 mb-5">
             <div className="flex items-center space-x-2">
               <span className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center">🗓</span>
               <span>{activeItem.date}</span>
             </div>
             <div className="flex items-center space-x-2">
               <span className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center">⚙️</span>
               <span>{activeItem.mesin}</span>
             </div>
             <div className="flex items-center space-x-2">
               <span className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center">👤</span>
               <span>{activeItem.qty} {activeItem.unit}</span>
             </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div>
              <h3 className="text-xs font-semibold text-gray-900 mb-1.5">Deskripsi Penggunaan</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{activeItem.desc}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-900 mb-1.5">Alasan Pengajuan</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{activeItem.alasan}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 mt-6 pt-5 border-t border-gray-100">
             <div>
               <p className="text-xs text-gray-500 mb-1">Mesin</p>
               <p className="text-sm font-medium text-gray-900">{activeItem.mesin}</p>
             </div>
             <div>
               <p className="text-xs text-gray-500 mb-1">Bagian</p>
               <p className="text-sm font-medium text-gray-900">{activeItem.bagian}</p>
             </div>
             <div>
               <p className="text-xs text-gray-500 mb-1">Jumlah</p>
               <p className="text-sm font-medium text-gray-900">{activeItem.qty}</p>
             </div>
             <div>
               <p className="text-xs text-gray-500 mb-1">Satuan</p>
               <p className="text-sm font-medium text-gray-900">{activeItem.unit}</p>
             </div>
             <div>
               <p className="text-xs text-gray-500 mb-1">Prioritas</p>
               <div className="flex items-center space-x-1.5 mt-1">
                 <div className={cn("w-2 h-2 rounded-full", activeItem.prioritas === 'Urgent' ? 'bg-red-500' : 'bg-orange-500')}></div>
                 <span className="text-sm font-medium text-gray-900">{activeItem.prioritas}</span>
               </div>
             </div>
             <div>
               <p className="text-xs text-gray-500 mb-1">Status Proses</p>
               <div className="flex items-center space-x-1.5 mt-1">
                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                 <span className="text-sm font-medium text-gray-900">Diproses</span>
               </div>
             </div>
          </div>
        </div>

        {/* Riwayat Proses */}
        <div className="bg-white mt-2 px-5 py-5 border-y border-gray-100 cursor-pointer" onClick={() => navigate('tracking')}>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Riwayat Proses</h3>
          <div className="relative pl-3 space-y-6">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200"></div>
            
            {activeItem.riwayat.map((step, idx) => (
              <div key={idx} className="relative pl-6">
                <div className={cn(
                  "absolute left-[-21px] top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white",
                  step.state === 'completed' ? "border-green-500 bg-green-500" :
                  step.state === 'current' ? "border-blue-500" : "border-gray-300"
                )}>
                  {step.state === 'completed' && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  {step.state === 'current' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <div>
                  <h4 className={cn("text-sm font-semibold", step.state === 'upcoming' ? "text-gray-400" : "text-gray-900")}>
                    {step.status}
                  </h4>
                  {step.date !== '-' && <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-5 py-6 flex space-x-3">
          <button className="flex-1 py-3.5 border border-green-600 text-green-600 rounded-xl font-semibold text-sm">
            Edit
          </button>
          <button 
            onClick={() => navigate('lampiran')}
            className="flex-[2] py-3.5 bg-green-600 text-white rounded-xl font-semibold text-sm shadow-md shadow-green-600/20"
          >
            Lihat Lampiran
          </button>
        </div>
      </div>
    </div>
  );
}
