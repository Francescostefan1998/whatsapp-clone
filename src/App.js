import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebLoginBackground from "./components/login/webLogin/webLoginBackground/WebLoginBackground";
import MainappBackground from "./components/mainapp/mainappBackground/MainappBackground";
import MainappDisplayConversationMobile from "./components/mainapp/mainappMainComponent/mainAppDisplayConversationMobile/MainappDisplayConversationMobile";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<WebLoginBackground />} />
          <Route path="/home" element={<MainappBackground />} />
          <Route
            path="/displayconversation"
            element={<MainappDisplayConversationMobile />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
