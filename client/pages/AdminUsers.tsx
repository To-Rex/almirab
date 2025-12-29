import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">User management features will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}