import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import RegisterComponent from "./RegisterComponent";
import LoginComponent from "./LoginComponent";
import ProtectedRoute from "./ProtectedComponent";

export default function RouterComponent(){
    return (
    <>
        <BrowserRouter>
  <Routes>
    {/* Group all protected routes inside `ProtectedRoute` */}
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<HomeComponent />} />
    </Route>

    {/* Public Routes */}
    <Route path="/register" element={<RegisterComponent />} />
    <Route path="/login" element={<LoginComponent />} />
  </Routes>
</BrowserRouter>

    </>
)
}