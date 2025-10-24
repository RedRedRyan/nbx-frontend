import React, { useState } from 'react';

// Define the structure of account info
interface AccountInfo {
  username: string;
  hederaAccountId: string;
  hederaEVMAccount: string;
}

function HederaWallet() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      // 1. Send login request
      const loginResponse = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Login failed');
      }

      // 2. Fetch user info
      const userResponse = await fetch(`http://localhost:3000/users/${username}`);
      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error(userData.message || 'Failed to fetch user data');
      }

      setAccountInfo(userData);
    } catch (err) {
      setAccountInfo(null);
      // Type guard for error handling
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div
      style={{
        width: '300px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Hedera Login</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#2c73d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
      {error && (
        <p style={{ color: 'red', marginTop: '10px', fontSize: '0.9em' }}>
          {error}
        </p>
      )}
      {accountInfo && (
        <div style={{ marginTop: '20px', fontSize: '0.9em' }}>
          <h3 style={{ marginBottom: '5px' }}>Welcome, {accountInfo.username}</h3>
          <p><strong>Hedera ID:</strong> {accountInfo.hederaAccountId}</p>
          <p><strong>EVM:</strong> {accountInfo.hederaEVMAccount}</p>
        </div>
      )}
    </div>
  );
}

export default HederaWallet;