import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard-layout";
import Dashboard from "./pages/Dashboard";
import { Auth } from "./auth/auth";
import AuthPage from "./pages/Auth";


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
        {/* protected routes */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/d"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
