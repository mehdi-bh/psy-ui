import apiClient from './apiClient';
import { Patient } from '../models/Patient';

export const getPatients = async (psychologistId: string): Promise<Patient[]> => {
  const response = await apiClient.get(`/patients/psychologist/${psychologistId}`);
  return response.data;
};
