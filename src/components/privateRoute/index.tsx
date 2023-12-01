import { ReactNode } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode
}

type RouterData = ReactNode

export default function PrivateRoute({ children }: PrivateProps ): RouterData {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated ? <Navigate to='/admin/login'/> : children
}