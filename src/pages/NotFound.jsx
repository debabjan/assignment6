import { useNavigate } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

/**
 * NotFound Page (/*)
 * Fallback route for invalid URLs
 */
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="py-12 flex justify-center">
      <div className="max-w-md w-full">
        <EmptyState
          icon={FileQuestion}
          title="404 — Page Not Found"
          description="The requested page route could not be found. Please check the URL or return to the dashboard."
          action={
            <Button
              variant="primary"
              icon={ArrowLeft}
              onClick={() => navigate('/dashboard')}
            >
              Return to Dashboard
            </Button>
          }
        />
      </div>
    </div>
  );
}
