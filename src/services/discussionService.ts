import apiClient from './apiClient';
import { DiscussionMessage } from '../models/DiscussionMessage';

export const getMessages = async (psychologistId: string, patientId: string): Promise<DiscussionMessage[]> => {
  const response = await apiClient.get(`/discussion_messages/${psychologistId}/${patientId}`);
  return response.data;
};

export const sendMessage = async (message: DiscussionMessage): Promise<void> => {
  await apiClient.post('/discussion_message', message);
};
