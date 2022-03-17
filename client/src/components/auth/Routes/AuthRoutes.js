import React from "react";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AuthorizationContext  = React.createContext();

const Routes = () => {
  const token = localStorage.getItem('token');

  // conditionally route based on the token value

  return (
    <AuthorizationContext.Provider value={token}>
      {!!token ? <PrivateRoutes /> : <PublicRoutes />}
    </AuthorizationContext.Provider>
  )
}

export default Routes;