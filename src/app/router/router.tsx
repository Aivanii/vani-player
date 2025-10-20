import { Route, BrowserRouter, Routes, useLocation } from "react-router";
import Main from "../../pages/main";
import Settings from "../../pages/settings";
import Playlists from "../../pages/playlists";
const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/playlists" element={<Playlists />} />
      </Routes>
    </>
  );
};
export default RoutesComponent;
