import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./layout/Main/Main";
import Games  from "./pages/Games/Games";
import Login from "./pages/Login/Login";

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

            <Route exact path="/login" render={(props)=>(
                <Login {...props}></Login>
            )} />
        </Router>
    </>)
};

export default Routes;