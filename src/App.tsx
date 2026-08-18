import React from 'react';
import { AppProvider, useAppContext } from './store';
import Dashboard from './screens/Dashboard';
import DaftarPengajuan from './screens/DaftarPengajuan';
import DetailPengajuan from './screens/DetailPengajuan';
import FilterCari from './screens/FilterCari';
import FormPengajuan from './screens/FormPengajuan';
import TrackingProses from './screens/TrackingProses';
import Lampiran from './screens/Lampiran';
import MenuLainnya from './screens/MenuLainnya';
import BottomNav from './components/BottomNav';

function AppContent() {
  const { currentScreen } = useAppContext();

  // Screens that show the bottom nav
  const showNav = ['home', 'pengajuan', 'cari', 'lainnya'].includes(currentScreen);

  return (
    <div className="w-full h-[100dvh] bg-white flex flex-col font-sans relative overflow-hidden">
        
        {currentScreen === 'home' && <Dashboard />}
        {currentScreen === 'pengajuan' && <DaftarPengajuan />}
        {currentScreen === 'cari' && <FilterCari />}
        {currentScreen === 'lainnya' && <MenuLainnya />}
        {currentScreen === 'detail' && <DetailPengajuan />}
        {currentScreen === 'form' && <FormPengajuan />}
        {currentScreen === 'tracking' && <TrackingProses />}
        {currentScreen === 'lampiran' && <Lampiran />}
        
        {showNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
