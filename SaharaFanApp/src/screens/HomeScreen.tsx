import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'An error occurred during sign out');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Home!</Text>
          <Text style={styles.subtitle}>You're successfully signed in</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email}</Text>
          
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{user?.uid}</Text>
          
          {user?.displayName && (
            <>
              <Text style={styles.label}>Display Name:</Text>
              <Text style={styles.value}>{user.displayName}</Text>
            </>
          )}
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Available Features:</Text>
          <Text style={styles.featureItem}>• User Authentication ✓</Text>
          <Text style={styles.featureItem}>• Firebase Integration ✓</Text>
          <Text style={styles.featureItem}>• Basic Navigation ✓</Text>
          <Text style={styles.featureItem}>• User Profile Management</Text>
          <Text style={styles.featureItem}>• Additional App Features</Text>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#666',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 6,
  },
  features: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 24,
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  signOutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;