import axios from "axios";

const userAPI = {
    getAllUsers: async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL_BE}/api/get-all-users`);
        return res;
    },
    // Login: async(user) => {
    //     const res = await axios.post('/api/login', user)
    //     return res
    // },
    Login: async (user) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_URL_BE}/api/login`,
                user
            );
            if (res.status === 200) {
                // Request was successful
                return res;
            } else {
                // Request failed with an error status code
                throw new Error(
                    `Request failed with status code ${res.status}`
                );
            }
        } catch (error) {
            // Handle any errors that occurred during the request
            console.error(error);
        }
    },

    Regist: async (user) => {
        const res = await axios.post(`${process.env.REACT_APP_URL_BE}/api/regist`, user);
        return res;
    },

    Logout: async (accessToken) => {
        await axios.put(`${process.env.REACT_APP_URL_BE}/api/logout`, {
            headers: { token: `Bearer ${accessToken}` },
            withCredentials: true,
        });
    },
    EditUser: async (user) => {
        const res = await axios.put(`${process.env.REACT_APP_URL_BE}/api/edituser`, user);
        return res;
    },
};

export default userAPI;
