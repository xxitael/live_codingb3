import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import RootLayout from "./RootLayout";

import Login from "../components/Login";
import Profile from "../components/Profile";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),

    children: [
      { index: true, element: <Navigate to="/pokemon" replace /> },
      { path: "pokemon" },
      { path: "pokemon/:pokeId" },
      { path: "profile", element: <Profile /> },
    ],
  },
]);