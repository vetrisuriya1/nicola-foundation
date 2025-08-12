import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Mappings(user) {
    const [mappings, setMappings] = useState([]);
    const [projects, setProjects] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [form, setForm] = useState({ sponsor_id: "", project_id: "", assigned_date: "" });

    const fetchMappings = () => {
        API.get("/mapping").then((res) => setMappings(res.data));
    };

    useEffect(() => {
        fetchMappings();
        API.get("/projects").then((res) => setProjects(res.data));
        API.get("/sponsors").then((res) => setSponsors(res.data));
    }, []);

    const addMapping = () => {
        API.post("/mapping", form).then(() => {
            fetchMappings();
            setForm({ sponsor_id: "", project_id: "", assigned_date: "" });
        });
    };

    return (
        <>
            <Navbar />
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Sponsor-Project Mappings</h1>
                {(user.role === "Project Manager") && (
                    <>
                        <div className="mb-4 grid grid-cols-3 gap-2">
                            <select
                                className="border p-2"
                                value={form.sponsor_id}
                                onChange={e => setForm({ ...form, sponsor_id: e.target.value })}
                            >
                                <option value="">Select Sponsor</option>
                                {sponsors.map(s => (
                                    <option key={s.sponsor_id} value={s.sponsor_id}>
                                        {s.sponsor_name} (ID: {s.sponsor_id})
                                    </option>
                                ))}
                            </select>
                            <select
                                className="border p-2"
                                value={form.project_id}
                                onChange={e => setForm({ ...form, project_id: e.target.value })}
                            >
                                <option value="">Select Project</option>
                                {projects.map(p => (
                                    <option key={p.project_id} value={p.project_id}>
                                        {p.project_name} (ID: {p.project_id})
                                    </option>
                                ))}
                            </select>
                            <input
                                className="border p-2"
                                type="date"
                                placeholder="assigned_date"
                                value={form.assigned_date}
                                onChange={e => setForm({ ...form, assigned_date: e.target.value })}
                            />
                        </div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addMapping}>Add Mapping</button>
                    </>
                )}
                {(user.role !== "Project Manager") && (
                    <table className="w-full mt-6 border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th>Sponsor ID</th><th>Project ID</th><th>Assigned Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mappings.map((m) => (
                                <tr key={m.mapping_id} className="border-t">
                                    <td>{m.sponsor_name} (ID: {m.sponsor_id})</td>
                                    <td>{m.project_name} (ID: {m.project_id})</td>
                                    <td>{m.assigned_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
