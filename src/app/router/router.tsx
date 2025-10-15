import { Route, BrowserRouter as Router, Routes } from "react-router";
import Main from "../../pages/main";
import Settings from "../../pages/settings";
import Playlists from "../../pages/playlists";
const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/playlists" element={<Playlists />} />
      </Routes>
    </Router>
  );
};
export default RoutesComponent;
