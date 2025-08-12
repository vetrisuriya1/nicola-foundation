import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Sponsors(user) {
    const [sponsors, setSponsors] = useState([]);
    const [form, setForm] = useState({ sponsor_name: "", sponsor_type: "", phone: "", email: "", address: "" });

    const fetchSponsors = () => {
        API.get("/sponsors").then((res) => setSponsors(res.data));
    };

    const addSponsor = () => {
        API.post("/sponsors", form).then(() => {
            fetchSponsors();
            setForm({ sponsor_name: "", sponsor_type: "", phone: "", email: "", address: "" });
        });
    };

    useEffect(fetchSponsors, []);

    return (
        <>
            <Navbar />
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Sponsors</h1>
                {(user.role === "Project Manager") && (
                    <>
                        <div className="mb-4 grid grid-cols-2 gap-2">
                            {Object.keys(form).map((key) => (
                                <input key={key} className="border p-2" placeholder={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                            ))}
                        </div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addSponsor}>Add Sponsor</button>
                    </>
                )}
                {(user.role !== "Project Manager") && (
                    <table className="w-full mt-6 border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th>Name</th><th>Type</th><th>Email</th><th>Phone</th><th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sponsors.map((s) => (
                                <tr key={s.sponsor_id} className="border-t">
                                    <td>{s.sponsor_name}</td><td>{s.sponsor_type}</td><td>{s.email}</td><td>{s.phone}</td><td>{s.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
