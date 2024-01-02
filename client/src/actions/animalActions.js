import axios from "axios";
import {  fetchAnimalListStart, fetchAnimalListSuccess,fetchAnimalListFailure } from "../reducers/animalListReducer";

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
       console.log("error");
        if (error.response && error.response.data) {
            console.log("error");
            const errorMessage = error.response.data.message;
            if(errorMessage){
                console.log("error");
             console.error('Server Error Message:', errorMessage);
            dispatch(fetchAnimalListFailure(errorMessage))
            }else{
                console.log("error");
             console.error('Network issue:', errorMessage);
            dispatch(fetchAnimalListFailure("somthing wrong in Network"))
            }
          } else {
            console.log("error");
            console.error('Generic Error');
            dispatch(fetchAnimalListFailure("Something went wrong"))
          }
    }
}

export const registerAnimal = async (formData, id) => {
    try {
        const { data } = await axios.post(`/api/animal/${id}`, {
            formData
        });
    } catch (error) {
        console.error('Error:', error);
    }
};