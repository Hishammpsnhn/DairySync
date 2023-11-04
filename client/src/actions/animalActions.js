import axios from "axios";
import { fetchAnimalListFailure, fetchAnimalListStart, fetchAnimalListSuccess } from "../reducers/animalListReducer";

export const animalList = async (dispatch,getState) => {
    dispatch(fetchAnimalListStart)
    try {
        const { user: { user } } = getState();
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const {data} = await axios.get(`/api/animal/${user._id}`,config);
        dispatch(fetchAnimalListSuccess(data))
    } catch (error) {
        dispatch(fetchAnimalListFailure(error))
        console.log("Error getting",error)
    }
}

export const registerAnimal = async (formData, id) => {
    try {
        const { data } = await axios.post(`/api/animal/${id}`, {
            formData
        });
        console.log(data)
    } catch (error) {
        console.error('Error:', error);
    }
};