import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Register(){
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const registrationData = {
            username,
            password,
        };

        try {
            const response = await axios.post('https://speed-backend-1.vercel.app/users/register', registrationData);
            console.log('Registration successful', response.data);

            router.push('/login');
        }
        catch(error){
            console.error('Registration error:', error);
        }
    }

    return (
        <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-item">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <button className="back-to-login-button" onClick={() => router.push('/login')}>
          Back to Login
        </button>
      </div>
    );
}