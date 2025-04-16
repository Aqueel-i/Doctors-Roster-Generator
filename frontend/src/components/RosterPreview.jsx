// src/components/RosterPreview.js
export default function RosterPreview({ roster }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800">Roster Preview</h2>
      <div className="bg-gray-100 p-4 rounded-xl mt-4">
        <table className="min-w-full table-auto text-sm">
          <thead className="text-gray-600">
            <tr>
              <th className="px-4 py-2 border-b">Doctor Name</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Shift</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{row.doctor}</td>
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
