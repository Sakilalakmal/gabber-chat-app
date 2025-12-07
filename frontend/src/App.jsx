import { Navigate, Route, Routes } from "react-router";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage.jsx";
import OnBoardongPage from "./pages/OnBoardongPage.jsx";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";

const App = () => {
  //tanstack
  const { data: authData } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  });

  const authUser = authData?.user;

  return (
    <div className="h-screen w-screen " data-theme="night">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notification"
          element={authUser ? <NotificationPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/onboarding"
          element={authUser ? <OnBoardongPage /> : <Navigate to={"/login"} />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
