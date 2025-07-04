# Firebase Setup Guide for SaharaFanApp

This guide will help you set up Firebase in your React Native project.

## Prerequisites

- Node.js installed
- React Native development environment set up
- Firebase project created in Firebase Console

## Installation

Firebase packages have already been installed:
```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage
```

## Configuration Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard
4. Enable Authentication, Firestore, and Storage in your project

### 2. Configure Android

1. In Firebase Console, add an Android app to your project
2. Use package name: `com.saharafanapp`
3. Download `google-services.json`
4. Replace the placeholder file at `android/app/google-services.json` with your downloaded file

### 3. Configure iOS

1. In Firebase Console, add an iOS app to your project
2. Use bundle ID: `com.saharafanapp`
3. Download `GoogleService-Info.plist`
4. Replace the placeholder file at `ios/SaharaFanApp/GoogleService-Info.plist` with your downloaded file

### 4. Update Firebase Configuration

Update `firebase.config.js` with your actual Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id",
};
```

You can find these values in Firebase Console > Project Settings > General > Your apps

### 5. Firebase Services Configuration

#### Authentication
- Go to Firebase Console > Authentication > Sign-in method
- Enable Email/Password authentication
- Configure other sign-in methods as needed

#### Firestore Database
- Go to Firebase Console > Firestore Database
- Create database in test mode (or production mode with proper security rules)
- Set up your security rules

#### Storage
- Go to Firebase Console > Storage
- Get started with default rules
- Configure storage rules as needed

## Usage Examples

### Authentication Service

```javascript
import AuthService from './src/services/AuthService';

// Sign up
const user = await AuthService.signUp('user@example.com', 'password123');

// Sign in
const user = await AuthService.signIn('user@example.com', 'password123');

// Sign out
await AuthService.signOut();

// Listen to auth state changes
AuthService.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    console.log('User is signed out');
  }
});
```

### Firestore Service

```javascript
import FirestoreService from './src/services/FirestoreService';

// Add document
await FirestoreService.addDocument('users', {
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date()
});

// Get document
const user = await FirestoreService.getDocument('users', 'userId');

// Update document
await FirestoreService.updateDocument('users', 'userId', {
  name: 'Jane Doe'
});

// Listen to collection changes
FirestoreService.onCollectionSnapshot('users', (snapshot) => {
  snapshot.forEach(doc => {
    console.log(doc.id, doc.data());
  });
});
```

### Storage Service

```javascript
import StorageService from './src/services/StorageService';

// Upload file
const result = await StorageService.uploadFile(
  '/path/to/local/file.jpg',
  'profile-picture.jpg',
  'user-uploads'
);

// Get download URL
const downloadURL = await StorageService.getDownloadURL(
  'profile-picture.jpg',
  'user-uploads'
);

// Delete file
await StorageService.deleteFile('profile-picture.jpg', 'user-uploads');
```

## Running the App

### Android
```bash
npx react-native run-android
```

### iOS
```bash
npx react-native run-ios
```

## Troubleshooting

### Common Issues

1. **Build errors on iOS**: Make sure you've run `pod install` in the `ios` directory
2. **Android build errors**: Ensure `google-services.json` is in the correct location
3. **Firebase not initialized**: Check that your configuration values are correct

### iOS Specific

If you encounter issues with iOS builds:
```bash
cd ios
pod install
```

### Android Specific

If you encounter issues with Android builds:
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

## Security Rules

### Firestore Security Rules Example

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read access to posts
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Security Rules Example

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /user-uploads/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Next Steps

1. Replace placeholder configuration files with your actual Firebase project files
2. Configure Firebase security rules
3. Set up Firebase Authentication methods
4. Create your Firestore database structure
5. Test the Firebase integration

For more detailed documentation, visit the [React Native Firebase documentation](https://rnfirebase.io/). 