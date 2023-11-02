import axios from "axios";

export const registerAnimal = async (formData,id) => {
    try {
        const { data } = await axios.post(`/api/animal/${id}`, {
            formData
        });
        console.log(data)
    } catch (error) {
        console.error('Error:', error);
    }
};