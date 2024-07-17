import React from "react";
import { User } from "@nextui-org/react";
import { Patient } from "@/src/models/Patient";

interface PatientListProps {
  patients: Patient[];
  onPatientClick: (patientId: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onPatientClick }) => {
  return (
    <div>
      {patients.map((patient) => (
        <div
          key={patient.PatientId}
          className="cursor-pointer mr-4 p-2 hover:bg-gray-200 rounded"
          onClick={() => onPatientClick(patient.PatientId)}
        >
          <User
            name={`${patient.FirstName} ${patient.LastName}`}
            description={patient.Description || "/"}
            avatarProps={{
              src: patient.Photo || "/" // TODO: Add default avatar
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PatientList;
