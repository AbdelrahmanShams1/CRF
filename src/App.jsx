import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Home from "./component/Home";
import Instructions from "./component/Instructions";
import Welcome from "./component/welcome";
import Standing from "./component/Standing";
import Question from "./component/Question";
import RoutingPage from "./component/routingPage";
import Activity from "./component/activites";
import Azkar from "./component/Azkar";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="CRF/login" element={<Login />} />
        <Route path="CRF/signup" element={<SignUp />} />
        <Route path="CRF/home" element={<Home />} />
        <Route path="CRF/instructions" element={<Instructions />} />
        <Route path="CRF" element={<Welcome />} />
        <Route path="CRF/standing" element={<Standing />} />
        <Route path="CRF/dayly-question" element={<Question />} />
        <Route path="CRF/routinPage" element={<RoutingPage />} />
        <Route path="CRF/activity" element={<Activity />} />
        <Route path="CRF/azkar" element={<Azkar />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
