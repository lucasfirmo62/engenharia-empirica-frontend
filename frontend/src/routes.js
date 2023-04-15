import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { Navigate } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/sign-up'
import Survey from './pages/survey'
import SurveyAfter from './pages/survey-after'

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');

    if (isAuthenticated) {
        return children
    }

    return <Navigate to="/login" />
}

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/survey" element={<PrivateRoute><Survey /></PrivateRoute>} />
                <Route path="/finalsurvey/:id" element={<PrivateRoute><SurveyAfter /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}