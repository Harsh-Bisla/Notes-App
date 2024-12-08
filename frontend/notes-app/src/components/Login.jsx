import React, { useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Loader from './Loader';

function Login() {
    const navigate = useNavigate();
    const baseUrl = "http://localhost:3000/api";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, seterr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const { alert, loading, setLoading } = useOutletContext();

    const handleLogin = (e) => {
        e.preventDefault();
        const loginDetails = {
            email,
            password
        }
        setLoading(true);
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginDetails)
        })
            .then((res) => {
                res.json().then((data) => {
                    localStorage.setItem("token",data.token);
                    setLoading(false);
                    if (data.success) {
                        navigate("/")
                    }
                    else {
                        seterr(true);
                        setErrMsg(data.msg);
                        setTimeout(() => {
                            seterr(false)
                        }, 2000);
                    }
                })
            })
    }

    return (
        <>
            {loading && <Loader />}
            <div className='login-form-container'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
                    <div className='pasword-container'>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
                        <IoEyeOutline id='eye-icon' size={22} color='grey' />
                    </div>
                    {err && <p id='err-msg'>{errMsg}</p>}
                    <button type='submit' className='login-btn'>Login</button>
                    <p id='not-registered'>Not registered yet? <Link to='/signup'>Create an account</Link></p>
                </form>
            </div>
        </>
    )
}

export default Login