import axios from 'axios';

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post('/api/users/login', {
      email,
      password,
    });
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
export const registerUser = async ({ email, password,userName,contact }) => {
  try {
    const { data } = await axios.post('/api/users', {
      email,
      password,
      userName,
      contact
    });
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const registerSeller = async (data) => {
    //password !!!
    
//   try {
//     const { data } = await axios.post('/api/users', {
//       email,
//       password,
//       userName,
//       contact
//     });
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
};
