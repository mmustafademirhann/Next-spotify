// Temporary compatibility layer for NextAuth migration
// This file provides stub functions to prevent import errors while we migrate

export const getSession = () => {
  console.warn('getSession is deprecated. Use useAuth hook instead.');
  return null;
};

export const useSession = () => {
  console.warn('useSession is deprecated. Use useAuth hook instead.');
  return { data: null, status: 'unauthenticated' };
};

export const signOut = () => {
  console.warn('signOut is deprecated. Use useAuth logout instead.');
  return Promise.resolve();
};

export const signIn = () => {
  console.warn('signIn is deprecated. Use useAuth login instead.');
  return Promise.resolve();
};

export const getToken = () => {
  console.warn('getToken is deprecated. Authentication is now handled via cookies.');
  return null;
};
