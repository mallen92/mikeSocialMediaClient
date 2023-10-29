import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { UserTest } from "./components/UserTest";
import "./App.css";
import "./breakpoints.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/test" element={<UserTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
