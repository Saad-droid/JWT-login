import React from 'react';
import { Link } from 'react-router-dom';

const FailedPage = () => {
  return (
    <div>
      <h2>Login Failed</h2>
      <Link to="/login">
        <button>Try Again</button>
      </Link>
    </div>
  );
};

export default FailedPage;
