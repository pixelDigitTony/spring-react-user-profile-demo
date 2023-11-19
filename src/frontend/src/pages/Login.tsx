import './css/Login.css';
import {Button, Form, Modal} from "antd";
import LoginApi from "../lib/LoginApi.tsx";
import stateModal from "../hooks/stateModal.tsx";
import {useNavigate} from "react-router-dom";

interface RegisterCred {
    username: string;
    password: string;
}

const Login = () => {
    const {isOpen, isVisible} = stateModal();
    const navigate = useNavigate();

    const handleLogin = async (formData: any) => {
        try {
            const response = await LoginApi.login(formData);
            // Handle the response, such as showing a success message or navigating to another page
            if(response === 404) {
                alert("Login failed")
                return;
            }

            sessionStorage.setItem('user', JSON.stringify(response));
            navigate('/home', {replace: true})
        } catch (error) {
            // Handle errors, such as displaying an error message
            console.error('Login Failed:', error);
        }
    };

    const handleRegister = async (formData: RegisterCred) => {
        try {
            const userReg = {
                "username": formData.username,
                "password": formData.password,
            }
            const response = await LoginApi.register(userReg);
            if(response === 404) {
                alert("Login Failed")
                return;
            }
            // Handle the response, such as showing a success message or navigating to another page
            console.log('Login Successful:', response);
            sessionStorage.setItem('user', JSON.stringify(response));
            navigate('/home', {replace: true})
        } catch (error) {
            // Handle errors, such as displaying an error message
            console.error('Login Failed:', error);
        }
    }

    return (
            <>
                <Modal open={isOpen}
                       aria-labelledby="modal-modal-title"
                       aria-describedby="modal-modal-description"
                       className={"modal"}
                       title={"Register"}
                >
                    <div>
                        <Form title={"Register"} onFinish={handleRegister}/>
                    </div>
                </Modal>
                <Form title={"Login"} onFinish={handleLogin}>
                    <Button className={"register"} onClick={isVisible} >
                        Sign-up
                    </Button>
                </Form>
            </>
    );
};

export default Login;