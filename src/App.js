import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";

import {
  Home,
  Candidate,
  Orders,
  Login,
  Registration,
  Profile,
  Recovery,
} from "./Pages";
import { CreateOrderContainer } from "./Containers";
import { ProtectedRoute } from "./utils";
import { Header, Footer } from "./Layouts";
import { Up } from "./Components";
import LocationState from "./Context/LocationContext";

import "./App.scss";

function App() {
  return (
    <LocationState>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/recovery" element={<Recovery />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-order"
            element={
              <ProtectedRoute>
                <CreateOrderContainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate"
            element={
              <ProtectedRoute>
                <Candidate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        <Up />
        <ToastContainer progressClassName="progress" theme="dark" />
      </div>
    </LocationState>
  );
}

export default App;
