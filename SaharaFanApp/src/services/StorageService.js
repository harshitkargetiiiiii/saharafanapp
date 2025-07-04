import { storage } from '../firebase';

class StorageService {
  // Upload file to Firebase Storage
  async uploadFile(filePath, fileName, folder = 'uploads') {
    try {
      const reference = storage().ref(`${folder}/${fileName}`);
      const task = reference.putFile(filePath);
      
      // Monitor upload progress
      task.on('state_changed', taskSnapshot => {
        const progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      });

      await task;
      const downloadURL = await reference.getDownloadURL();
      return { success: true, downloadURL, fileName };
    } catch (error) {
      throw error;
    }
  }

  // Upload file with progress callback
  async uploadFileWithProgress(filePath, fileName, folder = 'uploads', onProgress) {
    try {
      const reference = storage().ref(`${folder}/${fileName}`);
      const task = reference.putFile(filePath);
      
      // Monitor upload progress
      task.on('state_changed', taskSnapshot => {
        const progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(progress);
        }
      });

      await task;
      const downloadURL = await reference.getDownloadURL();
      return { success: true, downloadURL, fileName };
    } catch (error) {
      throw error;
    }
  }

  // Download file from Firebase Storage
  async downloadFile(fileName, folder = 'uploads', localPath) {
    try {
      const reference = storage().ref(`${folder}/${fileName}`);
      await reference.writeToFile(localPath);
      return { success: true, localPath };
    } catch (error) {
      throw error;
    }
  }

  // Get download URL for a file
  async getDownloadURL(fileName, folder = 'uploads') {
    try {
      const reference = storage().ref(`${folder}/${fileName}`);
      const downloadURL = await reference.getDownloadURL();
      return downloadURL;
    } catch (error) {
      throw error;
    }
  }

  // Delete file from Firebase Storage
  async deleteFile(fileName, folder = 'uploads') {
    try {
      const reference = storage().ref(`${folder}/${fileName}`);
      await reference.delete();
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  // List files in a folder
  async listFiles(folder = 'uploads') {
    try {
      const reference = storage().ref(folder);
      const result = await reference.listAll();
      
      const files = await Promise.all(
        result.items.map(async (item) => {
          const downloadURL = await item.getDownloadURL();
          const metadata = await item.getMetadata();
          return {
            name: item.name,
            fullPath: item.fullPath,
            downloadURL,
            size: metadata.size,
            contentType: metadata.contentType,
            timeCreated: metadata.timeCreated,
          };
        })
      );
      
      return files;
    } catch (error) {
      throw error;
    }
  }

  // Get file metadata
  async getFileMetadata(fileName, folder = 'uploads') {
    try {
      const reference = storage().ref(`${folder}/${fileName}`);
      const metadata = await reference.getMetadata();
      return metadata;
    } catch (error) {
      throw error;
    }
  }

  // Update file metadata
  async updateFileMetadata(fileName, folder = 'uploads', newMetadata) {
    try {
      const reference = storage().ref(`${folder}/${fileName}`);
      await reference.updateMetadata(newMetadata);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

export default new StorageService(); 