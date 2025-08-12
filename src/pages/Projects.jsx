import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Projects(user) {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ project_name: "", project_type: "", start_date: "", end_date: "", status: "", description: "" });
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ project_name: "", project_type: "", start_date: "", end_date: "", status: "", description: "" });

    const fetchProjects = () => {
        API.get("/projects").then((res) => setProjects(res.data));
    };

    const addProject = () => {
        API.post("/projects", form).then(() => {
            fetchProjects();
            setForm({ project_name: "", project_type: "", start_date: "", end_date: "", status: "", description: "" });
        });
    };

    const startEdit = (project) => {
        setEditingId(project.project_id);
        setEditForm({
            project_name: project.project_name,
            project_type: project.project_type,
            start_date: project.start_date,
            end_date: project.end_date,
            status: project.status,
            description: project.description,
        });
    };

    const saveEdit = () => {
        API.put("/projects", { data: { project_id: editingId, ...editForm } }).then(() => {
            setEditingId(null);
            fetchProjects();
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const deleteProject = (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            API.delete("/projects", { data: { project_id: id } }).then(fetchProjects);
        }
    };

    useEffect(fetchProjects, []);

    return (
        <>
            <Navbar />
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Projects</h1>
                {(user.role === "Project Manager") && (
                    <>
                        <div className="mb-4 grid grid-cols-2 gap-2">
                            {Object.keys(form).map((key) => (
                                <input key={key} className="border p-2" placeholder={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                            ))}
                        </div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addProject}>Add Project</button>
                    </>
                )}
                <table className="w-full mt-6 border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>Name</th><th>Type</th><th>Status</th><th>Start</th><th>End</th>
                            {user.role === "Project Manager" && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((p) => (
                            editingId === p.project_id ? (
                                <tr key={p.project_id} className="border-t bg-yellow-50">
                                    <td><input className="border p-1" value={editForm.project_name} onChange={e => setEditForm({ ...editForm, project_name: e.target.value })} /></td>
                                    <td><input className="border p-1" value={editForm.project_type} onChange={e => setEditForm({ ...editForm, project_type: e.target.value })} /></td>
                                    <td><input className="border p-1" value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })} /></td>
                                    <td><input className="border p-1" value={editForm.start_date} onChange={e => setEditForm({ ...editForm, start_date: e.target.value })} /></td>
                                    <td><input className="border p-1" value={editForm.end_date} onChange={e => setEditForm({ ...editForm, end_date: e.target.value })} /></td>
                                    {user.role === "Project Manager" && (
                                        <td>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={saveEdit}>Save</button>
                                            <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={cancelEdit}>Cancel</button>
                                        </td>
                                    )}
                                </tr>
                            ) : (
                                <tr key={p.project_id} className="border-t">
                                    <td>{p.project_name}</td>
                                    <td>{p.project_type}</td>
                                    <td>{p.status}</td>
                                    <td>{p.start_date}</td>
                                    <td>{p.end_date}</td>
                                    {user.role === "Project Manager" && (
                                        <td>
                                            <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => startEdit(p)}>Edit</button>
                                            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteProject(p.project_id)}>Delete</button>
                                        </td>
                                    )}
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
