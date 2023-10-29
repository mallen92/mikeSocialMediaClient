import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { UserTest } from "./components/UserTest";
import "./App.css";
import "./breakpoints.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/test" element={<UserTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
