import React, { useState, useRef } from "react";
import PrescriptionForm from "./Prescriptionform";
import PrescriptionPreview from "./PrescriptionPreview";
import FullPrescriptionPreview from "./FullPrescriptionPreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export default function App() {
  const [data, setData] = useState({
    doctor: {
      name: "Dr. Harsh Sharma",
      qualification: "BDS, MDS - Orthodontist",
      address: "123 Dental Care Street, Smile City",
      timings: "Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 2 PM",
      logo: "https://via.placeholder.com/80x80.png?text=Logo",
    },
    patient: {
      name: "",
      age: "",
      medicalHistory: "",
      lifestyle: "",
    },
    medicines: [],
  });

  const [activeSection, setActiveSection] = useState("patient");
  const [theme, setTheme] = useState("light");
  const previewFullRef = useRef(null);
  const previewSectionRef = useRef(null);

  // Toggle Dark / Light theme
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // Update patient or doctor or medicines data
  const updateSection = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // Update medicines array
  const setMedicines = (medicines) => setData((prev) => ({ ...prev, medicines }));

  // Generate PDF of full prescription by capturing the hidden full preview component
  const generateFullPDF = async () => {
    if (!previewFullRef.current) return;

    try {
      // Capture high-res canvas of full prescription div
      const canvas = await html2canvas(previewFullRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#fff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        unit: "pt",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Maintain aspect ratio of the canvas image while fitting to PDF page width
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save("prescription-full.pdf");
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Failed to generate PDF. Check console for details.");
    }
  };

  return (
    <div data-theme={theme} className="min-h-screen relative bg-base-200 font-sans">
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 left-4 z-50">
        <button onClick={toggleTheme} className="btn btn-sm btn-outline btn-primary" aria-label="Toggle dark mode">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side: Input Form */}
        <div className="w-1/2 border-r-4 border-primary bg-base-100 px-10 py-8 overflow-y-auto">
          <PrescriptionForm
            data={data}
            updateSection={updateSection}
            setMedicines={setMedicines}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Right Side: Sectional Preview */}
        <div className="w-1/2 bg-base-200 p-6 flex flex-col items-center overflow-y-auto">
          <PrescriptionPreview
            data={data}
            activeSection={activeSection}
            ref={previewSectionRef}
          />

          <button onClick={generateFullPDF} className="btn btn-primary mt-6 w-full max-w-md">
            Generate Full Prescription PDF
          </button>
        </div>
      </div>

      {/* Hidden Full Prescription Preview for PDF generation */}
      <div
        ref={previewFullRef}
        style={{
          position: "absolute",
          top: -9999,
          left: -9999,
          width: "595pt", // A4 width in points
          padding: 20,
          backgroundColor: "white",
          color: "black",
        }}
      >
        <FullPrescriptionPreview data={data} />
      </div>
    </div>
  );
}
