import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Matching from './pages/Matching';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes> 
      {!isLoginPage && <Footer />}
    </>
       
  );
}

export default App;