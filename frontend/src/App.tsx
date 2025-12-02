import Topbar from "./components/Topbar/Topbar.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage.tsx";
import AddUserToDb from "./components/ui/AddUserToDb.tsx";
import LayoutPage from "./pages/layout/LayoutPage.tsx";
import ChatPage from "./pages/chat/ChatPage.tsx";

const App = () => {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/auth-add-user" element={<AddUserToDb />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<LayoutPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
