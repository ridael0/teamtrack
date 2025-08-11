import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import NotFoundPage from './components/notFoundPage';
import Dashboard from '@/pages/dashboard';
import Login from '@/pages/login';
import Register from '@/pages/register';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <NotFoundPage/>,
    },
    {
        path: '/login',
        element: <Login/>,
    
    },
    {
        path: '/register',
        element: <Register/>,
    
    },
    {
        path: '/dashboard',
        element: <Dashboard/>
    }
]);

export default Router;