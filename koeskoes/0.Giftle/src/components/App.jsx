import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

// Buyer components
// Temp components
import CheckOutPage from "./Buyer/CheckOutPage";
import CheckOutPageDone from "./Buyer/CheckOutPageDone";
import CheckOutPageDoneMagento from "./Buyer/CheckOutPageDoneMagento";

//Perm components
import ControlOrderPage from "./Buyer/ControlOrderPage";
import NoTextCodePage from "./Buyer/NoTextCodePage";
import HomeBuyerPage from "./Buyer/HomeBuyerPage";
import CreateVideoPage from "./Buyer/CreateVideoPage";
import FinalPage from "./Buyer/FinalPage";

// Receiver components
import HomeReceiverPage from "./Receiver/HomeReceiverPage";
import QRPage from "./Receiver/QRPage";
import ScanQRPage from "./Receiver/ScanQRPage";
import TextCodePage from "./Receiver/TextCodePage";
import VideoPage from "./Receiver/VideoPage";
import SharedVideoPage from "./Receiver/SharedVideoPage";
import ReactionHomePage from "./Receiver/ReactionHomePage";
import TextReactionPage from "./Receiver/TextReactionPage";
import VideoReactionPage from "./Receiver/VideoReactionPage";

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
          <Route path="/magento-checked-out" exact element={<CheckOutPageDoneMagento />} />
          {/* Perm Routes */}
          <Route
            path="/orderControl/:textCode"
            exact
            element={<ControlOrderPage />}
          />
          <Route path="/buyer/noTextCode" element={<NoTextCodePage />} />
          <Route path="/buyer" exact element={<HomeBuyerPage />} />
          <Route path="/buyer/create" exact element={<CreateVideoPage />} />
          <Route path="/buyer/thankyou" exact element={<FinalPage />} />
          <Route path="/receiver" exact element={<HomeReceiverPage />} />
          <Route path="/receiver/qr-code" exact element={<QRPage />} />
          <Route path="/receiver/scan" exact element={<ScanQRPage />} />
          <Route path="/receiver/textcode" exact element={<TextCodePage />} />
          <Route path="/receiver/watchvideo/:textCode" element={<VideoPage />} />
          <Route path="/receiver/watchSharedVideo/:textCode" element={<SharedVideoPage/>}/>
          <Route path="/receiver/reaction" element={<ReactionHomePage />} />
          <Route path="/receiver/text-reaction" exact element={<TextReactionPage />} />
          <Route path="/receiver/video-reaction" exact element={<VideoReactionPage />} />
          <Route path="/employee/checkorders" exact element={<CheckOrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
