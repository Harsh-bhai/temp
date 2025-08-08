import React from "react";

const freqAbbr = (f) => (f === "M" ? "Morning" : f === "E" ? "Evening" : f === "N" ? "Night" : f);

export default function FullPrescriptionPreview({ data }) {
  return (
    <div style={{ width: "595pt", minHeight: "842pt", padding: "20pt", boxSizing: "border-box" }}>
      {/* Doctor section */}
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>Doctor Details</h1>
        <p><strong>Name:</strong> {data.doctor.name}</p>
        <p><strong>Qualification:</strong> {data.doctor.qualification}</p>
        <p><strong>Address:</strong> {data.doctor.address}</p>
        <p><strong>Timings:</strong> {data.doctor.timings}</p>
      </section>

      {/* Patient section */}
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>Patient Details</h1>
        <p><strong>Name:</strong> {data.patient.name || "____"}</p>
        <p><strong>Age:</strong> {data.patient.age || "__"}</p>
        <p><strong>Medical History:</strong> {data.patient.medicalHistory || "None"}</p>
        <p><strong>Lifestyle / Habits:</strong> {data.patient.lifestyle || "None"}</p>
      </section>

      {/* Medicines section */}
      <section>
        <h1 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>Medicines</h1>
        {data.medicines.length === 0 ? (
          <p>No medicines added</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
            <thead style={{ backgroundColor: "#eee" }}>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: 6 }}>Name</th>
                <th style={{ border: "1px solid #ccc", padding: 6 }}>Dose</th>
                <th style={{ border: "1px solid #ccc", padding: 6 }}>Frequency</th>
                <th style={{ border: "1px solid #ccc", padding: 6 }}>Duration</th>
                <th style={{ border: "1px solid #ccc", padding: 6 }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {data.medicines.map((m, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fafafa" : "white" }}>
                  <td style={{ border: "1px solid #ccc", padding: 6 }}>{m.name}</td>
                  <td style={{ border: "1px solid #ccc", padding: 6 }}>{m.dose}</td>
                  <td style={{ border: "1px solid #ccc", padding: 6 }}>{m.frequency.map(freqAbbr).join(", ")}</td>
                  <td style={{ border: "1px solid #ccc", padding: 6 }}>{m.duration}</td>
                  <td style={{ border: "1px solid #ccc", padding: 6 }}>{m.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
