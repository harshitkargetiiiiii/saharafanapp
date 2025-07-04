import { firestore } from '../firebase';

class FirestoreService {
  // Create a document
  async createDocument(collectionName, documentId, data) {
    try {
      await firestore().collection(collectionName).doc(documentId).set(data);
      return { success: true, id: documentId };
    } catch (error) {
      throw error;
    }
  }

  // Add a document with auto-generated ID
  async addDocument(collectionName, data) {
    try {
      const docRef = await firestore().collection(collectionName).add(data);
      return { success: true, id: docRef.id };
    } catch (error) {
      throw error;
    }
  }

  // Get a document
  async getDocument(collectionName, documentId) {
    try {
      const doc = await firestore().collection(collectionName).doc(documentId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Get all documents from a collection
  async getCollection(collectionName) {
    try {
      const querySnapshot = await firestore().collection(collectionName).get();
      const documents = [];
      querySnapshot.forEach(doc => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      throw error;
    }
  }

  // Update a document
  async updateDocument(collectionName, documentId, data) {
    try {
      await firestore().collection(collectionName).doc(documentId).update(data);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  // Delete a document
  async deleteDocument(collectionName, documentId) {
    try {
      await firestore().collection(collectionName).doc(documentId).delete();
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  // Listen to document changes
  onDocumentSnapshot(collectionName, documentId, callback) {
    return firestore()
      .collection(collectionName)
      .doc(documentId)
      .onSnapshot(callback);
  }

  // Listen to collection changes
  onCollectionSnapshot(collectionName, callback) {
    return firestore()
      .collection(collectionName)
      .onSnapshot(callback);
  }

  // Query documents with conditions
  async queryDocuments(collectionName, field, operator, value) {
    try {
      const querySnapshot = await firestore()
        .collection(collectionName)
        .where(field, operator, value)
        .get();
      
      const documents = [];
      querySnapshot.forEach(doc => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      throw error;
    }
  }
}

export default new FirestoreService(); 