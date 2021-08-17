import React, { useState , useEffect } from "react";
import { loginWithEmail,GetPlayerDetails, activeGames } from "../../models/API/API";
import AddModal from './AddElementModal';

import EditElementModal from './EditElementModal';
import { Link } from 'react-router-dom';


const Games = (props) => {
    const query = new URLSearchParams(props.location.search);
    const gameId = query.get('gameId')
    const [games, setGames] = React.useState([]);
    const [resource, setResource] = useState([])
    const tableHead = ["AdminAccounts","Created","GameData","GameDescription","GameId","GameImages","GameLogo","GameName",'Last Login',''];

    React.useEffect(() => {
        GetPlayerDetails(gameId,{AccountId  : null}).then(res => {
            // console.log(res);
            // setGames(res.ActiveGames);
        });
    }, []);
    const handleClose = ()=>{
        
        setAddGame(false);
        setEditGameData()
        
    }
    const [editGameData, setEditGameData] = useState();

    const [GameId, setGameId] = useState(0)

    const [addGame, setAddGame] = useState(false);
    const [game, setGame] = useState([])

    function AddGame(GameId){
        setGameId(GameId)
        setAddGame(true)
    }
    return (
        

        <section class="users-list-wrapper">
            <div class="users-list-table">
                <div class="card">
                    <div class="card-body">
                    <h1>Game Players</h1>

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
                                            <button class="btn btn-primary" onClick={() => AddGame(props.GameId)}>Add</button>


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
              gameId = {gameId}
              handleClose={handleClose}

          ></AddModal>
            <EditElementModal
            resource={resource}

            formData={editGameData}
            handleClose={handleClose}
        ></EditElementModal>
        </section>

    );
};

export default Games;