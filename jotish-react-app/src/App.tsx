import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Visuals from "./pages/Visuals";
import Details from "./pages/Details";
import PhotoResult from "./pages/PhotoResult";
import Home from "./pages/Home";

function App() {

  return (
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
  )
}

export default App
