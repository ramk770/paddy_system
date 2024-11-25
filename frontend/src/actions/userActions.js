import localhost from '../localhost';
import {
    loginFail,
    loginRequest, 
    loginSuccess, 
    clearError,
    registerFail,
    registerRequest,
    registerSuccess,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from '../slices/authSlice';

import {
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail

} from '../slices/userSlice'
import axios from 'axios';

// userActions.js
// export const login = (email, password) => async (dispatch) => {
//     try {
//         dispatch(loginRequest());
//         const { data } = await axios.post(`${localhost}/api/v1/login`, { email, password });
//         dispatch(loginSuccess(data));
//     } catch (error) {
//         dispatch(loginFail(error.response?.data?.message || "An error occurred"));
//     }
// };
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await axios.post(`${localhost}/api/v1/login`, { email, password });

        // Store the token in local storage
        localStorage.setItem("token", data.token);
        console.log(data.token,"hello token give the token");

        dispatch(loginSuccess(data));
    } catch (error) {
       console.log("hello error login token")
        dispatch(loginFail(error.response?.data?.message || "An error occurred"));
    }
};

export const clearAuthError = () => (dispatch) => {
    dispatch(clearError());
};
        

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.post(`${localhost}/api/v1/register`,userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }

}

export const loadUser =  async (dispatch) => {

    try {
        dispatch(loadUserRequest())
       

        const { data }  = await axios.get(`${localhost}/api/v1/myprofile`);
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }

}

export const logout =  async (dispatch) => {

    try {
        await axios.get(`${localhost}/api/v1/logout`);
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail)
    }

}

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.put(`${localhost}/api/v1/update`,userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }

}

export const updatePassword = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.put(`${localhost}/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }

}

export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`${localhost}/api/v1/password/forgot`, formData, config);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }

}

export const resetPassword = (formData, token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`${localhost}/api/v1/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }

}
//commanded mistake like
export const getUsers = async (dispatch) => {
    try {
        dispatch(usersRequest());

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Set the Authorization header with the token
        const config = {
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        };

        // Make the API request with the Authorization header
        const { data } = await axios.get(`${localhost}/api/v1/admin/users`, config);

        dispatch(usersSuccess(data));
    } catch (error) {
        dispatch(usersFail(error.response?.data?.message || "An error occurred"));
    }
};
// export const getUsers =  async (dispatch) => {

//     try {
//         dispatch(usersRequest())
//         const { data }  = await axios.get(`${localhost}/api/v1/admin/users`);
//         dispatch(usersSuccess(data))
//     } catch (error) {
//         dispatch(usersFail(error.response.data.message))
//     }

// }
export const getUser = id => async (dispatch) => {
    try {
        dispatch(userRequest());

        // Get the token from localStorage
        const token = localStorage.getItem('token');
        console.log("Retrieved token:", token);
        
        // Set the token in the headers
        const config = {
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        };
        console.log("Headers:", config.headers);

        // Fetch the user data using the token
        const { data } = await axios.get(`${localhost}/api/v1/admin/user/${id}`, config);
        dispatch(userSuccess(data));
    } catch (error) {
         console.log("resorce nto get the all the user data");
        dispatch(userFail(error.response?.data?.message || "An error occurred"));
    }
};

// export const getUser = id => async (dispatch) => {

//     try {
//         dispatch(userRequest())
//         const { data }  = await axios.get(`${localhost}/api/v1/admin/user/${id}`);
//         dispatch(userSuccess(data))
//     } catch (error) {
//         dispatch(userFail(error.response.data.message))
//     }

// }

// export const deleteUser = id => async (dispatch) => {

//     try {
//         dispatch(deleteUserRequest())
//         await axios.delete(`${localhost}/api/v1/admin/user/${id}`);
//         dispatch(deleteUserSuccess())
//     } catch (error) {
//         dispatch(deleteUserFail(error.response.data.message))
//     }

// }
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(deleteUserRequest());

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Set the Authorization header with the token
        const config = {
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        };

        // Make the DELETE request with the Authorization header
        await axios.delete(`${localhost}/api/v1/admin/user/${id}`, config);

        dispatch(deleteUserSuccess());
    } catch (error) {
        dispatch(deleteUserFail(error.response?.data?.message || "An error occurred"));
    }
};

export const updateUser = (id, formData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest());

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Set the Authorization header with the token
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            }
        };

        // Make the PUT request with the Authorization header
        await axios.put(`${localhost}/api/v1/admin/user/${id}`, formData, config);

        dispatch(updateUserSuccess());
    } catch (error) {
        dispatch(updateUserFail(error.response?.data?.message || "An error occurred"));
    }
};