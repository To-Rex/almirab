import serverless from "serverless-http";

import { createServer } from "../../server";

console.log('APPWRITE_ENDPOINT:', process.env.APPWRITE_ENDPOINT);
console.log('APPWRITE_PROJECT_ID:', process.env.APPWRITE_PROJECT_ID);
console.log('APPWRITE_API_KEY exists:', !!process.env.APPWRITE_API_KEY);

export const handler = serverless(createServer());
