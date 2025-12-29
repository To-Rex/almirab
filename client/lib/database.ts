import { databases } from './appwrite';
import { Permission, Role, ID } from 'appwrite';

// TODO: Replace with actual database and collection IDs from your Appwrite project
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '6951038a0011579f3d8c'; // e.g., 'main-db'
export let COLLECTION_ID = 'placeholder-collection'; // e.g., 'testimonials'

export const createDocument = async (data: Record<string, any>, collectionId?: string) => {
  const cid = collectionId || COLLECTION_ID;
  try {
    const response = await databases.createDocument(DATABASE_ID, cid, ID.unique(), data);
    return response;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const getDocuments = async (queries: string[] = [], collectionId?: string) => {
  const cid = collectionId || COLLECTION_ID;
  try {
    const response = await databases.listDocuments(DATABASE_ID, cid, queries);
    return response;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const getDocument = async (documentId: string) => {
  try {
    const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, documentId);
    return response;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};

export const updateDocument = async (documentId: string, data: Record<string, any>, collectionId?: string) => {
  const cid = collectionId || COLLECTION_ID;
  try {
    const response = await databases.updateDocument(DATABASE_ID, cid, documentId, data);
    return response;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (documentId: string, collectionId?: string) => {
  const cid = collectionId || COLLECTION_ID;
  try {
    const response = await databases.deleteDocument(DATABASE_ID, cid, documentId);
    return response;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};
