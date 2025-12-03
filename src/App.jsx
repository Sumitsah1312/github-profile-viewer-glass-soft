import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FollowersPage from "./pages/FollowersPage";
import Compare from "./pages/Compare";
import Shell from "./components/Shell";

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="/user/:username/followers" element={<FollowersPage />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </Shell>
  );
}
