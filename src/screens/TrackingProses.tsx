import React from 'react';
import { ArrowLeft, Package } from 'lucide-react';
import { useAppContext } from '../store';
import { cn } from '../utils';

export default function TrackingProses() {
  const { activeItem, goBack } = useAppContext();

  if (!activeItem) return null;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-5 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <button onClick={goBack} className="p-1 -ml-1 text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold text-gray-900 text-lg flex-1 text-center pr-6">Tracking Proses</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Banner Card */}
        <div className="px-5 pt-5 pb-2">
          <div className="bg-green-500 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg shadow-green-500/20">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-1">{activeItem.title}</h2>
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-bold text-[13px]">
                  <span className="text-red-300">U</span>rgent
                </span>
              </div>
              <p className="text-sm text-white/90">Diajukan {activeItem.date}</p>
            </div>
            
            {/* Box Icon Watermark */}
            <div className="absolute right-[-10px] bottom-[-20px] opacity-20">
              <Package size={140} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="bg-white mx-5 mt-4 rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="relative pl-4 space-y-8">
            <div className="absolute left-5 top-2 bottom-4 w-0.5 bg-gray-200"></div>
            
            {activeItem.riwayat.map((step, idx) => (
              <div key={idx} className="relative pl-8">
                <div className={cn(
                  "absolute left-[-22px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white",
                  step.state === 'completed' ? "border-green-500 bg-green-500" :
                  step.state === 'current' ? "border-blue-500" : "border-gray-300"
                )}>
                  {step.state === 'completed' && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  {step.state === 'current' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={cn("text-[15px] font-bold", step.state === 'upcoming' ? "text-gray-400" : "text-gray-900")}>
                      {step.status}
                    </h4>
                    <p className={cn("text-xs mt-1", step.state === 'upcoming' ? "text-gray-400" : "text-gray-500")}>
                      {step.desc}
                    </p>
                  </div>
                  {step.date !== '-' && (
                    <span className="text-xs text-gray-400 shrink-0 pt-0.5">{step.date.split(' ')[2]}</span>
                  )}
                  {step.date === '-' && (
                    <span className="text-xs text-gray-400 shrink-0 pt-0.5">Menunggu</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 mt-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Catatan</h3>
          <p className="text-sm text-gray-600">Mohon menunggu, pengajuan Anda sedang kami proses.</p>
        </div>
      </div>
    </div>
  );
}
