import {Route, BrowserRouter, Routes} from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/sign-up'
import Survey from './pages/survey'

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={ <Home />} />
                <Route path="/survey" element={ <Survey />} />
                <Route path="/login" element={ <Login />} />
                <Route path="/sign-up" element={<SignUp />}/>
            </Routes>
        </BrowserRouter>
    )
}