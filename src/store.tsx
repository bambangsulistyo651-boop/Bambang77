import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Pengajuan, Prioritas, StatusProses, Riwayat } from './types';
import { db, collection, onSnapshot, query, addDoc } from './firebase';

export type ScreenName = 'home' | 'pengajuan' | 'cari' | 'lainnya' | 'detail' | 'form' | 'tracking' | 'lampiran';

type AppContextType = {
  currentScreen: ScreenName;
  navigate: (screen: ScreenName, params?: any) => void;
  goBack: () => void;
  pengajuanList: Pengajuan[];
  activeItem: Pengajuan | null;
  addPengajuan: (item: Omit<Pengajuan, 'id'>) => Promise<void>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<ScreenName[]>(['home']);
  const [activeItem, setActiveItem] = useState<Pengajuan | null>(null);
  const [pengajuanList, setPengajuanList] = useState<Pengajuan[]>([]);

  useEffect(() => {
    // Listen to the new collection "permintaan_barang"
    const q = query(collection(db, 'permintaan_barang'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => {
          const raw = doc.data();
          
          // Map raw Firebase data to our app's expected format
          // Handle cases where fields might have different names or be missing
          
          // Safely parse date
          let dateStr = "Unknown Date";
          let parsedTimestampMs = raw.createdAt || 0;

          if (raw['Tanggal Pengajuan']) {
            if (raw['Tanggal Pengajuan'].toDate) {
               const d = raw['Tanggal Pengajuan'].toDate();
               dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
               if (!parsedTimestampMs) parsedTimestampMs = d.getTime();
            } else if (typeof raw['Tanggal Pengajuan'] === 'string') {
               // Google Sheets import sometimes sets string like "February 7, 2026 at 12:00:00 AM UTC+7"
               const cleanDateString = raw['Tanggal Pengajuan'].split(' at ')[0]; 
               const d = new Date(cleanDateString);
               
               if (!isNaN(d.getTime())) {
                 dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                 if (!parsedTimestampMs) parsedTimestampMs = d.getTime();
               } else {
                 dateStr = raw['Tanggal Pengajuan'].split('T')[0]; // simple fallback
               }
            }
          }
          
          const title = raw['Nama Barang'] || "Tanpa Nama";
          const prioritasRaw = raw['Prioritas'] || 'Low';
          const statusRaw = raw['Status Proses'] || 'Diajukan';
          
          // Clean status string if it has emojis (like "🔄 Diproses")
          const cleanStatus = statusRaw.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim().toUpperCase();
          const p = prioritasRaw.toUpperCase();

          const mapped: Pengajuan = {
            id: doc.id,
            title: title,
            desc: raw['Deskripsi Penggunaan'] || '-',
            alasan: raw['Keterangan'] || '-',
            date: dateStr,
            mesin: raw['Mesin'] || '-',
            bagian: raw['Bagian'] || '-',
            qty: raw['Jumlah'] || 0,
            unit: raw['Satuan'] || 'pcs',
            prioritas: (prioritasRaw === 'Urgent' || prioritasRaw === 'Medium' || prioritasRaw === 'Low') ? prioritasRaw : 'Low',
            statusLabels: [p, cleanStatus],
            riwayat: [], // We'll keep this empty or mock it since it's not in the new schema yet
            createdAt: parsedTimestampMs
          };
          return mapped;
        });
        
        // Urutkan berdasarkan waktu pembuatan terbaru (descending)
        data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        
        setPengajuanList(data);
      } else {
        setPengajuanList([]);
      }
    }, (error) => {
      console.error("Firestore onSnapshot error:", error);
    });

    return () => unsubscribe();
  }, []);

  const currentScreen = history[history.length - 1];

  const navigate = (screen: ScreenName, params?: any) => {
    if (params?.item) setActiveItem(params.item);
    setHistory((prev) => [...prev, screen]);
  };

  const goBack = () => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const addPengajuan = async (item: Omit<Pengajuan, 'id'>) => {
    try {
      // Map it back to the expected schema in 'permintaan_barang'
      const firestorePayload = {
        'Nama Barang': item.title,
        'Deskripsi Penggunaan': item.desc,
        'Keterangan': item.alasan,
        'Mesin': item.mesin,
        'Bagian': item.bagian,
        'Jumlah': item.qty,
        'Satuan': item.unit,
        'Prioritas': item.prioritas,
        'Status Proses': 'Diajukan', // Default
        'Tanggal Pengajuan': new Date(),
        'createdAt': item.createdAt
      };

      await addDoc(collection(db, 'permintaan_barang'), firestorePayload);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <AppContext.Provider
      value={{ currentScreen, navigate, goBack, pengajuanList, activeItem, addPengajuan }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};
