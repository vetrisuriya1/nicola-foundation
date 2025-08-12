import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [sponsorsCount, setSponsorsCount] = useState(0);
    const [mappingsCount, setMappingsCount] = useState(0);
    const role = localStorage.getItem("role");

    useEffect(() => {
        API.get("/projects").then((res) => setProjects(res.data));
        API.get("/sponsors").then((res) => setSponsorsCount(res.data.length));
        API.get("/mapping").then((res) => setMappingsCount(res.data.length));
    }, []);

    // Categorize projects
    const ongoing = projects.filter((p) => p.status === "Ongoing");
    const upcoming = projects.filter((p) => p.status === "Upcoming");
    const completed = projects.filter((p) => p.status === "Completed");

    return (
        <>
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard ({role})</h1>
                {/* Counts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-100 p-4 rounded shadow text-center">
                        <div className="text-3xl font-bold">{projects.length}</div>
                        <div className="text-gray-700">Projects</div>
                    </div>
                    <div className="bg-green-100 p-4 rounded shadow text-center">
                        <div className="text-3xl font-bold">{sponsorsCount}</div>
                        <div className="text-gray-700">Sponsors</div>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded shadow text-center">
                        <div className="text-3xl font-bold">{mappingsCount}</div>
                        <div className="text-gray-700">Mapped Data</div>
                    </div>
                </div>
                {/* Project Lists */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <h3 className="font-bold mb-2 text-blue-600">Ongoing Projects</h3>
                        {ongoing.length === 0 ? (
                            <p className="text-gray-500">No ongoing projects.</p>
                        ) : (
                            ongoing.map((p) => (
                                <div key={p.project_id} className="p-3 mb-2 border rounded bg-blue-50">
                                    <div className="font-semibold">{p.project_name}</div>
                                    <div className="text-sm">Type: {p.project_type}</div>
                                </div>
                            ))
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold mb-2 text-orange-600">Upcoming Projects</h3>
                        {upcoming.length === 0 ? (
                            <p className="text-gray-500">No upcoming projects.</p>
                        ) : (
                            upcoming.map((p) => (
                                <div key={p.project_id} className="p-3 mb-2 border rounded bg-orange-50">
                                    <div className="font-semibold">{p.project_name}</div>
                                    <div className="text-sm">Type: {p.project_type}</div>
                                </div>
                            ))
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold mb-2 text-green-600">Completed Projects</h3>
                        {completed.length === 0 ? (
                            <p className="text-gray-500">No completed projects.</p>
                        ) : (
                            completed.map((p) => (
                                <div key={p.project_id} className="p-3 mb-2 border rounded bg-green-50">
                                    <div className="font-semibold">{p.project_name}</div>
                                    <div className="text-sm">Type: {p.project_type}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
