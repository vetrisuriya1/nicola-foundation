import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sponsors from "./pages/Sponsors";
import Projects from "./pages/Projects";
import Mappings from "./pages/Mappings";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import "./App.css"; // Assuming you have a CSS file for global styles

export default function App() {
	const role = localStorage.getItem("role");

	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
				<Route path="/sponsors" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["Project Manager", "Super Admin"]}><Sponsors role={role} /></RoleBasedRoute></ProtectedRoute>} />
				<Route path="/projects" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["Admin", "Project Manager", "Super Admin"]}><Projects role={role} /></RoleBasedRoute></ProtectedRoute>} />
				<Route path="/mappings" element={<ProtectedRoute><RoleBasedRoute allowedRoles={["Admin", "Project Manager", "Super Admin"]}><Mappings role={role} /></RoleBasedRoute></ProtectedRoute>} />
			</Routes>
		</Router>
	);
}
