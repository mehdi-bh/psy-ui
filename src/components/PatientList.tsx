import React, { useState } from "react";
import { Input, User } from "@nextui-org/react";
import { Patient } from "@/src/models/Patient";

interface PatientListProps {
  patients: Patient[];
  onPatientClick: (patientId: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onPatientClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.FirstName} ${patient.LastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) ||
      (patient.Description && patient.Description.toLowerCase().includes(query))
    );
  });

  return (
    <div>
      <Input
        type="text"
        placeholder="Search patients..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 pr-6"
      />
      {filteredPatients.map((patient) => (
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
