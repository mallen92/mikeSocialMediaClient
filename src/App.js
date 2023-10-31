import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { StateTest } from "./components/StateTest";
import "./App.css";
import "./util/breakpoints.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/test" element={<StateTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
