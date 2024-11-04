import axios from 'axios';

    const API_URL = 'http://localhost:5000';

    export const login = async (email, password) => {
      try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
      } catch (error) {
        throw new Error('Login failed');
      }
    };

    export const fetchUpdates = async () => {
      try {
        const response = await axios.get(`${API_URL}/updates`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch updates');
      }
    };

    export const createUpdate = async (update) => {
      try {
        const response = await axios.post(`${API_URL}/updates`, update);
        return response.data;
      } catch (error) {
        throw new Error('Failed to create update');
      }
    };
