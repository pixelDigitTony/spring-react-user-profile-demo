import './css/Login.css';
import {Button, Checkbox, Form, Input, Modal} from "antd";
import LoginApi from "../lib/LoginApi.tsx";
import stateModal from "../hooks/stateModal.tsx";
import {useNavigate} from "react-router-dom";
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib/icons";

interface LoginCred {
    id: string;
    username: string;
    password: string;
}

interface RegisterCred {
    username: string;
    password: string;
}

const Login = () => {
    const {isOpen, isVisible, isClosed} = stateModal();
    const navigate = useNavigate();

    const handleLogin = async (formData: LoginCred) => {
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
            isClosed();
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
                       maskClosable={false}
                       centered={true}
                       cancelText={"Back"}
                       footer={null}
                >
                    <div>
                        <Form title={"Register"} onFinish={handleRegister}>
                            <Form.Item  name="username">
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" type="text" name="username" id="username" />
                            </Form.Item>
                            <Form.Item  name="email">
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" type="email"  name="email" id="email" />
                            </Form.Item>
                            <Form.Item  name="password">
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    name="password" id="password"
                                />
                            </Form.Item>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button className={"register"} onClick={isClosed}>
                                    Cancel
                                </Button>
                                <Button className={"register"} htmlType={"submit"} >
                                    Register
                                </Button>
                            </div>

                        </Form>
                    </div>
                </Modal>
                <Form
                    title={"Login"}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={handleLogin}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className={'formItem'}>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item className={'formItem'}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a onClick={isVisible}>register now!</a>
                    </Form.Item>
                </Form>
            </>
    );
};

export default Login;