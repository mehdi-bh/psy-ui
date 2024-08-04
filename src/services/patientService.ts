import { Patient } from "../models/Patient";
import apiClient from "./apiClient";

export const getPatients = async (psychologistId: string): Promise<Patient[]> => {
  const response = await apiClient.get(`/patients/psychologist/${psychologistId}`);
  return response.data;
};

export const getPatient = async (id: string): Promise<Patient> => {
  const response = await apiClient.get(`/patient/${id}`);
  return response.data;
};

export const updatePatient = async (id: string, updatedData: Partial<Patient>): Promise<void> => {
  await apiClient.put(`/patient/${id}`, updatedData);
};
