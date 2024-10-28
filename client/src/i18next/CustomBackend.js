import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); 

class CustomBackend {
  constructor(services, options = {}) {
    this.services = services;
    this.options = options;
  }

  async read(language, namespace, callback) {
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;

    // Ensure the API key is provided
    if (!apiKey) {
      console.error('Google Cloud API key is missing.');
      return callback(new Error('Google Cloud API key is missing.'), false);
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    // Prepare the translation request body
    const requestBody = {
      q: namespace, 
      target: language,
    };

    try {
      const response = await axios.post(url, requestBody);
      
      // Check if the response structure is as expected
      if (!response.data || !response.data.data || !response.data.data.translations) {
        throw new Error('Invalid response structure from translation API.');
      }

      const translations = response.data.data.translations;
      const result = {};

      // Process translations
      translations.forEach((translation) => {
        if (translation.input && translation.translatedText) {
          result[translation.input] = translation.translatedText; 
        } else {
          console.warn('Translation input or output is missing:', translation);
        }
      });

      callback(null, result); 
    } catch (error) {
      console.error('Translation API error:', error.message);
      callback(error, false);
    }
  }
}

export default CustomBackend;
