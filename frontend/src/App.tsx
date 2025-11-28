import Topbar from "./components/Topbar/Topbar.tsx";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage.tsx";
import AddUserToDb from "./components/ui/addUserToDb.tsx";

const App = () => {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-add-user" element={<AddUserToDb />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
};

export default App;
