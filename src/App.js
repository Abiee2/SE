import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import LoginPanel from "./components/LogIn/LogInPanel";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import PreviewPanel from "./components/BeforenAfterPanel/PreviewPanel";
import ConnectedApp from "./components/AppPanel/ConnectedApp";
import HelpPanel from "./components/HelpPanel/HelpPanel";

const MainLayout = ({ children }) => (
  <>
    <Sidebar />
    <div className="main-content">
      <div className="main-content-inner">{children}</div>
    </div>
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPanel />} />
         <Route path="/account" element={<CreateAccount />} />

        {/* Wrap pages that need the Sidebar in MainLayout */}
        <Route path="/home" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
        <Route path="/preview" element={<MainLayout><PreviewPanel /></MainLayout>} />
        <Route path="/apps" element={<MainLayout><ConnectedApp /></MainLayout>} />
        <Route path="/help" element={<MainLayout><HelpPanel /></MainLayout>} />
        
        {/* Redirect empty path to login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}