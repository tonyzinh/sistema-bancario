import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { ClientePage } from '@/pages/ClientePage';
import { Header } from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cliente/:id" element={<ClientePage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
