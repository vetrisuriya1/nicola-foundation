import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/login", { username, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            navigate("/dashboard");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input className="border w-full p-2 mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="border w-full p-2 mb-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-black text-white w-full py-2 rounded" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}
