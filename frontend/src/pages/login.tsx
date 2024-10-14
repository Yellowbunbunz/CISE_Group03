import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // send login data to backend
    const loginData = {
      username,
      password
    }

    try{
      const response = await axios.post("http://localhost:8082/users/login", loginData);

      const login_token = response.data;
      console.log(login_token);

      localStorage.setItem('authToken', response.data.token);

      router.push('/')
      
      // send successful login message.
      // reload webpage but in user personalised mode.
    } catch (error) {
       console.log('Login error: ', error);
    }

  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-item">
          <label htmlFor="username">Username</label>
          <input type="text" id="login-username" 
            name="username" value={username} 
            onChange={(e) => setUsername(e.target.value) }
            required />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input type="password" id="login-password" 
          name="password" value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          required />
        </div>
        <div className="forgot-password">
          <Link href="/register">Not a user? Sign up here!</Link>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <button className="back-button" onClick={() => router.push('/')}>
        Back to Home
      </button>
    </div>
  );
}
