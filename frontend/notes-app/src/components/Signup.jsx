import React, { useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Loader from './Loader';


function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, seterr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const { alert, loading, setLoading , baseUrl} = useOutletContext();

    const signup = (e) => {
        e.preventDefault();
        const signupDetails = {
            name,
            email,
            password
        }
        setLoading(true);
        fetch(`${baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupDetails)
        }).then((res) => {
            res.json().then((data) => {
                setLoading(false);
                if (data.success) {
                    alert(data.msg);
                    navigate('/login');
                }
                else {
                    seterr(true);
                    setErrMsg(data.msg)
                    setTimeout(() => {
                        seterr(false);
                    }, 2000);
                }
            })
        })
    }

    return (
        <>
            {loading && <Loader />}
            <div className='login-form-container'>
                <form onSubmit={signup}>
                    <h1>Signup</h1>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Username' />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
                    <div className='pasword-container'>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
                        <IoEyeOutline id='eye-icon' size={22} color='grey' />
                    </div>
                    {err && <p id='err-msg'>{errMsg}</p>}
                    <button type='submit' className='login-btn'>Create Account</button>
                    <p id='not-registered'>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        </>
    )
}

export default Signup