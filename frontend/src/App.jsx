import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Matching from './pages/Matching';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes> 
    </>
       
  );
}

export default App;