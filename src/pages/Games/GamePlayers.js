import React, { useState , useEffect } from "react";
import { GameSearch,GetPlayerDetails, activeGames } from "../../models/API/API";
import AddModal from './AddElementModal';

import EditElementModal from './EditElementModal';
import { Link } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';


const Games = (props) => {
    const query = new URLSearchParams(props.location.search);
    const gameId = query.get('gameId')
    const [games, setGames] = React.useState([]);
    const [resource, setResource] = useState([])
    const tableHead = ['Account ID ', 'Username','Email','contact'];
    const[emptyRows,setEmptyRos] = useState(0)
    const [limit,setLimit] = useState(10)
    const [count,setTotalCount] = useState(0)
    const [keyword,setkeyword] = useState(null)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [offset,setOffset] = useState(0)
    React.useEffect(() => {
        GameSearch(gameId,{Offset  : offset,Limit : limit,Keyword : keyword}).then(res => {
            // console.log(res);
            setGames(res.Data);
            setTotalCount(res.Count);
        });
    },[page,limit,keyword])
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

    const handleChangePage = (event, newPage) => {

        let offset = (newPage) * 10

        setOffset(offset)
        // alert(offset);
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10))
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(()=>{
        setEmptyRos(rowsPerPage - Math.min(rowsPerPage, games.length - page * rowsPerPage))
    },[games])
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
                        <div>

                             <input type="text" onChange={(e) => setkeyword(e.target.value)}></input>

                        </div>
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
                                            <td>{row.AccountId}</td>
                                            <td>{row.Username}</td>
                                            <td>{row.Email}</td>
                                            <td>{row.PhoneNumber}</td>
                                 

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <TablePagination
                                // rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                style={{ marginTop: '15px' }}
                            />
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