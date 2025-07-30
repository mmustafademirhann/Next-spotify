// Temporary stub to replace next-auth imports during migration
// This prevents compilation errors while we complete the migration

export const getSession = () => Promise.resolve(null);
export const useSession = () => ({ data: null, status: 'unauthenticated' });
export const signOut = () => Promise.resolve();
export const signIn = () => Promise.resolve();

// JWT stub
export const getToken = () => Promise.resolve(null);
