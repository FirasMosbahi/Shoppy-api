import * as fs from 'fs';

export function convertImageToBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    return base64Image;
  } catch (error) {
    console.error('Error converting image to Base64:', error);
    return null;
  }
}
