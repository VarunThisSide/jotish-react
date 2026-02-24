import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Visuals from "./pages/Visuals";
import Details from "./pages/Details";
import PhotoResult from "./pages/PhotoResult";
import Home from "./pages/Home";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <>
      <div 
        className="custom-cursor" 
        style={{ left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)' }} 
      />
      <div 
        className="cursor-glow" 
        style={{ left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)' }} 
      />
      <BrowserRouter>
        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/login" element={<Login />} />
          <Route path="/visuals" element={<Visuals />} />
          <Route path="/details" element={<Details />} />
          <Route path="/photo-result" element={<PhotoResult />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
