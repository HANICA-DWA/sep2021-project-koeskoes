import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Seller components
import HomeSeller from "./Seller/HomeSeller";
import UploadVideo from "./Seller/UploadVideo";
import RecordVideo from "./Seller/RecordVideo";

// Receiver components
import HomeReceiver from "./Receiver/HomeReceiver";
import QRPage from "./Receiver/QRPage";
import ScanQR from "./Receiver/ScanQR";
import TextcodePage from "./Receiver/TextcodePage";

// Employee components
import CheckOrders from "./Employee/CheckOrders";

// Styling
import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/seller" element={<HomeSeller />} />
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/record" element={<RecordVideo />} />
          <Route path="/receiver" element={<HomeReceiver />} />
          <Route path="/qr-code" element={<QRPage />} />
          <Route path="/scan" element={<ScanQR />} />
          <Route path="/textcode" element={<TextcodePage />} />
          <Route path="/checkorders" element={<CheckOrders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
