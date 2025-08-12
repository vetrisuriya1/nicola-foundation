import { Navigate } from "react-router-dom";

export default function RoleBasedRoute({ children, allowedRoles }) {
    const role = localStorage.getItem("role");
    return allowedRoles.includes(role) ? children : <Navigate to="/dashboard" />;
}
