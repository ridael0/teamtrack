import { useSelector } from 'react-redux';
import type { RootState } from '@/state/store';
import { Navigate } from 'react-router-dom';

const App = () => {
  const status = useSelector((state: RootState) => state.auth.status);

  if(status === 'login'){
    return <Navigate to={'/dashboard'} />
  }
 
  return <Navigate to={'/login'} />
};

export default App;