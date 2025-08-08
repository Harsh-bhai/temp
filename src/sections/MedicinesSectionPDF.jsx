import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#e4e4e4",
    padding: 4,
    fontWeight: "bold"
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4
  }
});

const freqMap = { M: "Morning", E: "Evening", N: "Night" };

export default function MedicinesSectionPDF({ data }) {
  const { medicines } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: "bold" }}>Medicines</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Name</Text>
            <Text style={styles.tableColHeader}>Dose</Text>
            <Text style={styles.tableColHeader}>Frequency</Text>
            <Text style={styles.tableColHeader}>Duration</Text>
            <Text style={styles.tableColHeader}>Remarks</Text>
          </View>
          {medicines.length === 0 ? (
            <View style={styles.tableRow}>
              <Text style={[styles.tableCol, { width: "100%", textAlign: "center" }]}>No medicines added</Text>
            </View>
          ) : (
            medicines.map((m, i) => (
              <View style={styles.tableRow} key={i}>
                <Text style={styles.tableCol}>{m.name}</Text>
                <Text style={styles.tableCol}>{m.dose}</Text>
                <Text style={styles.tableCol}>{m.frequency.map(f => freqMap[f] || f).join(", ")}</Text>
                <Text style={styles.tableCol}>{m.duration}</Text>
                <Text style={styles.tableCol}>{m.remarks}</Text>
              </View>
            ))
          )}
        </View>
      </Page>
    </Document>
  );
}
