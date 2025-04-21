import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', form);
            alert(res.data.message);
        } catch (err) {
            alert(err.response.data.error || "Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" required onChange={e => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" required onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
