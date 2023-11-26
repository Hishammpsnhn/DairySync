import axios from 'axios';
import { addProductFailure, addProductStart, addProductSuccess } from '../reducers/addProductReducer';

export const addProduct = (formData, id) => async (dispatch) => {
    dispatch(addProductStart)
    return async (dispatch, getState) => {
        try {
            const { user: { user } } = getState();
            console.log(user)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            const { data } = await axios.post(`/api/product/${id}`, { formData }, config);
           // dispatch(addProductSuccess(data))
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                console.error('Server Error Message:', errorMessage);
                dispatch(addProductFailure(errorMessage));
            } else {
                console.error('Generic Error');
                dispatch(addProductFailure("something went wrong"));

            }
        }
    }
};

