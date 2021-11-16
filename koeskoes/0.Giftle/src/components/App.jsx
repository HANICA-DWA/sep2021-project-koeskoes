import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeSeller from "./Seller/HomeSeller";
import UploadVideo from "./Seller/UploadVideo";
import HomeReceiver from "./Receiver/HomeReceiver";
import QRcodePage from "./Receiver/QRcodePage";
import TextcodePage from "./Receiver/TextcodePage";
import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/seller" element={<HomeSeller />} />
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/receiver" element={<HomeReceiver />} />
          <Route path="/qr-code" element={<QRcodePage />} />
          <Route path="/textcode" element={<TextcodePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
