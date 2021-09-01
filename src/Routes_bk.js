import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./layout/Main/Main";
import Games  from "./pages/Games/Games";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Admin  from "./pages/Admin/Admin";

const Routes = () => {

    return (<>
        <Router>

            <Route exact path="/" render={(props) => (
                <Main {...props}></Main>
            )}></Route>

            <Route exact path="/games" render={(props) => (
                <Main {...props} >
                    <Games {...props}></Games>
                </Main>
            )} />

            <Route exact path="/admin" render={(props) => (
                <Main {...props} >
                    <Admin {...props}></Admin>
                </Main>
            )} />

            <Route exact path="/login" render={(props)=>(
                <Login {...props}></Login>
            )} />

            <Route exact path="/register" render={(props)=>(
                <Register {...props}></Register>
            )} />
        </Router>
    </>)
};

export default Routes;