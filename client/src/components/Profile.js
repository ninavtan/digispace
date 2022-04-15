import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0();
  const { email } = user;

  return (
    <div>
      <div className="row align-items-center profile-header">
        
        <div className="col-md text-center text-md-left">
          <p className="lead text-muted">{email}</p>
        </div>
      </div>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Profile;