import axios from 'axios';

export const addProduct = (formData, id) => {
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
            console.log(data);

            // Dispatch a success action, e.g., dispatch(addProductSuccess(data));
        } catch (error) {
            console.error('Error:', error);

            // Dispatch an error action, e.g., dispatch(addProductError(error));
        }
    };
};
