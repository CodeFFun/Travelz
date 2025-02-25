import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from "../pages/HomeComponent";
import ProtectedRoute from "./ProtectedComponent";
import RegisterComponent from "../pages/RegisterComponent";
import LoginComponent from "../pages/LoginComponent";
import ShowProfile from "../pages/ShowProfile";
import CalenderPage from "../pages/CalenderPage";
import GuideProfile from "../pages/GuideProfile";
import DiaryPage from "../pages/DiaryPage";

export default function RouterComponent() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Group all protected routes inside `ProtectedRoute` */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/profile" element={<ShowProfile />} />
            <Route path="/:id/profile" element={<GuideProfile />} />
            <Route path="/calender" element={<CalenderPage />} />
            <Route path="/diary" element={<DiaryPage />} />
          </Route>

          {/* Public Routes */}
          <Route path="/register" element={<RegisterComponent />} />
            <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
