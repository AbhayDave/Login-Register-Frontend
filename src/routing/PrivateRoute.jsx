import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const authStatus = useSelector((state) => state.auth)


  if (!authStatus.status) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default PrivateRoute;