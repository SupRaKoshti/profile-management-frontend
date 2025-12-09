# Profile Management System - Frontend

A cross-platform mobile application built with React Native and Expo for user profile management with authentication.

## Tech Stack

- **Framework**: React Native 0.76.9 with Expo SDK 52
- **Language**: TypeScript for type safety
- **Routing**: Expo Router for file-based navigation
- **Styling**: React Native StyleSheet
- **HTTP Client**: Axios
- **Secure Storage**: expo-secure-store (mobile) / localStorage (web)
- **Notifications**: react-native-toast-message

## Features

- ✅ User authentication (Login & Signup)
- ✅ JWT token management with secure storage
- ✅ Profile viewing and editing
- ✅ Real-time profile strength meter
- ✅ Password change functionality
- ✅ Account deletion (soft delete)
- ✅ Toast notifications for user feedback
- ✅ Cross-platform support (Web, Android, iOS)
- ✅ Responsive design for all screen sizes
- ✅ Type-safe with TypeScript

## Project Structure

```
frontend-clean/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx           # Login screen
│   │   └── signup.tsx          # Signup screen
│   ├── (tabs)/
│   │   ├── profile.tsx         # View profile
│   │   ├── edit.tsx            # Edit profile
│   │   └── settings.tsx        # Settings (password, delete)
│   ├── _layout.tsx             # Root layout
│   └── index.tsx               # Landing/redirect
├── components/
│   ├── Input.tsx               # Reusable input component
│   ├── Button.tsx              # Reusable button component
│   └── ProfileStrengthMeter.tsx # Profile strength indicator
├── context/
│   └── AuthContext.tsx         # Authentication state management
├── utils/
│   ├── api.ts                  # Axios instance
│   └── storage.ts              # Token storage utilities
├── types/
│   └── index.ts                # TypeScript interfaces
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Expo CLI
- Backend API running on `http://localhost:8000`

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/profile-management-frontend.git
cd profile-management-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npx expo start
```

## Running the App

### Web (Desktop & Mobile Viewports)

```bash
npx expo start
# Press 'w' to open in web browser
```

**Access at:** `http://localhost:8081`

The web version is responsive and adapts to:
- Desktop screens (1920x1080+)
- Tablet screens (768x1024)
- Mobile screens (375x667)

### Android

#### Option 1: Expo Go (Easiest)

```bash
npx expo start
# Press 'a' to open Android emulator
# OR scan QR code with Expo Go app on physical device
```

#### Option 2: Development Build

```bash
npx expo run:android
```

### iOS (Mac only)

```bash
npx expo start
# Press 'i' to open iOS simulator
# OR scan QR code with Camera app on physical device
```

## Backend Configuration

The app connects to the backend API. Make sure:

1. Backend is running on `http://localhost:8000`
2. CORS is enabled on backend
3. All required endpoints are available

**API Base URL:** Configured in `utils/api.ts`

```typescript
const API_BASE_URL = 'http://localhost:8000';
```

For physical devices, replace `localhost` with your computer's IP:
```typescript
const API_BASE_URL = 'http://192.168.1.100:8000';
```

## Features Overview

### Authentication Flow

1. **Signup**
   - Enter name, email, and password
   - Password strength indicator
   - Creates account and redirects to login
   
2. **Login**
   - Email and password authentication
   - JWT token stored securely
   - Auto-redirect to profile on success

3. **Token Management**
   - Automatic token injection in API requests
   - Token stored in SecureStore (mobile) or localStorage (web)
   - Auto-logout on token expiration

### Profile Management

1. **View Profile**
   - Display user information (name, email, bio)
   - Avatar with user's initial
   - Navigation to edit and settings

2. **Edit Profile**
   - Update name and bio
   - Real-time profile strength meter
   - Validation and error handling
   - Success/error notifications

3. **Profile Strength Meter** (Bonus Feature)
   - Real-time calculation (0-100 score)
   - Based on name length and bio completeness
   - Color-coded feedback:
     - Red (0-33): Weak
     - Yellow (34-66): Good
     - Green (67-100): Excellent
   - Helpful tips for improvement

### Settings

1. **Change Password**
   - Requires old password
   - New password validation
   - Confirmation matching

2. **Delete Account**
   - Confirmation dialog
   - Soft delete on backend
   - Auto-logout after deletion

## Responsive Design

The app is fully responsive and works on:

### Mobile (375px - 767px)
- Single column layout
- Full-width cards
- Touch-optimized buttons
- Compact spacing

### Tablet (768px - 1023px)
- Optimized card widths
- Better use of space
- Larger touch targets

### Desktop (1024px+)
- Centered content with max-width
- Comfortable reading width
- Enhanced spacing
- Hover effects (web only)

## Type Safety

Full TypeScript implementation:

```typescript
// User interface
interface User {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
}

// All API calls are typed
const response = await api.get<User>('/profile/me');
```

## Error Handling

Comprehensive error handling with user-friendly messages:

- Network errors
- API validation errors
- Authentication failures
- Form validation errors

Toast notifications show:
- Success messages (green)
- Error messages (red)
- Info messages (blue)

## Testing the App

### Test User Flow

1. **Create Account**
   - Click "Sign up"
   - Enter details
   - Should redirect to login

2. **Login**
   - Enter credentials
   - Should see profile screen

3. **Edit Profile**
   - Update name and bio
   - Watch strength meter update
   - Save changes

4. **Change Password**
   - Go to Settings
   - Change password
   - Verify new password works

5. **Logout**
   - Click logout
   - Should redirect to login

## Platform-Specific Features

### Web
- Uses `localStorage` for token storage
- `window.confirm` for logout dialogs
- Responsive CSS layouts

### Mobile (iOS/Android)
- Uses `expo-secure-store` for token storage
- Native `Alert.alert` for dialogs
- Native keyboard handling
- Pull-to-refresh support

## Screenshots

Include these in your submission:

```
sample/
├── web-desktop-login.png
├── web-desktop-profile.png
├── web-mobile-login.png
├── mobile-android-profile.png
└── profile-strength-meter.png
```

## Troubleshooting

### Cannot Connect to Backend

**Error:** "Network Error" or "Connection Refused"

**Solution:**
1. Verify backend is running: `http://localhost:8000/docs`
2. For physical devices, use computer's IP instead of `localhost`
3. Check CORS is enabled on backend

### Token Not Persisting

**Error:** Logged out after refresh

**Solution:**
1. Check browser console for storage errors
2. Clear browser cache and localStorage
3. Verify token is being stored correctly

### Expo Go Issues

**Error:** "Unable to resolve module"

**Solution:**
```bash
# Clear cache
npx expo start --clear

# Or reinstall
rm -rf node_modules
npm install
```

## Development

### Adding New Features

1. Create new screen in `app/(tabs)/` or `app/(auth)/`
2. Add types to `types/index.ts`
3. Update navigation in `_layout.tsx`
4. Add API calls to `utils/api.ts`

### Code Style

- Use TypeScript for all files
- Follow React Native best practices
- Use StyleSheet for styling
- Keep components small and reusable

## Time Spent

**Estimated Development Time: 8-10 hours**

- Project setup and configuration: 1 hour
- Authentication screens and logic: 2 hours
- Profile screens and editing: 2 hours
- Profile strength meter (bonus): 1.5 hours
- Settings and additional features: 1.5 hours
- Responsive design and styling: 1.5 hours
- Testing and debugging: 1.5 hours
- Documentation: 1 hour

## Future Improvements

- [ ] Add unit and integration tests
- [ ] Implement pull-to-refresh on profile
- [ ] Add image upload for profile avatar
- [ ] Implement dark mode
- [ ] Add biometric authentication
- [ ] Offline support with local caching
- [ ] Push notifications
- [ ] Social login (Google, Apple)

## Known Issues

- NativeWind v4 has compatibility issues with Expo SDK 52 (documented)
- Used React Native StyleSheet as alternative
- All features working as expected with StyleSheet

## Author

Sahil Koshti - [GitHub Profile](https://github.com/SupRaKoshti)

## License

This project is part of the GenAI Engineering Accelerator assessment.