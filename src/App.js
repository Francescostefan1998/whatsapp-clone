import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebLoginBackground from "./components/login/webLogin/webLoginBackground/WebLoginBackground";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<WebLoginBackground />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
