
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-6xl font-bold tracking-tighter">404</h1>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        <p className="text-xl text-muted-foreground">
          This page doesn't exist or has been moved
        </p>
        <Button asChild className="mt-6">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
