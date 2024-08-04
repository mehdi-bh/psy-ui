"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPatient, updatePatient } from "@/src/services/patientService";
import { Patient } from "@/src/models/Patient";
import { Input, Button } from "@nextui-org/react";

const PatientDetails = () => {
  const { id } = useParams(); // Use useParams to get route parameters
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const data = await getPatient(id as string);
          setPatient(data);
        } catch (error) {
          console.error("Error fetching patient details:", error);
        }
      }
    };

    fetchPatient();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (patient) {
      setPatient({
        ...patient,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = async () => {
    if (patient) {
      try {
        await updatePatient(patient.PatientId, patient);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating patient details:", error);
      }
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h1>{isEditing ? "Edit" : "View"} Patient Details</h1>
      <div>
        <Input
          name="FirstName"
          label="First Name"
          value={patient.FirstName}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
        <Input
          name="LastName"
          label="Last Name"
          value={patient.LastName}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
        <Input
          name="DateOfBirth"
          label="Date of Birth"
          value={patient.DateOfBirth}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
        <Input
          name="Sex"
          label="Sex"
          value={patient.Sex}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
        <Input
          name="Email"
          label="Email"
          value={patient.Email}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
        <Input
          name="PhoneNumber"
          label="Phone Number"
          value={patient.PhoneNumber}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
        <Input
          name="Street"
          label="Street"
          value={patient.Address.Street}
          onChange={(e) =>
            setPatient({
              ...patient,
              Address: { ...patient.Address, Street: e.target.value },
            })
          }
          readOnly={!isEditing}
        />
        <Input
          name="City"
          label="City"
          value={patient.Address.City}
          onChange={(e) =>
            setPatient({
              ...patient,
              Address: { ...patient.Address, City: e.target.value },
            })
          }
          readOnly={!isEditing}
        />
        <Input
          name="State"
          label="State"
          value={patient.Address.State}
          onChange={(e) =>
            setPatient({
              ...patient,
              Address: { ...patient.Address, State: e.target.value },
            })
          }
          readOnly={!isEditing}
        />
        <Input
          name="ZipCode"
          label="ZipCode"
          value={patient.Address.ZipCode}
          onChange={(e) =>
            setPatient({
              ...patient,
              Address: { ...patient.Address, ZipCode: e.target.value },
            })
          }
          readOnly={!isEditing}
        />
        <Input
          name="Description"
          label="Description"
          value={patient.Description || ""}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
        <Input
          name="Photo"
          label="Photo URL"
          value={patient.Photo || ""}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
      </div>
      {isEditing ? (
        <Button color="success" onClick={handleSave}>Save</Button>
      ) : (
        <Button color="primary" onClick={() => setIsEditing(true)}>Edit</Button>
      )}
    </div>
  );
};

export default PatientDetails;
