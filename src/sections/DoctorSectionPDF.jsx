import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  logo: { width: 60, height: 60, marginRight: 15 },
  doctorName: { fontSize: 18, fontWeight: "bold" },
  doctorQualification: { fontSize: 14, marginBottom: 4 },
  addressText: { fontSize: 10, marginBottom: 2 },
  timingsText: { fontSize: 10, fontStyle: "italic" }
});

export default function DoctorSectionPDF({ data }) {
  const { doctor } = data;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {doctor.logo ? (
            <Image src={doctor.logo} style={styles.logo} />
          ) : (
            <View style={[styles.logo, { backgroundColor: "#ccc" }]} />
          )}
          <View>
            <Text style={styles.doctorName}>{doctor.name || "Dr. [Name]"}</Text>
            <Text style={styles.doctorQualification}>{doctor.qualification}</Text>
            <Text style={styles.addressText}>{doctor.address}</Text>
            <Text style={styles.timingsText}>Timings: {doctor.timings || "N/A"}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
