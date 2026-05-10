'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, RefreshCw, Database } from 'lucide-react';

export default function SyncStatusPage() {
  const [syncData, setSyncData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSyncStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/sync-products');
      if (!response.ok) throw new Error('Failed to fetch sync status');
      const data = await response.json();
      setSyncData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyncStatus();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <Database className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-2">MongoDB Sync Status</h1>
          <p className="text-muted-foreground">
            Monitor product synchronization from your new database
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Fetching sync status...</p>
              </div>
            </CardContent>
          </Card>
        ) : syncData ? (
          <>
            <Card className={syncData.success ? 'border-green-500' : 'border-red-500'}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {syncData.success ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <CardTitle>{syncData.message || syncData.error}</CardTitle>
                </div>
                <CardDescription>
                  {new Date().toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Products</p>
                    <p className="text-3xl font-bold text-primary">
                      {syncData.count ?? '—'}
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className={`text-lg font-semibold ${syncData.success ? 'text-green-600' : 'text-red-600'}`}>
                      {syncData.success ? '✅ Connected' : '❌ Failed'}
                    </p>
                  </div>
                </div>

                {syncData.products && syncData.products.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Sample Products</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {syncData.products.map((product: any, idx: number) => (
                        <div key={idx} className="bg-muted p-3 rounded text-sm">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.category} • ${product.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(!syncData.products || syncData.products.length === 0) && syncData.success && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Products Found</AlertTitle>
                    <AlertDescription>
                      Your MongoDB database is connected but empty. Add products to see them appear here.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Database Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-muted-foreground">MongoDB URI</span>
                  <span className="font-mono text-xs">✅ Configured</span>
                </div>
                <div className="text-xs text-muted-foreground mt-3 p-2 bg-muted rounded">
                  📌 Make sure your new MongoDB cluster has products in the "Product" collection
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={fetchSyncStatus} disabled={loading} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Status
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
