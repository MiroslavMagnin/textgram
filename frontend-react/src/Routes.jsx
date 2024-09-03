import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./components/Sign/SignUpPage.jsx";
import SignInPage from "./components/Sign/SignInPage.jsx";
import HomePage from "./HomePage";
import { NotFoundPage } from "./components/NotFound/NotFoundPage";
import AboutPage from "./components/About/AboutPage";
import ProfilePage from "./components/Profile/ProfilePage";
import SettingsPage from "./components/Settings/SettingsPage";
import FeedPage from "./components/Feed/FeedPage";
import UserPage from "./components/User/UserPage.jsx";
import UsersPage from "./components/User/UsersPage.jsx";

export default function RoutesPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact />

        <Route path="/home" element={<HomePage />} />

        <Route path="/feed" element={<FeedPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/user/:userId" element={<UserPage />} />

        <Route path="/users" element={<UsersPage />} />

        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/signin" element={<SignInPage />} />

        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
