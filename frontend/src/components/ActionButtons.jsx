import * as XLSX from "xlsx";
import { Sparkles, Download } from "lucide-react";

export default function ActionButtons({ onGenerate, rosterData }) {
  const handleDownload = () => {
    if (!rosterData || rosterData.length === 0) {
      alert("No roster data to download.");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(rosterData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Roster");
    XLSX.writeFile(wb, "doctor_roster.xlsx");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
      <button
        onClick={onGenerate}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition"
      >
        <Sparkles size={20} />
        Generate Roster
      </button>
      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition"
      >
        <Download size={20} />
        Download Roster
      </button>
    </div>
  );
}
