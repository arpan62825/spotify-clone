import Topbar from "./components/Topbar/Topbar.tsx";
import HomePage from "./pages/HomePage.tsx";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage.tsx";
import AddUserToDb from "./components/ui/AddUserToDb.tsx";
import LayoutPage from "./pages/layout/LayoutPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import AlbumPage from "./pages/AlbumPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import NotFoundPage from "./pages/layout/components/NotFoundPage.tsx";

const App = () => {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/auth-add-user" element={<AddUserToDb />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<LayoutPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
