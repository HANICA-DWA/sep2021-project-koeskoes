import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

// Buyer components
// Temp components
import CheckOutPage from "./Buyer/CheckOutPage";
import CheckOutPageDone from "./Buyer/CheckOutPageDone";

//Perm components
import ControlOrderPage from "./Buyer/ControlOrderPage";
import NoTextCodePage from "./Buyer/NoTextCodePage";
import HomeBuyerPage from "./Buyer/HomeBuyerPage";
import UploadVideoPage from "./Buyer/UploadVideoPage";
import RecordVideo from "./Buyer/RecordVideo";
import RewatchVideoPage from "./Buyer/RewatchVideoPage";
import PersonalizeVideoPage from "./Buyer/PersonalizeVideoPage";
import FinalPage from "./Buyer/FinalPage";

// Receiver components
import HomeReceiverPage from "./Receiver/HomeReceiverPage";
import QRPage from "./Receiver/QRPage";
import ScanQRPage from "./Receiver/ScanQRPage";
import TextCodePage from "./Receiver/TextCodePage";
import VideoPage from "./Receiver/VideoPage";

// Employee components
import CheckOrdersPage from "./Employee/CheckOrdersPage";

// Styling
import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Temp Routes */}
          <Route path="/checkout" exact element={<CheckOutPage />} />
          <Route path="/checked-out" exact element={<CheckOutPageDone />} />
          {/* Perm Routes */}
          <Route
            path="/orderControl/:textCode"
            exact
            element={<ControlOrderPage />}
          />
          <Route path="/noTextCode" element={<NoTextCodePage />} />
          <Route path="/buyer" exact element={<HomeBuyerPage />} />
          <Route path="/upload" exact element={<UploadVideoPage />} />
          <Route path="/record" exact element={<RecordVideo />} />
          <Route path="/rewatchvideo" exact element={<RewatchVideoPage />} />
          <Route path="/personalize/" exact element={<PersonalizeVideoPage />} />
          <Route path="/thankyou" exact element={<FinalPage />} />
          <Route path="/receiver" exact element={<HomeReceiverPage />} />
          <Route path="/qr-code" exact element={<QRPage />} />
          <Route path="/scan" exact element={<ScanQRPage />} />
          <Route path="/textcode" exact element={<TextCodePage />} />
          <Route path="/watchvideo/:textCode" element={<VideoPage />} />
          <Route path="/checkorders" exact element={<CheckOrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
