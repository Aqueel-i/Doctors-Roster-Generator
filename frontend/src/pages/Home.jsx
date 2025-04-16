import { useState } from "react";
import DoctorInput from "../components/DoctorInput";
import DatePicker from "../components/DatePicker";
import ActionButtons from "../components/ActionButtons";
import RosterPreview from "../components/RosterPreview";
import { generateRoster } from "../api/rosterApi";
import { motion } from "framer-motion";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [rosterData, setRosterData] = useState(null);

  const handleGenerateRoster = async () => {
    if (!doctors.length || !startDate || !endDate) {
      alert("Please fill all fields!");
      return;
    }
  
    setLoading(true);
    const generatedRoster = await generateRoster(doctors, startDate, endDate);
    console.log("API Response:", generatedRoster); // <- Add this to check structure
  
    if (generatedRoster) {
      // If API returns { roster: [...] }
      if (Array.isArray(generatedRoster.roster)) {
        setRosterData(generatedRoster.roster);
      }
      // If API returns array directly
      else if (Array.isArray(generatedRoster)) {
        setRosterData(generatedRoster);
      } else {
        alert("Unexpected roster format!");
      }
    } else {
      alert("Failed to generate roster.");
    }
  
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white dark:bg-gray-800 shadow-xl rounded-2xl space-y-8">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Doctor Roster Generator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Lady Ridgway Hospital - Radiology Department
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <DoctorInput setDoctors={setDoctors} />
          <DatePicker setStartDate={setStartDate} setEndDate={setEndDate} />
          <ActionButtons
            onGenerate={handleGenerateRoster}
            rosterData={rosterData}
            disabled={loading}
          />
          {loading && <p className="text-center text-gray-600 dark:text-gray-300">Generating roster...</p>}
          {rosterData && <RosterPreview roster={rosterData} />}
        </motion.div>
      </div>
    </main>
  );
}
