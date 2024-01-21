import axios from "axios";

const userAPI = {
    getAllUsers: async () => {
        const res = await axios.get("http://localhost:8081/api/get-all-users");
        console.log(res);
        return res;
    },
    // Login: async(user) => {
    //     const res = await axios.post('/api/login', user)
    //     return res
    // },
    Login: async (user) => {
        try {
            const res = await axios.post(
                "http://localhost:8081/api/login",
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
        const res = await axios.post(
            "http://localhost:8081/api/create-new-user",
            user
        );
        return res;
    },
    AddUserByAdmin: async (user) => {
        const res = await axios.post(
            "http://localhost:8081/api/create-new-user-admin",
            user
        );
        return res;
    },
    Logout: async (accessToken) => {
        // console.log(id)
        await axios.put("/api/logout", {
            headers: { token: `Bearer ${accessToken}` },
        });
    },
    EditUser: async (user) => {
        const res = await axios.put(
            "http://localhost:8081/api/edit-user",
            user
        );
        console.log(res);
        return res;
    },
};

export default userAPI;
