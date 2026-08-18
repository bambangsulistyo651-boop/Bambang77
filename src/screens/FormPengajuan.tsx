import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useAppContext } from '../store';
import { cn } from '../utils';
import { Prioritas, Riwayat } from '../types';

export default function FormPengajuan() {
  const { goBack, addPengajuan } = useAppContext();
  const [prioritas, setPrioritas] = useState<Prioritas>('Urgent');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const desc = formData.get('desc') as string;
    const alasan = formData.get('alasan') as string;
    const mesin = formData.get('mesin') as string;
    const bagian = formData.get('bagian') as string;
    const qty = parseInt(formData.get('qty') as string, 10);
    const unit = formData.get('unit') as string;

    const dateStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const timeStr = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const riwayat: Riwayat[] = [
      { status: 'Diajukan', date: `${dateStr} ${timeStr}`, desc: 'Pengajuan berhasil dibuat', state: 'completed' },
      { status: 'Diperiksa', date: '-', desc: 'Menunggu', state: 'upcoming' },
      { status: 'Diproses', date: '-', desc: 'Menunggu', state: 'upcoming' },
      { status: 'Barang Dibeli', date: '-', desc: 'Menunggu', state: 'upcoming' },
      { status: 'Selesai', date: '-', desc: 'Menunggu', state: 'upcoming' },
    ];

    const newItem = {
      title,
      desc,
      alasan,
      mesin,
      bagian,
      qty,
      unit,
      prioritas,
      date: dateStr,
      statusLabels: [prioritas.toUpperCase(), 'DIAJUKAN'],
      riwayat,
      createdAt: Date.now()
    };

    await addPengajuan(newItem);
    setIsSubmitting(false);
    goBack();
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
      <div className="flex items-center px-5 pt-6 pb-4 border-b border-gray-100 shrink-0">
        <button type="button" onClick={goBack} className="p-1 -ml-1 text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold text-gray-900 text-lg flex-1 text-center pr-6">Pengajuan Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 pt-5 pb-24 space-y-5">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nama Barang <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="title"
            required
            placeholder="Masukkan nama barang"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Deskripsi Penggunaan <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="desc"
            required
            placeholder="Deskripsi penggunaan barang"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Alasan Pengajuan <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="alasan"
            required
            placeholder="Alasan pengajuan barang"
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mesin <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select name="mesin" required className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm appearance-none outline-none focus:border-green-500 text-gray-900">
                <option value="">Pilih Mesin</option>
                <option value="SawMill 1">SawMill 1</option>
                <option value="Bor Multihead">Bor Multihead</option>
                <option value="Forklift 10 ton">Forklift 10 ton</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Bagian <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select name="bagian" required className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm appearance-none outline-none focus:border-green-500 text-gray-900">
                <option value="">Pilih Bagian</option>
                <option value="SawMill">SawMill</option>
                <option value="Moulding">Moulding</option>
                <option value="Forklift">Forklift</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Jumlah <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              name="qty"
              required
              min="1"
              defaultValue="1"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Satuan <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select name="unit" required className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm appearance-none outline-none focus:border-green-500 text-gray-900">
                <option value="">Pilih Satuan</option>
                <option value="pcs">pcs</option>
                <option value="Set">Set</option>
                <option value="Unit">Unit</option>
                <option value="Kg">Kg</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prioritas <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer" onClick={() => setPrioritas('Urgent')}>
              <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", prioritas === 'Urgent' ? 'border-red-500' : 'border-gray-300')}>
                {prioritas === 'Urgent' && <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>}
              </div>
              <span className="text-sm text-gray-700">Urgent</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer" onClick={() => setPrioritas('Medium')}>
              <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", prioritas === 'Medium' ? 'border-orange-500' : 'border-gray-300')}>
                {prioritas === 'Medium' && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
              </div>
              <span className="text-sm text-gray-700">Medium</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer" onClick={() => setPrioritas('Low')}>
              <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", prioritas === 'Low' ? 'border-green-500' : 'border-gray-300')}>
                {prioritas === 'Low' && <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>}
              </div>
              <span className="text-sm text-gray-700">Low</span>
            </label>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold text-sm shadow-md shadow-green-600/20 mt-4 disabled:opacity-50"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan'}
        </button>

      </form>
    </div>
  );
}
