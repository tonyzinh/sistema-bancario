import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { ClientePage } from '@/pages/ClientePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cliente/:id" element={<ClientePage />} />
      </Routes>
    </Router>
  );
}

export default App;
