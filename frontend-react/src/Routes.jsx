import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Sign/SignUp";
import SignIn from "./components/Sign/SignIn";
import HomePage from "./HomePage";
import { NotFoundPage } from "./components/NotFound/NotFoundPage";
import AboutPage from "./components/About/AboutPage";
import ProfilePage from "./components/Profile/ProfilePage";

export default function RoutesPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact />

        <Route path="/home" element={<HomePage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/signin" element={<SignIn />} />

        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
