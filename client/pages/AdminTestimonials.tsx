import { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDocuments, createDocument, deleteDocument } from '@/lib/database';

interface Testimonial extends Models.Document {
  name: string;
  message: string;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'not-configured'>('not-configured');

  const [collectionId, setCollectionId] = useState('placeholder-collection');

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    // Check if database IDs are configured
    const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '6951038a0011579f3d8c'; // This should match the one in database.ts
if (collectionId === 'placeholder-collection') {
  setConnectionStatus('not-configured');
  setLoading(false);
  return;
}

try {

  const response = await getDocuments([], collectionId);
      setTestimonials(response.documents as unknown as Testimonial[]);
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Failed to load testimonials:', error);
      setConnectionStatus('disconnected');
    } finally {
      setLoading(false);
    }
  };

  const initializeDatabase = async () => {
    try {
      const response = await fetch('/api/create-collection', { method: 'POST' });
      const data = await response.json();
      if (data.collectionId) {
        // Update the COLLECTION_ID
        setCollectionId(data.collectionId);
        // Reload testimonials
        loadTestimonials();
      } else {
        alert('Failed to create collection: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to initialize database:', error);
      alert('Failed to initialize database');
    }
  };

  const addTestData = async () => {
    try {
      await createDocument({ name: 'Test User', message: 'This is a test testimonial to verify the Appwrite integration is working correctly.' }, collectionId);
      loadTestimonials();
    } catch (error) {
      console.error('Failed to add test data:', error);
      alert('Failed to add test data');
    }
  };

  const handleCreate = async () => {
    if (!newTestimonial.name || !newTestimonial.message) return;

    try {
      await createDocument(newTestimonial, collectionId);
      setNewTestimonial({ name: '', message: '' });
      loadTestimonials();
    } catch (error) {
      console.error('Failed to create testimonial:', error);
      alert('Failed to create testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument(id, collectionId);
      loadTestimonials();
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">Database Status:</span>
          <Badge
            variant={
              connectionStatus === 'connected' ? 'default' :
              connectionStatus === 'not-configured' ? 'secondary' : 'destructive'
            }
          >
            {connectionStatus === 'connected' ? 'Connected' :
             connectionStatus === 'not-configured' ? 'Not Configured' : 'Disconnected'}
          </Badge>
          {connectionStatus === 'not-configured' && (
            <Button onClick={initializeDatabase} size="sm">
              Initialize Database
            </Button>
          )}
          {connectionStatus === 'connected' && (
            <Button onClick={addTestData} size="sm" variant="outline">
              Add Test Data
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Testimonial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Name"
              value={newTestimonial.name}
              onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
            />
            <Textarea
              placeholder="Message"
              value={newTestimonial.message}
              onChange={(e) => setNewTestimonial(prev => ({ ...prev, message: e.target.value }))}
            />
            <Button onClick={handleCreate} className="w-full">
              Add Testimonial
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : testimonials.length === 0 ? (
              <p>No testimonials found.</p>
            ) : (
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.$id} className="border p-4 rounded">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.message}</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(testimonial.$id)}
                      className="mt-2"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}