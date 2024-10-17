import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  sub: string;
  exp: number,
}

export default function Home() {

  // Check if a user has logged in and as a result, has been redirected to the homepage.
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {

      try{
        const decoded: DecodedToken = jwtDecode(token);
        setUsername(decoded.username);

      }
      catch(error){
        console.log('Invalid token:', error);
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUsername(null);
    router.push('/');
  }

    return (
      <div className="container">
        <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
        {username ? (
          <>
            <p>Logged in as: {username}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>Login to access your account, or browse anonymously.</p>
        )}
      </div>
    );
  }
  