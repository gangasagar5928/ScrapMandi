import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

/**
 * Client-Side Image Compression using HTML5 Canvas
 * Resizes large phone camera photos (5-10MB) down to optimized JPEG (~150-250KB)
 * @param {File} file - Original raw image file from file picker
 * @param {number} maxWidth - Maximum width (default: 1200px)
 * @param {number} maxHeight - Maximum height (default: 1200px)
 * @param {number} quality - JPEG compression quality 0.0 to 1.0 (default: 0.8)
 * @returns {Promise<{ blob: Blob, dataUrl: string, originalSize: number, compressedSize: number }>}
 */
export const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      return reject(new Error("Selected file is not an image"));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error("Canvas compression error"));
            }

            const dataUrl = canvas.toDataURL("image/jpeg", quality);
            resolve({
              blob,
              dataUrl,
              originalSize: file.size,
              compressedSize: blob.size,
              fileName: file.name.replace(/\.[^/.]+$/, "") + ".jpg"
            });
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
};

/**
 * Upload compressed image blob to Firebase Storage
 * @param {Blob} blob - Compressed image blob
 * @param {string} fileName - Destination filename
 * @returns {Promise<string>} Download URL
 */
export const uploadListingPhoto = async (blob, fileName = `lot_${Date.now()}.jpg`) => {
  try {
    const storageRef = ref(storage, `listing_photos/${Date.now()}_${fileName}`);
    const snapshot = await uploadBytes(storageRef, blob, {
      contentType: "image/jpeg",
      customMetadata: {
        compressed: "true",
        app: "ScrapMandi"
      }
    });

    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.warn("Firebase Storage upload note (using compressed client preview dataUrl):", error.message);
    throw error;
  }
};
