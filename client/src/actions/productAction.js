import axios from 'axios';
import { addProductFailure, addProductStart, addProductSuccess } from '../reducers/addProductReducer';

export const addProduct = (formData, id) => async (dispatch, getState) => {
    console.log(id);

    try {
        dispatch(addProductStart()); // Corrected dispatch invocation

        const { user: { user } } = getState();
        console.log(user);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        };

        const { data } = await axios.post(`/api/product/${id}`, { formData }, config);
        console.log(data);
        dispatch(addProductSuccess(data));
    } catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            console.error('Server Error Message:', errorMessage);
            dispatch(addProductFailure(errorMessage));
        } else {
            console.error('Generic Error');
            dispatch(addProductFailure("Something went wrong"));
        }
    }
};

export const findProductSellers = (type) => async (dispatch, getState) => {
    console.log(type, "fomr kajf")
    try {
        // dispatch(addProductStart()); // Corrected dispatch invocation

        const { user: { user } } = getState();
        console.log(user);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        };

        const { data } = await axios.get(`/api/product/sellers?type=${type}`, { type }, config);
        console.log(data);
        return data;
        // dispatch(addProductSuccess(data));
    } catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            console.error('Server Error Message:', errorMessage);
            // dispatch(addProductFailure(errorMessage));
        } else {
            console.error('Generic Error');
            // dispatch(addProductFailure("Something went wrong"));
        }
    }
};


export const productPurchase = (formData) => async (dispatch, getState) => {
    try {
        // dispatch(addProductStart()); // Corrected dispatch invocation
        const { user: { user } } = getState();
        console.log(user);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        };

        const { data } = await axios.post('/api/product/purchase', { formData }, config);
        console.log(data);
        return data;
        // dispatch(addProductSuccess(data));
    } catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            console.error('Server Error Message:', errorMessage);
            // dispatch(addProductFailure(errorMessage));
        } else {
            console.error('Generic Error');
            // dispatch(addProductFailure("Something went wrong"));
        }
    }
};
export const myOrders = async (dispatch, getState) => {
    try {
        // dispatch(addProductStart()); // Corrected dispatch invocation
        const { user: { user } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        };

        const { data } = await axios.get('/api/product/myorders', config);
        console.log(data);
        return data;
        // dispatch(addProductSuccess(data));
    } catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            console.error('Server Error Message:', errorMessage);
            // dispatch(addProductFailure(errorMessage));
        } else {
            console.error('Generic Error');
            // dispatch(addProductFailure("Something went wrong"));
        }
    }
};
export const OrderUpdate = (id) => async (dispatch, getState) => {
    try {
        // dispatch(addProductStart()); // Corrected dispatch invocation
        const { user: { user } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        };
        console.log(config);
        const { data } = await axios.get(`/api/product/myorders/${id}`, config);
        console.log(data);
        return data;
        // dispatch(addProductSuccess(data));
    } catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            console.error('Server Error Message:', errorMessage);
            // dispatch(addProductFailure(errorMessage));
        } else {
            console.error('Generic Error');
            // dispatch(addProductFailure("Something went wrong"));
        }
    }
};
