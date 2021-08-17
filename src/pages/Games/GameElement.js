import React, { useState , useEffect } from "react";
import { loginWithEmail,GameElementGetAll, DeleteElement } from "../../models/API/API";
import AddModal from './AddElementModal';

import EditElementModal from './EditElementModal';
import { Link } from 'react-router-dom';


const Games = (props) => {
    const query = new URLSearchParams(props.location.search);
    const gameId = query.get('gameId')
    const [games, setGames] = React.useState([]);
    const [resource, setResource] = useState([])
    const tableHead = ["Category",'DataDump','DefaultValue','Description','Item code','Name',''];

    React.useEffect(() => {
        GameElementGetAll(gameId).then(res => {
        //     console.log(res);
            setGames(res.Data);
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
    async function delete_method(ItemCode){
        let res =await  DeleteElement(gameId,{ItemCode : ItemCode});
        if(res){
            window.location.reload();
        }
    }
    return (
        

        <section class="users-list-wrapper">
            <div class="users-list-table">
                <div class="card">
                    <div class="card-body">
                    <h1>Game Elements</h1>

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
                                            <td>{row.Category}</td>
                                            <td>{row.DataDump}</td>
                                            <td>{row.DefaultValue}</td>
                                            <td>{row.Description}</td>
                                            <td>{row.ItemCode   }</td>

                                            <td>{row.Name}</td>
                                      
                                            <td>
                                    
                                                  <button class="btn btn-primary" onClick={() => setEditGameData(games.find(arr=>arr.ItemCode == row.ItemCode))}>Edit</button>
                                                  <button class="btn btn-danger" 
                                                      onClick={()=>
                                                        window.confirm('Delete?') ? 
                                                        delete_method(row.ItemCode)
                                                        : null
                                                    }
                                                  >Delete</button>


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
            gameId = {gameId}

            resource={resource}
            formData={editGameData}
            handleClose={handleClose}
        ></EditElementModal>
        </section>

    );
};

export default Games;