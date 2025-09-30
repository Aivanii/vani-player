import { Route, BrowserRouter as Router, Routes } from "react-router";
import Main from "../../pages/main";
import Settings from "../../pages/settings";
const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};
export default RoutesComponent;
