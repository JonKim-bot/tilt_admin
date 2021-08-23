import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Main from "./layout/Main/Main";
import Games  from "./pages/Games/Games";
import GamesDashboard  from "./pages/Games/GamesDashboard";
import GameElement  from "./pages/Games/GameElement";
import GameLeaderboard  from "./pages/Games/GameLeaderboard";

import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Admin  from "./pages/Admin/Admin";

import ServerLog  from "./pages/Games/ServerLog";
import GameLog  from "./pages/Games/GameLog";
import GameVariable  from "./pages/Games/GameVariable";

import GamePlayers  from "./pages/Games/GamePlayers";

const hist = createBrowserHistory({
  basename: "tilt_admin"
});

const LoginTest = ()=>{
  let pass = false

  if(localStorage.getItem('token-tilt')){
    pass = true;

  }else{
    pass = false;
  }
  
  if(pass){
    return(
      <Switch>
        <Route exact path="/" render={(props) => (
              <Main {...props}></Main>
        )}></Route>
        <Route exact path="/games" render={(props) => (
                <Main {...props} >
                    <Games {...props}></Games>
                </Main>
            )} />
            <Route exact path="/games_dashboard" render={(props) => (
                <Main {...props} >
                    <GamesDashboard {...props}></GamesDashboard>
                </Main>
            )} />

            <Route exact path="/games_leaderboard" render={(props) => (
                <Main {...props} >
                    <GameLeaderboard {...props}></GameLeaderboard>
                </Main>
            )} />
            <Route exact path="/games_element" render={(props) => (
                <Main {...props} >
                    <GameElement {...props}></GameElement>
                </Main>
            )} />
             <Route exact path="/games_variable" render={(props) => (
                <Main {...props} >
                    <GameVariable {...props}></GameVariable>
                </Main>
            )} />
               <Route exact path="/server_log" render={(props) => (
                <Main {...props} >
                    <ServerLog {...props}></ServerLog>
                </Main>
            )} />
              <Route exact path="/games_players" render={(props) => (
                <Main {...props} >
                    <GamePlayers {...props}></GamePlayers>
                </Main>
            )} />
            
            <Route exact path="/game_log" render={(props) => (
                <Main {...props} >
                    <GameLog {...props}></GameLog>
                </Main>
            )} />
                <Route exact path="/admin" render={(props) => (
                <Main {...props} >
                    <Admin {...props}></Admin>
                </Main>
            )} />
      </Switch>
    ) 
  }else{
    return (
      <Switch>
            
            <Route exact path="/login" render={(props)=>(
                <Login {...props}></Login>
            )} />
            
            <Route exact path="/register" render={(props)=>(
                <Register {...props}></Register>
            )} />
        <Redirect from="/" to="/login" />    
      </Switch>
    )
  }  
}

ReactDOM.render(
  <Router basename={'/tilt_admin'} history={hist}>
    <LoginTest/>
  </Router>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
