import React from 'react';
import './Homepage.css';
import homemapperLogo from '../images/Hopemapper_big_logo.png';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div
      className="Homepage"
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        background: '#f5f6fa'
      }}
    >
      {/* Left 3/4: Centered Title */}
      <div
        style={{
          flex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#F1EFEF'
        }}
      >
        <img src={homemapperLogo} alt="Logo" style={{ width: '100px', height: '100px' }} />
        <h1 style={{ fontSize: '3rem', color: '#759a96', textAlign: 'center' }}>
          HopeMapper
        </h1>
      </div>
      {/* Right 1/4: Login Portal */}
      <div
        style={{
          flex: 1,
          background: '#759a96',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '80%',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            background: '#fafbfc'
          }}
        >
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '.5rem' }}>
                Username
              </label>
              <input
                id="username"
                type="text"
                style={{
                  width: '100%',
                  padding: '.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '.5rem' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                style={{
                  width: '100%',
                  padding: '.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '.75rem',
                borderRadius: '4px',
                border: 'none',
                background: '#c8d9d3',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Homepage;