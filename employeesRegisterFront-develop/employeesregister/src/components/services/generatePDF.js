import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (reportData, actualDate, companyName) => {
  const doc = new jsPDF();
  doc.setFontSize(12);

  // Add the header text "Registro delle presenze"
  doc.text(
    "Registro delle presenze",
    doc.internal.pageSize.getWidth() / 2,
    17,
    {
      align: "center",
    }
  );
  doc.setFontSize(11);
 
  doc.text(
    companyName || "",
    15, 
    10, 
    { fontSize: 9 } 
  );

  const headers = [["Cognome", "Nome", "", "Firma"]];
  const data = reportData.map((item) => [
    item.Cognome,
    item.Nome,
    "",
    item.Firma,
  ]);

  if (actualDate) {
    const day = actualDate.getDate().toString().padStart(2, "0");
    const month = (actualDate.getMonth() + 1).toString().padStart(2, "0");
    const formattedDate = `${day}/${month}`;
    headers[0][2] = formattedDate;
  }

  const tableOptions = {
    startY: 25, // Adjust the Y-coordinate to make space for the header and company name
    theme: "grid",
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.1,
    headStyles: { fillColor: [71, 121, 173] },
  };

  doc.autoTable({
    head: headers,
    body: data,
    ...tableOptions,
  });

  doc.save("registro_delle_presenze.pdf");
};

export default generatePDF;
