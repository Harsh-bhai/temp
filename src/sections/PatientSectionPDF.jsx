import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 20 },
  label: { fontWeight: "bold", marginBottom: 6, fontSize: 14 },
  content: { marginLeft: 10, marginBottom: 12 }
});

export default function PatientSectionPDF({ data }) {
  const { patient } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.label}>Patient Details</Text>
          <Text><Text style={styles.label}>Name: </Text>{patient.name || "________"}</Text>
          <Text><Text style={styles.label}>Age: </Text>{patient.age || "__"}</Text>
          <Text style={styles.label}>Medical History:</Text>
          <Text style={styles.content}>{patient.medicalHistory || "None provided"}</Text>
          <Text style={styles.label}>Lifestyle / Habits:</Text>
          <Text style={styles.content}>{patient.lifestyle || "None provided"}</Text>
        </View>
      </Page>
    </Document>
  );
}
