import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { AppRoutes } from './routes';
import { Layout } from './components/layout';
import { AuthGuard } from './components/auth/auth-guard';

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Main App component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthGuard>
          <Layout>
            <AppRoutes />
          </Layout>
          <Toaster />
        </AuthGuard>
      </Router>
    </QueryClientProvider>
  );
}

// Default export to resolve the import error
export default App;
