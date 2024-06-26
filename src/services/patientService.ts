import { Patient } from "../models/Patient";

import apiClient from "./apiClient";

export const getPatients = async (
  psychologistId: string,
): Promise<Patient[]> => {
  const response = await apiClient.get(
    `/patients/psychologist/${psychologistId}`,
  );

  return response.data;
};
