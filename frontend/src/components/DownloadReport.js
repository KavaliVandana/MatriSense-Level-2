// DownloadReport.js
import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const DownloadReport = ({ record }) => {
  const generatePDF = () => {
    if (!record) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40, 53, 147);
    doc.text("MatriSense+ Health Report", 105, 20, { align: "center" });

    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Name', record.name || "N/A"],
        ['Age', record.age],
        ['Systolic BP', `${record.systolic_bp} mmHg`],
        ['Diastolic BP', `${record.diastolic_bp} mmHg`],
        ['Blood Sugar', `${record.bs} mg/dL`],
        ['Body Temp', `${record.body_temp} °F`],
        ['Heart Rate', `${record.heart_rate} bpm`],
        ['Risk Level', record.risk?.toUpperCase()],
      ],
      theme: 'grid',
      headStyles: { fillColor: [63, 81, 181], textColor: 255 },
    });

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on ${new Date().toLocaleDateString()} by MatriSense+`, 105, 285, { align: "center" });

    doc.save(`MatriSense_Report_${record.name || "Patient"}.pdf`);
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold text-purple-700 mb-4">
        📄 Download Your Health Report
      </h2>

      {!record ? (
        <>
          <p className="text-gray-600 mb-4">Please assess your risk first to enable report download.</p>
          <button disabled className="bg-green-300 text-white px-6 py-2 rounded cursor-not-allowed">
            Download Report
          </button>
        </>
      ) : (
        <>
          <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Download Report
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date(record.timestamp || Date.now()).toLocaleString()}
          </p>
        </>
      )}
    </div>
  );
};

export default DownloadReport;
