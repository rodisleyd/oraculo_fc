import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { Onboarding } from './pages/Onboarding';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Live } from './pages/Live';
import { Explore } from './pages/Explore';
import { Profile } from './pages/Profile';
import { TeamDetails } from './pages/TeamDetails';
import { Encyclopedia } from './pages/Encyclopedia';

const AppRoutes = () => {
  const { isOnboarded, isInitialized } = useApp();

  // Prevent premature redirection before auth check is done
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/landing" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Protected App Routes */}
      <Route path="/" element={isOnboarded ? <AppLayout /> : <Navigate to="/landing" replace />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="live" element={<Live />} />
        <Route path="explore" element={<Explore />} />
        <Route path="encyclopedia" element={<Encyclopedia />} />
        <Route path="profile" element={<Profile />} />
        <Route path="team/:id" element={<TeamDetails />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
