import React, { useEffect, useState } from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import apiEndpoint from "../../../utils/api";
import axios from "axios";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    marginLeft: 12,
    fontSize: 20,
    textAlign: "left",
    fontFamily: "Times-Roman",
  },
  text: {
    marginLeft: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  section: {
    margin: 10,
  },
});

export default function Prescription(props) {
  const [patientDetails, setPatientsDetails] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState([]);

  useEffect(() => {
    const getDoctorDetails = async () => {
      const id = JSON.parse(localStorage.getItem("id"));
      await axios
        .get(`${apiEndpoint}doctors/id?id=${id}`)
        .then((response) => {
          setDoctorDetails(response.data[0]);
        })
        .catch((error) => console.log(error));
    };

    const getPatientDetails = async () => {
      await axios
        .get(`${apiEndpoint}patients/id?id=${props.patientID}`)
        .then((response) => {
          setPatientsDetails(response.data[0]);
        })
        .catch((error) => console.log(error));
    };
    getDoctorDetails();
    getPatientDetails();
  }, [props.patientID]);

  function calculateAge(bday) {
    let birthdate = new Date(bday);
    let diff_ms = Date.now() - birthdate.getTime();
    let age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.title}>E-Prescription</Text>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Patient Details</Text>
          <Text style={styles.text}>
            Patient ID -
            {patientDetails !== [] ? patientDetails["patientID"] : null}
          </Text>
          <Text style={styles.text}>
            Patient Name - 
            {patientDetails !== [] ? patientDetails["firstName"] : null}
            {patientDetails !== [] ? patientDetails["lastName"] : null}
          </Text>
          <Text style={styles.text}>
            Address - {patientDetails !== [] ? patientDetails["address"] : null}
          </Text>
          <Text style={styles.text}>
            Age -
            {patientDetails !== []
              ? calculateAge(patientDetails["bdate"])
              : null}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Patient Details</Text>
          <Text style={styles.text}>
            Doctor ID -{doctorDetails !== [] ? doctorDetails["staffID"] : null}
          </Text>
          <Text style={styles.text}>
            Doctor Name -
            {doctorDetails !== [] ? doctorDetails["firstName"] : null}
            {doctorDetails !== [] ? doctorDetails["lastName"] : null}
          </Text>
          <Text style={styles.text}>
            Specialist - {doctorDetails !== [] ? doctorDetails["area"] : null}
          </Text>
          <Text style={styles.text}>
            Mobile - {doctorDetails !== [] ? doctorDetails["mobile"] : null}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Advices</Text>
          <Text style={styles.text}>{props.advice}</Text>
        </View>
      </Page>
    </Document>
  );
}
