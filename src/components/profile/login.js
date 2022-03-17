import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import * as service from "../../services/auth-service";

export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()
    const login = () =>
        service.login(loginUser)
            .then((user) => navigate('/profile/mytuits'))
            .catch(e => alert(e));
    return (
        <div>
            <h1>Login</h1>
            <input className="mb-2 form-control"
                   placeholder="username"
                   onChange={(e) =>
                setLoginUser({...loginUser,
                    username: e.target.value})}/>
            <input className="mb-2 form-control"
                   placeholder="password"
                   onChange={(e) =>
                setLoginUser({...loginUser,
                    password: e.target.value})}/>
            <button className="btn btn-primary mb-5"
                    onClick={login}>
                Login</button>
            <br/>
            <h6>Don't have an account? Sign up <Link to="/signup">here!</Link></h6>
        </div>
    );
};
