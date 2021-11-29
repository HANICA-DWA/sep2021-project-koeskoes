import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";

// Buyer components
import HomeBuyer from "./Buyer/HomeBuyer";
import UploadVideo from "./Buyer/UploadVideo";
import RecordVideo from "./Buyer/RecordVideo";

// Receiver components
import HomeReceiver from "./Receiver/HomeReceiver";
import QRPage from "./Receiver/QRPage";
import ScanQR from "./Receiver/ScanQR";
import TextCodePage from "./Receiver/TextCodePage";
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
          <Route path="/buyer" exact element={<HomeBuyer />} />
          <Route path="/upload" exact element={<UploadVideo />} />
          <Route path="/record" exact element={<RecordVideo />} />
          <Route path="/rewatchvideo" exact element={<VideoPage />} />
          <Route path="/receiver" exact element={<HomeReceiver />} />
          <Route path="/qr-code" exact element={<QRPage />} />
          <Route path="/scan" exact element={<ScanQR />} />
          <Route path="/textcode" exact element={<TextCodePage />} />
          <Route path="/watchvideo/:textcode" element={<VideoPage />} />
          <Route path="/checkorders" exact element={<CheckOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
