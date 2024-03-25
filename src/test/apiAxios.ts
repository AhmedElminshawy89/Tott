import axios from 'axios';

export const updateCityAxios = async (formData: { id: unknown; }) => {
    try {
        const response = await axios.post(`http://localhost:8001/api/admin/city/update/${formData.id}`, formData);
        return response.data; 
    } catch (error) {
        return;
    }
};