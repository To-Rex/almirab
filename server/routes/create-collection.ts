import { Client, Databases, Permission, Role, ID, Storage } from 'node-appwrite';

const client = new Client();

client
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT!)
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);
const storage = new Storage(client);

const databaseId = '6951038a0011579f3d8c';

export const handleCreateCollection = async (req: any, res: any) => {
  try {
    const { name, collectionId } = req.body;
    const collectionName = name || 'testimonials';
    const finalCollectionId = collectionId || ID.unique();

    // Check if collection already exists
    try {
      const existingCollection = await databases.getCollection(databaseId, finalCollectionId);
      // Collection already exists, return its ID
      res.json({ collectionId: existingCollection.$id });
      return;
    } catch (error) {
      // Collection doesn't exist, create it
    }

    const collection = await databases.createCollection(
      databaseId, // database ID
      finalCollectionId,
      collectionName,
      [
        Permission.read(Role.any()),
        Permission.create(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
      ]
    );

    // Add attributes based on collection type
    if (collectionName.toLowerCase().includes('portfolio')) {
      // Portfolio collection attributes
      await databases.createStringAttribute(databaseId, collection.$id, 'title', 255, true);
      await databases.createStringAttribute(databaseId, collection.$id, 'description', 2000, true);
      await databases.createStringAttribute(databaseId, collection.$id, 'category', 100, true);
      await databases.createStringAttribute(databaseId, collection.$id, 'imageId', 100, false);
      await databases.createStringAttribute(databaseId, collection.$id, 'liveUrl', 500, false);
      await databases.createStringAttribute(databaseId, collection.$id, 'githubUrl', 500, false);
      await databases.createStringAttribute(databaseId, collection.$id, 'technologies', 1000, false); // JSON array as string
      await databases.createBooleanAttribute(databaseId, collection.$id, 'featured', false);
    } else {
      // Default testimonials attributes
      await databases.createStringAttribute(databaseId, collection.$id, 'name', 255, true);
      await databases.createStringAttribute(databaseId, collection.$id, 'message', 1000, true);
    }

    res.json({ collectionId: collection.$id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Portfolio CRUD operations
export const handleGetPortfolio = async (req: any, res: any) => {
  try {
    const { collectionId } = req.params;
    const response = await databases.listDocuments(databaseId, collectionId);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const handleCreatePortfolio = async (req: any, res: any) => {
  try {
    const { collectionId, data } = req.body;
    const response = await databases.createDocument(databaseId, collectionId, ID.unique(), data);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const handleUpdatePortfolio = async (req: any, res: any) => {
  try {
    const { collectionId, documentId, data } = req.body;
    const response = await databases.updateDocument(databaseId, collectionId, documentId, data);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const handleDeletePortfolio = async (req: any, res: any) => {
  try {
    const { collectionId, documentId } = req.params;
    const response = await databases.deleteDocument(databaseId, collectionId, documentId);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Storage handlers
export const handleUploadFile = async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a File object from the buffer for Appwrite
    const fileObject = new File([file.buffer], file.originalname, { type: file.mimetype });

    const response = await storage.createFile('69510ffe003501270011', ID.unique(), fileObject);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const handleDeleteFile = async (req: any, res: any) => {
  try {
    const { fileId } = req.params;
    const response = await storage.deleteFile('69510ffe003501270011', fileId);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const handleGetImage = async (req: any, res: any) => {
  try {
    const { fileId } = req.params;
    const file = await storage.getFileView('69510ffe003501270011', fileId);
    // Since file is a URL, we need to fetch it and pipe to response
    const response = await fetch(file.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const buffer = await response.arrayBuffer();
    res.set('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    res.send(Buffer.from(buffer));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};