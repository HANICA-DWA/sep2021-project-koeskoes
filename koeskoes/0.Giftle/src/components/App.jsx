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
          <Route path="/buyer/noTextCode" element={<NoTextCodePage />} />
          <Route path="/buyer" exact element={<HomeBuyerPage />} />
          <Route path="/buyer/upload" exact element={<UploadVideoPage />} />
          <Route path="/buyer/record" exact element={<RecordVideo />} />
          <Route path="/buyer/rewatchvideo" exact element={<RewatchVideoPage />} />
          <Route path="/buyer/personalize/" exact element={<PersonalizeVideoPage />} />
          <Route path="/buyer/thankyou" exact element={<FinalPage />} />
          <Route path="/receiver" exact element={<HomeReceiverPage />} />
          <Route path="/receiver/qr-code" exact element={<QRPage />} />
          <Route path="/receiver/scan" exact element={<ScanQRPage />} />
          <Route path="/receiver/textcode" exact element={<TextCodePage />} />
          <Route path="/receiver/watchvideo/:textCode" element={<VideoPage />} />
          <Route path="/employee/checkorders" exact element={<CheckOrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
