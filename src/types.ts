export type Prioritas = 'Urgent' | 'Medium' | 'Low';
export type StatusProses = 'Diajukan' | 'Diperiksa' | 'Diproses' | 'Barang Dibeli' | 'Selesai';
export type StepState = 'completed' | 'current' | 'upcoming';

export interface Riwayat {
  status: StatusProses;
  date: string;
  desc: string;
  state: StepState;
}

export interface Pengajuan {
  id: string;
  title: string;
  desc: string;
  alasan: string;
  date: string;
  mesin: string;
  bagian: string;
  qty: number;
  unit: string;
  prioritas: Prioritas;
  statusLabels: string[];
  riwayat: Riwayat[];
  createdAt?: number;
}
