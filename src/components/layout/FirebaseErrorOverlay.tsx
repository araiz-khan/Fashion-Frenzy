
import { AlertTriangle } from "lucide-react";

export function FirebaseErrorOverlay({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="max-w-md w-full mx-4 p-6 rounded-lg border border-destructive bg-card shadow-2xl text-card-foreground">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <div>
            <h2 className="text-xl font-headline font-bold text-destructive">Configuration Error</h2>
            <p className="mt-2 text-base text-foreground">The application cannot start due to a configuration issue.</p>
            <p className="mt-4 text-sm bg-destructive/10 text-destructive p-3 rounded-md font-mono border border-destructive/20 break-words">
              {message}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Please check your <strong>.env</strong> file and ensure all the required Firebase variables are set correctly. You can find these in your Firebase project settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
