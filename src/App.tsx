import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Studio from "./pages/Studio";
import AuthPage from "./pages/AuthPage";
import Distribution from "./pages/Distribution";
import Earnings from "./pages/Earnings";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="studio" element={<Studio />} />
          <Route path="distribution" element={<Distribution />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
