import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";

// Seller components
import HomeSeller from "./Seller/HomeSeller";
import UploadVideo from "./Seller/UploadVideo";
import RecordVideo from "./Seller/RecordVideo";

// Receiver components
import HomeReceiver from "./Receiver/HomeReceiver";
import QRPage from "./Receiver/QRPage";
import ScanQR from "./Receiver/ScanQR";
import TextcodePage from "./Receiver/TextcodePage";
import VideoPage from "./Receiver/VideoPage";

// Employee components
import CheckOrders from "./Employee/CheckOrders";

// Styling
import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/seller" exact element={<HomeSeller />} />
          <Route path="/upload" exact element={<UploadVideo />} />
          <Route path="/record" exact element={<RecordVideo />} />
          <Route path="/rewatchvideo" exact element={<VideoPage />} />
          <Route path="/receiver" exact element={<HomeReceiver />} />
          <Route path="/qr-code" exact element={<QRPage />} />
          <Route path="/scan" exact element={<ScanQR />} />
          <Route path="/textcode" exact element={<TextcodePage />} />
          <Route path="/watchvideo/:id" element={<VideoPage />} />
          <Route path="/checkorders" exact element={<CheckOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
