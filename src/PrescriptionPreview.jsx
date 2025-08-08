import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const freqAbbr = (f) =>
  f === "M" ? "Morning" : f === "E" ? "Evening" : f === "N" ? "Night" : f;

export default function PrescriptionPreview({ data, activeSection }) {
  const previewRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));

  const generatePDF = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#fff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save("prescription-preview.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF. See console for details.");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "patient":
        return (
          <div className="space-y-2">
            <h2 className="text-xl font-bold mb-2">Patient Details</h2>
            <p>
              <strong>Name:</strong> {data.patient.name || "____"}
            </p>
            <p>
              <strong>Age:</strong> {data.patient.age || "__"}
            </p>
            <p>
              <strong>Medical History:</strong>{" "}
              {data.patient.medicalHistory || "None"}
            </p>
            <p>
              <strong>Lifestyle / Habits:</strong>{" "}
              {data.patient.lifestyle || "None"}
            </p>
          </div>
        );
      case "medicines":
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">Medicines</h2>
            {data.medicines.length === 0 ? (
              <p>No medicines added</p>
            ) : (
              <table className="table-auto border-collapse border border-gray-400 w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-2 py-1">Name</th>
                    <th className="border border-gray-400 px-2 py-1">Dose</th>
                    <th className="border border-gray-400 px-2 py-1">
                      Frequency
                    </th>
                    <th className="border border-gray-400 px-2 py-1">
                      Duration
                    </th>
                    <th className="border border-gray-400 px-2 py-1">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.medicines.map((m, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : ""}>
                      <td className="border border-gray-400 px-2 py-1">
                        {m.name}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {m.dose}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {m.frequency.map(freqAbbr).join(", ")}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {m.duration}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {m.remarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      default:
        // Doctor section preview (always visible in full PDF but can preview here if needed)
        return (
          <div className="space-y-2">
            <h2 className="text-xl font-bold mb-2">Doctor Details</h2>
            <p>
              <strong>Name:</strong> {data.doctor.name}
            </p>
            <p>
              <strong>Qualification:</strong> {data.doctor.qualification}
            </p>
            <p>
              <strong>Address:</strong> {data.doctor.address}
            </p>
            <p>
              <strong>Timings:</strong> {data.doctor.timings}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Zoom Controls */}
      <div className="mb-4 space-x-2">
        <button
          onClick={zoomOut}
          className="btn btn-sm btn-outline"
          disabled={zoom <= 0.5}
        >
          Zoom Out
        </button>
        <button
          onClick={zoomIn}
          className="btn btn-sm btn-outline"
          disabled={zoom >= 3}
        >
          Zoom In
        </button>
      </div>

      {/* Preview Area */}
      <div
        className="flex flex-col items-center w-full overflow-x-auto"
        style={{ minWidth: 820 }}
      >
        <div
          ref={previewRef}
          style={{
            width: 794,
            minHeight: 1123,
            padding: 24,
            backgroundColor: "white",
            borderRadius: 8,
            boxShadow: "0 0 15px #0001",
            overflowX: "auto",
            overflowY: "auto",
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
          }}
        >
          {renderSection()}
        </div>
      </div>

      {/* <button onClick={generatePDF} className="btn btn-primary mt-4 px-6 py-2 w-full max-w-md text-center">
        Generate This Section PDF
      </button> */}
    </div>
  );
}
