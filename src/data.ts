import { Pengajuan } from './types';

export const initialData: Pengajuan[] = [
  {
    id: '1',
    title: 'Ban Luar',
    desc: 'Untuk gerobak sawmill BL 80/90-1 / merk federal',
    alasan: 'Rusak',
    date: '3 Agu 2026',
    mesin: 'SawMill 1',
    bagian: 'SawMill',
    qty: 1,
    unit: 'pcs',
    prioritas: 'Urgent',
    statusLabels: ['URGENT', 'DIPROSES'],
    riwayat: [
      { status: 'Diajukan', date: '3 Agu 2026 08:30', desc: 'Pengajuan berhasil dibuat', state: 'completed' },
      { status: 'Diperiksa', date: '3 Agu 2026 09:15', desc: 'Pengajuan telah diperiksa', state: 'completed' },
      { status: 'Diproses', date: '4 Agu 2026 10:20', desc: 'Sedang dalam proses pengadaan', state: 'current' },
      { status: 'Barang Dibeli', date: '-', desc: 'Menunggu', state: 'upcoming' },
      { status: 'Selesai', date: '-', desc: 'Menunggu', state: 'upcoming' },
    ]
  },
  {
    id: '2',
    title: 'Diameter Bor Wipro',
    desc: 'Diameter 25 As 10 Orman',
    alasan: 'Patah',
    date: '4 Agu 2026',
    mesin: 'Bor Multihead',
    bagian: 'Moulding',
    qty: 8,
    unit: 'pcs',
    prioritas: 'Medium',
    statusLabels: ['MEDIUM', 'DIPROSES'],
    riwayat: [
      { status: 'Diajukan', date: '4 Agu 2026 08:30', desc: 'Pengajuan berhasil dibuat', state: 'completed' },
      { status: 'Diperiksa', date: '4 Agu 2026 09:15', desc: 'Pengajuan telah diperiksa', state: 'completed' },
      { status: 'Diproses', date: '5 Agu 2026 10:20', desc: 'Sedang dalam proses pengadaan', state: 'current' },
      { status: 'Barang Dibeli', date: '-', desc: 'Menunggu', state: 'upcoming' },
      { status: 'Selesai', date: '-', desc: 'Menunggu', state: 'upcoming' },
    ]
  },
  {
    id: '3',
    title: 'Kip Rem bawah',
    desc: 'akebone size 17/8 assy',
    alasan: 'Aus',
    date: '6 Agu 2026',
    mesin: 'Forklift 10 ton',
    bagian: 'Forklift',
    qty: 2,
    unit: 'Set',
    prioritas: 'Medium',
    statusLabels: ['MEDIUM', 'DIPROSES'],
    riwayat: [
      { status: 'Diajukan', date: '6 Agu 2026 08:30', desc: 'Pengajuan berhasil dibuat', state: 'completed' },
      { status: 'Diperiksa', date: '6 Agu 2026 09:15', desc: 'Pengajuan telah diperiksa', state: 'completed' },
      { status: 'Diproses', date: '7 Agu 2026 10:20', desc: 'Sedang dalam proses pengadaan', state: 'current' },
      { status: 'Barang Dibeli', date: '-', desc: 'Menunggu', state: 'upcoming' },
      { status: 'Selesai', date: '-', desc: 'Menunggu', state: 'upcoming' },
    ]
  }
];

export const chartData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 10 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 8 },
  { name: 'Mei', value: 11 },
  { name: 'Jun', value: 13 },
  { name: 'Jul', value: 19 },
  { name: 'Agu', value: 25 },
];
