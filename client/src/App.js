import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';
import Home from './pages/Home/Home';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfoByToken } from './store/authSlice';
import Withdraw from './pages/User/Withdraw';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            dispatch(getUserInfoByToken());
        }
    }, [dispatch]);
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/signup',
            element: <Signup />,
        },
        {
            path: '/login',
            element: <Login />,
            loader: Login.loader,
        },
        {
            path: '/withdraw',
            element: <Withdraw />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
