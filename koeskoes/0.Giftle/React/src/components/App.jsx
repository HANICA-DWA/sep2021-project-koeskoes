import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomeSeller from "./Seller/HomeSeller";
import UploadVideo from "./Seller/UploadVideo";
import HomeReceiver from "./Receiver/HomeReceiver";
import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/seller" element={<UploadVideo />} />
          <Route path="/receiver" element={<HomeReceiver />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
