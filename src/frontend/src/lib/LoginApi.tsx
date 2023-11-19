import API from "./Api.tsx";

interface RegisterCred {
    username: string;
    password: string;
}

const LoginApi = {
    login: async function(formData: any) {
        try {
            // Handle the response, such as showing a success message or navigating to another page
            return await API.post('/v1/user/login/auth', {
                "username": formData.username,
                "password": formData.password,
            }).then((result) => {
                return result.data
            }).catch((error) => {
                if (error.response) {
                    return error.response.status;
                }
            })
        } catch (error) {
            // Handle errors, such as displaying an error message
            console.error('Login Failed:', error);
        }
    },
    register: async function(user: RegisterCred) {
        return  await API.post('/v1/user/register/create', user).then(() => {
            return API.post('/v1/user/login/auth', {
                "username": user.username,
                "password": user.password,
            }).then((result) => {
                return result.data
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.status);
                    return error.response.status;
                }
            });
        }).catch((error) => {
            if (error.response) {
                alert("Registration failed")
                console.log(error.response.status);
                return error.response.status;
            }
        });
    },
    logout: async function() {
        const response = await API.get('/v1/user/logout').then((result) => {
            return result
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.status);
                return error.response.status;
            }
        });
        return response.data
    },
    deleteUser: async function(userId: string) {
        return await API.delete('/v1/user/delete/'+ userId).then((result) => {
            return result.data
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.status);
                return error.response.status;
            }
        });
    },
};

export default LoginApi;