import React, { useState } from "react";

const freqOptions = [
  { key: "M", label: "Morning" },
  { key: "E", label: "Evening" },
  { key: "N", label: "Night" },
];

function freqAbbr(f) {
  return f === "M" ? "Morning" : f === "E" ? "Evening" : f === "N" ? "Night" : f;
}

const PrescriptionForm = ({ data, updateSection, setMedicines, activeSection, setActiveSection }) => {
  const [newMed, setNewMed] = useState({ name: "", dose: "", frequency: [], duration: "", remarks: "" });

  const addMedicine = () => {
    if (newMed.name.trim()) {
      setMedicines([...data.medicines, newMed]);
      setNewMed({ name: "", dose: "", frequency: [], duration: "", remarks: "" });
    }
  };

  const toggleFreq = (freqKey) => {
    setNewMed((prev) => ({
      ...prev,
      frequency: prev.frequency.includes(freqKey)
        ? prev.frequency.filter((f) => f !== freqKey)
        : [...prev.frequency, freqKey],
    }));
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Tabs for Patient and Medicines */}
      <div className="tabs mb-8 border-b-2 border-teal-600">
        <button className={`tab tab-bordered ${activeSection === "patient" ? "tab-active" : ""}`} onClick={() => setActiveSection("patient")}>
          Patient
        </button>
        <button className={`tab tab-bordered ${activeSection === "medicines" ? "tab-active" : ""}`} onClick={() => setActiveSection("medicines")}>
          Medicines
        </button>
      </div>

      {/* Patient section */}
      {activeSection === "patient" && (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="label font-semibold text-teal-700">Name</label>
            <input
              type="text"
              placeholder="Patient's Name"
              value={data.patient.name}
              onChange={(e) => updateSection("patient", "name", e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label font-semibold text-teal-700">Age</label>
            <input
              type="number"
              placeholder="Age"
              value={data.patient.age}
              onChange={(e) => updateSection("patient", "age", e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label font-semibold text-teal-700">Medical History</label>
            <textarea
              placeholder="Medical History"
              value={data.patient.medicalHistory}
              onChange={(e) => updateSection("patient", "medicalHistory", e.target.value)}
              className="textarea textarea-bordered w-full resize-y"
              rows={4}
            />
          </div>

          <div>
            <label className="label font-semibold text-teal-700">Lifestyle / Habits</label>
            <textarea
              placeholder="Lifestyle or Habits"
              value={data.patient.lifestyle}
              onChange={(e) => updateSection("patient", "lifestyle", e.target.value)}
              className="textarea textarea-bordered w-full resize-y"
              rows={4}
            />
          </div>
        </form>
      )}

      {/* Medicines section */}
      {activeSection === "medicines" && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-teal-700">Add Medicine</h3>

          <input
            type="text"
            placeholder="Medicine Name"
            value={newMed.name}
            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
            className="input input-bordered w-full mb-4"
          />
          <input
            type="text"
            placeholder="Dose (e.g., 1 tablet)"
            value={newMed.dose}
            onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })}
            className="input input-bordered w-full mb-4"
          />

          <div className="mb-4">
            <div className="font-semibold mb-2 text-teal-700">Frequency</div>
            <div className="flex gap-4">
              {freqOptions.map((opt) => (
                <label key={opt.key} className="cursor-pointer label">
                  <input
                    type="checkbox"
                    checked={newMed.frequency.includes(opt.key)}
                    onChange={() => toggleFreq(opt.key)}
                    className="checkbox checkbox-primary mr-2"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="Duration (e.g., 5 days)"
            value={newMed.duration}
            onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
            className="input input-bordered w-full mb-4"
          />

          <input
            type="text"
            placeholder="Remarks"
            value={newMed.remarks}
            onChange={(e) => setNewMed({ ...newMed, remarks: e.target.value })}
            className="input input-bordered w-full mb-4"
          />

          <button onClick={addMedicine} className="btn btn-primary w-full font-semibold px-4 py-2">
            Add Medicine
          </button>

          {data.medicines.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <h4 className="text-xl font-bold mb-4 text-teal-800">Added Medicines</h4>
              <table className="table w-full table-zebra border border-gray-300">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Dose</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {data.medicines.map((med, i) => (
                    <tr key={i}>
                      <td>{med.name}</td>
                      <td>{med.dose}</td>
                      <td>{med.frequency.map(freqAbbr).join(", ")}</td>
                      <td>{med.duration}</td>
                      <td>{med.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PrescriptionForm;
