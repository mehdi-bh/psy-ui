"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getPatients } from "@/src/services/patientService";
import { Patient } from "@/src/models/Patient";
import PatientList from "../../components/PatientList";

const Patients = () => {
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const userId = "456";
  const router = useRouter();

  const fetchPatients = useCallback(async () => {
    try {
      const data = await getPatients(userId);
      setPatientList(data);
    } catch (error) {
      console.error("Error fetching patient list:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handlePatientClick = (patientId: string) => {
    router.push(`/patients/${patientId}`);
  };

  return <PatientList patients={patientList} onPatientClick={handlePatientClick} />;
};

export default Patients;
