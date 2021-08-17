import React, { useState , useEffect } from "react";
import { loginWithEmail, activeGames ,CreateTiltDB, CreateRemoteDB } from "../../models/API/API";
import AddModal from './AddModal';
import EditGameModal from './EditModal';

import { Link } from 'react-router-dom';


const Admin = (props) => {
    const [gameId, setGameId] = useState(0)

    const [games, setGames] = React.useState([]);
    const [resource, setResource] = useState([])
    const tableHead = ["AdminAccounts",'Created DB','Button',"Created","GameData","GameDescription","GameId","GameImages","GameLogo","GameName",'Last Login',''];

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
    return (
        

        <section class="users-list-wrapper">
            <div class="users-list-table">
                <div class="card">
                    <div class="card-body">
                    <h1>Admin</h1>

                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: 'flex-end',
                            width: "100%"
                        }}>
                            <button class="btn btn-primary" onClick={() => setAddGame(true)}>Add</button>
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
                                            <button class="btn btn-primary" onClick={() => CreateTiltDB(row.GameId)}>Created DB Tilt</button>
                                            <button class="btn btn-primary" onClick={() => CreateRemoteDB(row.GameId)}>Created DB Remote</button>

                                            </td>
                                            <td>
                                            <button class="btn btn-primary" onClick={() => DbConfig(row.GameId)}>DB Connection</button>
                                            {/* <button class="btn btn-warning" onClick={() => CreateRemoteDB(row.GameId)}>Created DB</button> */}

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
                                            <button class="btn btn-primary">
                                                  <Link to={"/games_dashboard/?gameId=" + row.GameId}>
                                                    <p>Games</p>
                                                </Link>


                                            </button>
                                            <button class="btn btn-primary" onClick={() => setAddGame(true)}>Add</button>


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

         
            <EditGameModal
            resource={resource}
            formData={editGameData}
            handleClose={handleClose}
        ></EditGameModal>
        </section>

    );
};

export default Admin;