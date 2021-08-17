import React, { useState , useEffect } from "react";
import { loginWithEmail, activeGames ,CreateTiltDB, CreateRemoteDB } from "../../models/API/API";
import AddModal from './AddModal';
import EditGameModal from './EditModal';
import DbConnectionModal from './DbConnectionModal';

import { Link } from 'react-router-dom';


const Games = (props) => {
    const [gameId, setGameId] = useState(0)

    const [games, setGames] = React.useState([]);
    const [resource, setResource] = useState([])
    const tableHead = ["AdminAccounts",'Game Element','Logs','Global var','Players',"Created","GameData","GameDescription","GameId","GameImages","GameLogo","GameName",'Last Login'];

    React.useEffect(() => {
        activeGames().then(res => {
            console.log(res);
            setGames(res.ActiveGames);
        });
    }, []);
    const handleClose = ()=>{
        setDbConfig(false)

        setAddGame(false);
        setEditGameData()
        
    }
    const [editGameData, setEditGameData] = useState();


    const [addGame, setAddGame] = useState(false);
    const [game, setGame] = useState([])
    const [dbConfig,setDbConfig] = useState(false)

    function DbConfig(GameId){
        setGameId(GameId)
        setDbConfig(true)
    }

    function GameDashBoard(GameId){
        window.location.href = "/games_dashboard/?gameId=" + GameId;
    }
    
    return (
        

        <section class="users-list-wrapper">
            <div class="users-list-table">
                <div class="card">
                    <div class="card-body">
                    <h1>Games</h1>

                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: 'flex-end',
                            width: "100%"
                        }}>
                            {/* <button class="btn btn-primary" onClick={() => setAddGame(true)}>Add</button> */}
                        </div>
                        <div class="table-responsive">
                            <table id="users-list-datatable" class="table">
                                <thead>
                                    <tr>
                                    {tableHead.map((prop, key) => {
                                        return (
                                            <th
                                                key={prop+key}
                                            >
                                                {prop}
                                            </th>
                                        );
                                    })}
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.map((row) => (
                                        <tr>
                                            <td>{row.AdminAccounts}</td>
                                          
                                            <td>
                                                <button class="btn btn-primary" onClick={() => GameDashBoard(row.GameId)}>Game Dashboard</button>

                                            </td>
                                            <td>
                                                <button class="btn btn-primary" onClick={() => window.location.href = "/games_element/?gameId=" + row.GameId}>Game Element</button>

                                            </td>
                                            <td>
                                                <button class="btn btn-primary" onClick={() => window.location.href = "/game_log/?gameId=" + row.GameId}>Game Logs</button>
                                                <hr></hr>
                                                <button class="btn btn-primary" onClick={() => window.location.href = "/server_log/?gameId=" + row.GameId}>Server Logs</button>

                                            </td>
                                            <td>
                                                <button class="btn btn-primary" onClick={() => window.location.href = "/games_variable/?gameId=" + row.GameId}>Game Variable</button>

                                            </td>
                                            <td>
                                                <button class="btn btn-primary" onClick={() => window.location.href = "/games_players/?gameId=" + row.GameId}>Game Players</button>

                                            </td>
                                            <td>{row.Created}</td>
                                            <td>{row.GameData}</td>
                                            <td>{row.GameDescription}</td>
                                            
                                            <td>{row.GameId}</td>

                                            <td>{row.GameImages}</td>
                                            <td>{row.GameLogo}</td>
                                            <td>{row.GameName}</td>
                                            <td>{row.LastLogin}</td>
                                            <td>
                                           
                                               {/* <button class="btn btn-primary" onClick={() => setAddGame(true)}>Add</button> */}

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddModal
              open={addGame}
              resource={resource}
              handleClose={handleClose}

          ></AddModal>

            <DbConnectionModal
              open={dbConfig}
              GameId = {gameId}
              handleClose={handleClose}

          ></DbConnectionModal>
            <EditGameModal
            resource={resource}
            formData={editGameData}
            handleClose={handleClose}
        ></EditGameModal>
        </section>

    );
};

export default Games;