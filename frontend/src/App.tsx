import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
    </Routes>
  );
};

export default App;
