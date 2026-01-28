import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPanel from "./components/LoginPanel";
import CreateAccount from "./components/CreateAccount/CreateAccount";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN – full screen, no header */}
        <Route path="/login" element={<LoginPanel />} />

        {/* CREATE ACCOUNT – after registration */}
        <Route path="/account" element={<CreateAccount />} />

      </Routes>
    </BrowserRouter>
  );
}
