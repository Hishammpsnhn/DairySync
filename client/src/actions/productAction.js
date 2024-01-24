import axios from 'axios';
import { ProductSuccessFetch, addProductFailure, addProductStart, addProductSuccess, deleteProduct, deleteProductStart } from '../reducers/addProductReducer';

export const addProduct = (formData, id) => async (dispatch, getState) => {

    try {
        dispatch(addProductStart()); // Corrected dispatch invocation

        const { user: { user } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        };

        const { data } = await axios.post(`/api/product/${id}`, { formData }, config);
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
        return data.data;
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
// export const getproduct = async (dispatch, getState) => {
//      dispatch(addProductStart());
//     try {
//         const { user: { user } } = getState();

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${user?.token}`,
//             },
//         };
//         console.log(config);
//         const { data } = await axios.get(`/api/product`, config);
   
//         dispatch(ProductSuccessFetch(data));
//     } catch (error) {
//         console.error('Error:', error);

//         if (error.response && error.response.data) {
//             const errorMessage = error.response.data.message;
//             console.error('Server Error Message:', errorMessage);
//              dispatch(addProductFailure(errorMessage));
//         } else {
//             console.error('Generic Error');
//             dispatch(addProductFailure("Something went wrong"));
//         }
//     }
// };
export const getproductById =  (id)=> async (dispatch, getState) => {
    console.log('Getting Product');
    dispatch(addProductStart());
   try {
       const { user: { user } } = getState();

       const config = {
           headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user?.token}`,
           },
       };
       console.log(config);
       const { data } = await axios.get(`/api/product/${id}`, config);
  console.log(data);
       dispatch(ProductSuccessFetch(data));
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
export const deleteSellerProduct = (userId,productId) => async (dispatch, getState) => {
    try {
        dispatch(addProductStart()); // Corrected dispatch invocation
        const { user: { user } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        };
        console.log(config);
        const { data } = await axios.delete(`/api/product/${userId}/${productId}`, config);
        console.log(data);
        dispatch(deleteProduct(data));
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