import { Route, Routes } from "react-router";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage.jsx";
import OnBoardongPage from "./pages/OnBoardongPage.jsx";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="h-screen w-screen " data-theme="night">
      <button onClick={() => toast.success("augh this is toast")}>
        Toast Me
      </button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<OnBoardongPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
