import { apiService } from './api';

// Server-side authentication check for getServerSideProps
export const isAuthenticated = async (session: unknown): Promise<boolean> => {
  try {
    // Check if user is authenticated via backend API
    const response = await apiService.auth.me();
    return response.status === 200;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
};
