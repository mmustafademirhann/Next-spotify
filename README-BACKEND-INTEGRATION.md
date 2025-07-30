# Spotify Clone - Backend Integration Guide

This document explains how the Next-spotify frontend has been adapted to work with your custom Spring Boot backend.

## Changes Made

### 1. Authentication System
- **Removed**: NextAuth with Spotify OAuth
- **Added**: Custom JWT authentication using HTTP-only cookies
- **Files Modified**:
  - `context/AuthContext.tsx` - New custom authentication context
  - `pages/login.tsx` - Custom login/register form
  - `pages/api/auth/[...nextauth].ts` - Disabled NextAuth
  - `components/ProtectedRoute.tsx` - Route protection component

### 2. API Integration
- **Removed**: Spotify Web API calls
- **Added**: Custom backend API integration
- **Files Modified**:
  - `utils/api.ts` - New API service for backend communication
  - `pages/api/playlists.ts` - Updated to use custom backend
  - `pages/api/search.ts` - Updated to use custom backend
  - `utils/customGet.ts` - Deprecated (replaced by api.ts)

### 3. Data Types
- **Updated**: Type definitions to match backend data structure
- **Files Modified**:
  - `types/types.ts` - Updated User interface and removed NextAuth types

### 4. Components
- **Updated**: Components to use new authentication system
- **Files Modified**:
  - `components/Header.tsx` - Uses useAuth instead of useSession
  - `pages/_app.tsx` - Uses AuthProvider and ProtectedRoute

## Setup Instructions

### 1. Environment Configuration
Create a `.env.local` file in the Next-spotify directory:

```bash
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

# JWT Secret (optional, for client-side handling)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### 2. Install Dependencies
```bash
cd Next-spotify
npm install
```

### 3. Start the Backend
Make sure your Spring Boot backend is running on port 8080:
```bash
cd clone
./mvnw spring-boot:run
```

### 4. Start the Frontend
```bash
cd Next-spotify
npm run dev
```

## Backend Requirements

Your Spring Boot backend should have these endpoints available:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout (optional)

### Data Endpoints
- `GET /api/playlists` - Get all playlists
- `POST /api/playlists` - Create playlist
- `PUT /api/playlists` - Update playlist
- `DELETE /api/playlists/{id}` - Delete playlist
- `GET /api/search` - Search functionality
- `GET /api/tracks` - Get tracks
- `GET /api/albums` - Get albums
- `GET /api/artists` - Get artists

## Authentication Flow

1. User visits any protected route
2. `ProtectedRoute` component checks authentication status
3. If not authenticated, redirects to `/login`
4. User logs in with username/password
5. Backend returns JWT token in HTTP-only cookie
6. Frontend stores user info in AuthContext
7. All API calls include the cookie automatically

## CORS Configuration

Make sure your Spring Boot backend has CORS configured to allow requests from `http://localhost:3000`:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}
```

## Next Steps

1. **Add User Profile Endpoint**: Consider adding `GET /api/auth/me` to your backend for better user info handling
2. **Error Handling**: Enhance error handling in the frontend for better user experience
3. **Data Models**: Update frontend data models to exactly match your backend DTOs
4. **Features**: Implement remaining Spotify-like features using your backend data

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure CORS is properly configured in your Spring Boot backend
2. **Authentication Issues**: Check that JWT tokens are being set as HTTP-only cookies
3. **API Errors**: Verify that your backend endpoints match the expected paths in `utils/api.ts`

### Debug Tips
- Check browser Network tab for API calls
- Check browser Application tab for cookies
- Check backend logs for authentication errors
- Use browser console for JavaScript errors
