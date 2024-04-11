import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserProvider } from "./UserContext";
import RestrictedRoutes from "./components/RestrictedRoutes";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Lost from "./pages/Lost";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password"
              element={<Navigate to="/forgot-password" />}
            />
            <Route
              path="/reset-password/:userId/:resetToken"
              element={<ResetPassword />}
            />
            <Route
              path="/"
              element={
                <RestrictedRoutes>
                  <Home />
                </RestrictedRoutes>
              }
            />
            <Route path="*" element={<Lost/>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
