import { useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";

export default function DoctorInput({ setDoctors }) {
  const [doctorName, setDoctorName] = useState("");
  const [doctorList, setDoctorList] = useState([]);

  const handleAddDoctor = () => {
    if (doctorName.trim()) {
      setDoctorList((prev) => [...prev, doctorName.trim()]);
      setDoctors((prev) => [...prev, doctorName.trim()]);
      setDoctorName("");
    }
  };

  const handleRemoveDoctor = (name) => {
    setDoctorList((prev) => prev.filter((doc) => doc !== name));
    setDoctors((prev) => prev.filter((doc) => doc !== name));
  };

  return (
    <div className="space-y-6">
      {/* Input area */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Enter Doctor  name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          className="flex-grow px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-500 text-gray-300"
        />
        <button
          onClick={handleAddDoctor}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
        >
          <UserPlus size={18} />
          Add
        </button>
      </div>

      {/* Doctor list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctorList.map((doctor, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 rounded-xl bg-white shadow-md border hover:shadow-lg transition"
          >
            <span className="font-medium text-gray-800">Dr. {doctor}</span>
            <button
              onClick={() => handleRemoveDoctor(doctor)}
              className="text-red-500 hover:bg-red-100 p-2 rounded-full transition"
              title="Remove doctor"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
