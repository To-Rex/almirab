import { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDocuments, createDocument, updateDocument, deleteDocument } from '@/lib/database';
import { uploadFile, deleteFile } from '@/lib/storage';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface PortfolioItem extends Models.Document {
  title: string;
  description: string;
  category: string;
  imageId?: string;
  imageUrl?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const categories = ['Web Development', 'Mobile App', 'UI/UX Design', 'Data Analysis', 'Other'];

export default function AdminPortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const collectionId = 'portfolio-collection'; // Fixed collection ID

  useEffect(() => {
    loadPortfolioItems();
  }, []);

  const loadPortfolioItems = async () => {
    try {
      const response = await fetch(`/api/portfolio/${collectionId}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      const items = data.documents as PortfolioItem[];
      // Add image URLs for items with images and parse technologies
      const itemsWithImages = items.map(item => ({
        ...item,
        imageUrl: item.imageId ? `/api/image/${item.imageId}` : undefined,
        technologies: typeof item.technologies === 'string' ? JSON.parse(item.technologies) : item.technologies || []
      }));
      setPortfolioItems(itemsWithImages);
      setConnectionStatus('connected');
    } catch (error: any) {
      console.error('Failed to load portfolio items:', error);
      setConnectionStatus('disconnected');
      // Show error message if it's not just a missing collection
      if (!error.message?.includes('Collection not found') && !error.message?.includes('404')) {
        alert(`Failed to load portfolio items: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const initializeDatabase = async () => {
    try {
      const response = await fetch('/api/create-collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Portfolio', collectionId: collectionId })
      });
      const data = await response.json();
      if (data.collectionId) {
        // Collection created successfully, reload items
        loadPortfolioItems();
      } else {
        alert('Failed to create collection: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to initialize database:', error);
      alert('Failed to initialize database');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
    });
    setSelectedFile(null);
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) return;

    setUploading(true);
    try {
      let imageId = editingItem?.imageId;

      // Upload new image if selected
      if (selectedFile) {
        if (editingItem?.imageId) {
          // Delete old image
          const deleteResponse = await fetch(`/api/files/${editingItem.imageId}`, {
            method: 'DELETE'
          });
          if (!deleteResponse.ok) {
            console.warn('Failed to delete old image');
          }
        }

        // Upload new image
        const formData = new FormData();
        formData.append('file', selectedFile);
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || `HTTP ${uploadResponse.status}`);
        }
        const uploadData = await uploadResponse.json();
        imageId = uploadData.$id;
      }

      const portfolioData = {
        ...formData,
        technologies: JSON.stringify(formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean)),
        imageId,
      };

      if (editingItem) {
        const response = await fetch('/api/portfolio', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collectionId,
            documentId: editingItem.$id,
            data: portfolioData
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }
      } else {
        const response = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collectionId,
            data: portfolioData
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }
      }

      resetForm();
      setDialogOpen(false);
      loadPortfolioItems();
    } catch (error: any) {
      console.error('Failed to save portfolio item:', error);
      alert(`Failed to save portfolio item: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies || '',
      liveUrl: item.liveUrl || '',
      githubUrl: item.githubUrl || '',
      featured: item.featured,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string, imageId?: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      // Delete image first if it exists
      if (imageId) {
        const deleteResponse = await fetch(`/api/files/${imageId}`, {
          method: 'DELETE'
        });
        if (!deleteResponse.ok) {
          console.warn('Failed to delete image file');
        }
      }

      // Delete the document
      const response = await fetch(`/api/portfolio/${collectionId}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      loadPortfolioItems();
    } catch (error: any) {
      console.error('Failed to delete portfolio item:', error);
      alert(`Failed to delete portfolio item: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Management</h1>
          <p className="text-muted-foreground">Manage your portfolio projects and showcase</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Database Status:</span>
          <Badge
            variant={connectionStatus === 'connected' ? 'default' : 'destructive'}
          >
            {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
          </Badge>
          {connectionStatus === 'disconnected' && (
            <Button onClick={initializeDatabase} size="sm">
              Initialize Database
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {portfolioItems.length} portfolio {portfolioItems.length === 1 ? 'item' : 'items'}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Portfolio Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input
                    id="liveUrl"
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    placeholder="https://github.com/user/repo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Project Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                {editingItem?.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={editingItem.imageUrl}
                      alt="Current project image"
                      className="w-32 h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-8">Loading portfolio items...</div>
        ) : portfolioItems.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No portfolio items found. Add your first project!
          </div>
        ) : (
          portfolioItems.map((item) => (
            <Card key={item.$id} className="overflow-hidden">
              {item.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {item.category}
                    </Badge>
                  </div>
                  {item.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {item.description}
                </p>
                {item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {item.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.$id, item.imageId)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {(item.liveUrl || item.githubUrl) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (item.liveUrl) window.open(item.liveUrl, '_blank');
                        else if (item.githubUrl) window.open(item.githubUrl, '_blank');
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}