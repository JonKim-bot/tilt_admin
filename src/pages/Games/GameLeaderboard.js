import React, { useState , useEffect } from "react";
import { Leaderboard,GameVariablesGetAll, activeGames } from "../../models/API/API";
import AddModal from './AddGameVariableModal';

import EditGameVariableModal from './EditGameVariableModal';
import { Link } from 'react-router-dom';


const GameLeaderboard = (props) => {
    const query = new URLSearchParams(props.location.search);
    const gameId = query.get('gameId')
    const [games, setGames] = React.useState([]);
    const [resource, setResource] = useState([])
    const tableHead = ["AccountId","DisplayName","Score"];

    React.useEffect(() => {
        let postParam = {
            SortOn: ["score"],
            Top: 10,
            Order: "asc",
            Offset: 1, 
            Around: 0,
            Target: 0, 
            // (from before)
            ShowItems: ["DisplayName"]             // (Hardcoded)
        
        }
        Leaderboard(gameId,postParam).then(res => {
            // console.log(res);
            setGames(res.Top);
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
                    <h1>GameLeaderboard</h1>

                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: 'flex-end',
                            width: "100%"
                        }}>
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
                                            <td>{row.AccountId}</td>
                                            <td>{row.DisplayName}</td>
                                            <td>{row.Score}</td>
                               
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
            <EditGameVariableModal
            resource={resource}
            gameId = {gameId}

            formData={editGameData}
            handleClose={handleClose}
        ></EditGameVariableModal>
        </section>

    );
};

export default GameLeaderboard;