import LoginBody from "./body/LoginBody";
import LoginHeader from "./header/LoginHeader";
import './LoginPage.scss';

const LoginPage = () => {
    
    return (
        <div className="loginPage">
            <LoginHeader />
            <LoginBody />
        </div>
    );
};

export default LoginPage;