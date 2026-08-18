import React from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { useAppContext } from '../store';

export default function FilterCari() {
  const { goBack } = useAppContext();

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-5 pt-6 pb-4 border-b border-gray-100">
        <button onClick={goBack} className="p-1 -ml-1 text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold text-gray-900 text-lg flex-1 text-center pr-6">Cari & Filter</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24">
        {/* Search */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            defaultValue="forklift"
            className="w-full bg-gray-50 text-gray-900 text-sm rounded-xl py-3 pl-10 pr-10 outline-none border border-gray-200 focus:border-green-500"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-0.5">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-900">Filter</h2>
          <button className="text-sm font-medium text-green-600">Reset</button>
        </div>

        {/* Form fields */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Bulan</label>
            <select className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 appearance-none outline-none focus:border-green-500">
              <option>Semua Bulan</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Bagian</label>
            <select className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 appearance-none outline-none focus:border-green-500">
              <option>Semua Bagian</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Mesin</label>
            <select className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 appearance-none outline-none focus:border-green-500">
              <option>Semua Mesin</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Prioritas</label>
            <select className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 appearance-none outline-none focus:border-green-500">
              <option>Semua Prioritas</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Status Proses</label>
            <select className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 appearance-none outline-none focus:border-green-500">
              <option>Semua Status</option>
            </select>
          </div>
        </div>

        <button className="w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold text-sm shadow-md shadow-green-600/20 mb-8">
          Terapkan Filter
        </button>

        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-1">Hasil Pencarian</h3>
          <p className="text-xs text-gray-500 mb-4">3 hasil ditemukan</p>
          
          <div className="space-y-3">
             {/* Simple static results to match image for Cari view */}
             <ResultCard title="Kip Rem bawah" machine="Forklift 10 ton" qty="2 Set" prioritas="MEDIUM" status="DIPROSES" />
             <ResultCard title="Tie Rod" machine="Forklift 10 ton" qty="2 pcs" prioritas="MEDIUM" status="DIPROSES" />
             <ResultCard title="Selang Hidrolis + Neaple" machine="Forklift 3 ton A" qty="1 Set" prioritas="MEDIUM" status="DIPROSES" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
}

function ResultCard({ title, machine, qty, prioritas, status }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
      <div>
        <h4 className="font-semibold text-gray-900 text-sm mb-1">{title}</h4>
        <p className="text-xs text-gray-500">{machine}</p>
        <p className="text-xs font-medium text-gray-900 mt-1">{qty}</p>
      </div>
      <div className="flex flex-col items-end space-y-1.5">
        <span className="px-2 py-0.5 text-[9px] font-bold bg-orange-50 text-orange-600 rounded">{prioritas}</span>
        <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-50 text-blue-600 rounded">{status}</span>
      </div>
    </div>
  )
}
