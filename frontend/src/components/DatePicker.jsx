import { useState } from "react";

export default function DatePicker({ setStartDate, setEndDate }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleStartDateChange = (e) => {
    setStart(e.target.value);
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEnd(e.target.value);
    setEndDate(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md transition">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Start Date
        </label>
        <input
          type="date"
          value={start}
          onChange={handleStartDateChange}
          className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          End Date
        </label>
        <input
          type="date"
          value={end}
          onChange={handleEndDateChange}
          className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
        />
      </div>
    </div>
  );
}
