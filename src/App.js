import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import LoginPanel from "./components/LogIn/LogInPanel";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import PreviewPanel from "./components/BeforenAfterPanel/PreviewPanel";
import ConnectedApp from "./components/AppPanel/ConnectedApp";
import HelpPanel from './components/HelpPanel/HelpPanel';

// MainLayout ensures the Sidebar is ALWAYS there
const MainLayout = ({ children }) => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITHOUT Sidebar */}
        <Route path="/login" element={<LoginPanel />} />
        <Route path="/account" element={<CreateAccount />} />

        {/* Pages WITH Sidebar (Wrapped in MainLayout) */}
        <Route path="/home" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
        <Route path="/preview" element={<MainLayout><PreviewPanel /></MainLayout>} />
        <Route path="/apps" element={<MainLayout><ConnectedApp /></MainLayout>} />
        
        {/* FIXED: Added MainLayout here so Sidebar doesn't disappear */}
        <Route path="/help" element={<MainLayout><HelpPanel /></MainLayout>} />
        
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}