import React from "react";
import {
  BrowserRouter,
  Route,
  Routes as RouteComponent,
} from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import ErrorPage from "../pages/ErrorPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import HomePage from "../pages/Homepage";
import AboutUs from "../pages/AboutUs";
import FaqPage from "../pages/FaqPage";
import Tours from "../pages/Tours";
import Tour from "../pages/Tour";

import { OurTeam } from "../pages/OurTeam";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouteComponent>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/FAQ" element={<FaqPage />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tour/:id" element={<Tour />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="*" element={<ErrorPage />} />
      </RouteComponent>
    </BrowserRouter>
  );
};
