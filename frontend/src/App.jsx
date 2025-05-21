import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Matching from './pages/Matching';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar /> {/* immer sichtbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;