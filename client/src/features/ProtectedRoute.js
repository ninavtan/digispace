import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

class ProtectedRoute extends React.Component {

  render() {
      const Component = this.props.component;
      const isAuthenticated =  localStorage.getItem('Bearer');
      
      return isAuthenticated ? (
        <Outlet />
      ) : (
          <Navigate to={{ pathname: '/login' }} />
      );
  }
}

export default ProtectedRoute;