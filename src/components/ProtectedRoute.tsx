import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { verifyLocalToken } from "../localAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("access_token");
  const valid = token ? verifyLocalToken(token) : null;

  if (!valid) return <Navigate to="/login" replace />;

  return children;
}