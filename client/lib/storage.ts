import { storage } from './appwrite';
import { ID } from 'appwrite';

// TODO: Replace with actual bucket ID from your Appwrite project
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID || '69510ffe003501270011';

export const uploadFile = async (file: File) => {
  try {
    const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getFilePreview = (fileId: string, width?: number, height?: number) => {
  try {
    return storage.getFilePreview(BUCKET_ID, fileId, width, height);
  } catch (error) {
    console.error('Error getting file preview:', error);
    throw error;
  }
};

export const getFileDownload = (fileId: string) => {
  try {
    return storage.getFileDownload(BUCKET_ID, fileId);
  } catch (error) {
    console.error('Error getting file download:', error);
    throw error;
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    const response = await storage.deleteFile(BUCKET_ID, fileId);
    return response;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};