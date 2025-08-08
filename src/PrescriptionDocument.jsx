// src/PrescriptionDocument.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff'
  },
  section: {
    marginBottom: 20
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  doctorQualification: {
    fontSize: 14,
    marginBottom: 4
  },
  addressText: {
    fontSize: 10,
    marginBottom: 2
  },
  patientInfo: {
    marginBottom: 20
  },
  patientLabel: {
    fontWeight: 'bold'
  },
  medicinesTable: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#e4e4e4',
    padding: 4,
    fontWeight: 'bold'
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4
  }
});

const freqMap = { M: 'Morning', E: 'Evening', N: 'Night' };

const PrescriptionDocument = ({ data }) => {
  const { doctor, patient, medicines } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Doctor section (top 20%) */}
        <View style={[styles.section, { minHeight: '20%', marginBottom: 20 }]}>
          <View style={styles.header}>
            {doctor.logo ? (
              <Image style={styles.logo} src={doctor.logo} />
            ) : (
              <View style={[styles.logo, { backgroundColor: '#ccc' }]} />
            )}
            <View>
              <Text style={styles.doctorName}>{doctor.name || 'Dr. [Name]'}</Text>
              <Text style={styles.doctorQualification}>{doctor.qualification}</Text>
              <Text style={styles.addressText}>{doctor.address}</Text>
              <Text style={[styles.addressText, { fontStyle: 'italic' }]}>Timings: {doctor.timings || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Patient section (next 30%) */}
        <View style={[styles.section, { minHeight: '30%' }]}>
          <Text style={styles.patientLabel}>Patient Name: <Text>{patient.name || '____'}</Text></Text>
          <Text style={styles.patientLabel}>Age: <Text>{patient.age || '__'}</Text></Text>
          <Text style={[styles.patientLabel, { marginTop: 10 }]}>Medical History:</Text>
          <Text style={{ marginLeft: 10 }}>{patient.medicalHistory || 'None provided'}</Text>
          <Text style={[styles.patientLabel, { marginTop: 10 }]}>Lifestyle / Habits:</Text>
          <Text style={{ marginLeft: 10 }}>{patient.lifestyle || 'None provided'}</Text>
        </View>

        {/* Medicines table (remaining 50%) */}
        <View style={[styles.section, { minHeight: '50%' }]}>
          <Text style={[styles.patientLabel, { marginBottom: 10, fontSize: 14 }]}>Medicines</Text>
          <View style={styles.medicinesTable}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Name</Text>
              <Text style={styles.tableColHeader}>Dose</Text>
              <Text style={styles.tableColHeader}>Frequency</Text>
              <Text style={styles.tableColHeader}>Duration</Text>
              <Text style={styles.tableColHeader}>Remarks</Text>
            </View>
            {/* Table Rows */}
            {medicines.length === 0 ? (
              <View style={styles.tableRow}>
                <Text style={[styles.tableCol, { width: '100%', textAlign: 'center' }]}>No medicines added</Text>
              </View>
            ) : (
              medicines.map((m, i) => (
                <View style={styles.tableRow} key={i}>
                  <Text style={styles.tableCol}>{m.name}</Text>
                  <Text style={styles.tableCol}>{m.dose}</Text>
                  <Text style={styles.tableCol}>{m.frequency.map(f => freqMap[f] || f).join(', ')}</Text>
                  <Text style={styles.tableCol}>{m.duration}</Text>
                  <Text style={styles.tableCol}>{m.remarks}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PrescriptionDocument;
