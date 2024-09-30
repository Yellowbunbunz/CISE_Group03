import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here (e.g., authentication)
    console.log("Username input: ", username);
    console.log("Password input: ", password);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-item">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" 
            name="username" value={username} 
            onChange={(e) => setUsername(e.target.value) }
            required />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" 
          name="password" value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          required />
        </div>
        <div className="forgot-password">
          <Link href="#">Forgot Password?</Link>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <button className="back-button" onClick={() => router.push('/')}>
        Back to Home
      </button>
    </div>
  );
}
