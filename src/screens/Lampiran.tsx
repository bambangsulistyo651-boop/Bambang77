import React from 'react';
import { ArrowLeft, Download, FileText, Image as ImageIcon, Paperclip } from 'lucide-react';
import { useAppContext } from '../store';

export default function Lampiran() {
  const { goBack } = useAppContext();

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-5 pt-6 pb-4 border-b border-gray-100 shrink-0">
        <button onClick={goBack} className="p-1 -ml-1 text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold text-gray-900 text-lg flex-1 text-center pr-6">Lampiran</h1>
      </div>

      <div className="flex-1 flex flex-col px-5 pt-5 pb-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-bold text-gray-900 text-sm">Dokumentasi</h2>
          <span className="text-xs font-medium text-green-600">2 file</span>
        </div>

        <div className="space-y-3 flex-1">
          {/* PDF File */}
          <div className="flex items-center p-4 border border-gray-200 rounded-2xl">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0 mr-3">
              <FileText className="text-red-500" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">foto_kerusakan_ban_luar.pdf</p>
              <p className="text-xs text-gray-500 mt-0.5">PDF • 1.2 MB</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-green-600 ml-2">
              <Download size={20} />
            </button>
          </div>

          {/* JPG File */}
          <div className="flex items-center p-4 border border-gray-200 rounded-2xl">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0 mr-3">
              <ImageIcon className="text-green-600" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">foto_gerobak_sawmill.jpg</p>
              <p className="text-xs text-gray-500 mt-0.5">JPG • 2.4 MB</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-green-600 ml-2">
              <Download size={20} />
            </button>
          </div>
        </div>

        <button className="w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold text-sm shadow-md shadow-green-600/20 flex justify-center items-center space-x-2 mt-auto">
          <Paperclip size={18} />
          <span>Tambah Lampiran</span>
        </button>
      </div>
    </div>
  );
}
