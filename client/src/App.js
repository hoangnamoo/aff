import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';
import Home from './pages/Home/Home';

function App() {
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
    ]);
    return <RouterProvider router={router} />;
}

export default App;
