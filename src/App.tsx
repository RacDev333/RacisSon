import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import BroadcastBanner from './components/BroadcastBanner';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BroadcastBanner />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
