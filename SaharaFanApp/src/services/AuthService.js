import { auth } from '../firebase';

class AuthService {
  // Sign up with email and password
  async signUp(email, password) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Sign out
  async signOut() {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  }

  // Get current user
  getCurrentUser() {
    return auth().currentUser;
  }

  // Listen to authentication state changes
  onAuthStateChanged(callback) {
    return auth().onAuthStateChanged(callback);
  }

  // Send password reset email
  async sendPasswordResetEmail(email) {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService(); 