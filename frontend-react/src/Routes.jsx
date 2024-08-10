import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Sign/SignUp";
import SignIn from "./components/Sign/SignIn";
import { NotFoundPage } from "./components/NotFound/NotFoundPage";
import Home from "./Home";

export default function RoutesPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />

        <Route path="/home" element={<Home />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/signin" element={<SignIn />} />

        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
