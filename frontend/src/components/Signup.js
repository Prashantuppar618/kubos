import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', form);
            alert(res.data.message);
        } catch (err) {
            alert(err.response.data.error || "Something went wrong");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
                <input type="email" placeholder="Email" required onChange={e => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" required onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
