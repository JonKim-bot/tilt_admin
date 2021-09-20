import React, { useState , useEffect } from "react";
import { Leaderboard,GameSearch, activeGames,GameElementGetAll } from "../../models/API/API";
import AddModal from './AddGameVariableModal';

import EditGameVariableModal from './EditGameVariableModal';
import { Link } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import { CSVLink, CSVDownload } from "react-csv";
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Box , Card , TextField , Button , Typography } from '@material-ui/core'
const width = '400px'


const GameLeaderboard = (props) => {
    const query = new URLSearchParams(props.location.search);
    const gameId = query.get('gameId')
    const [games, setGames] = React.useState([]);
    const [resource, setResource] = useState([])
    const tableHead = ["AccountId","DisplayName","Score",'Email','Rank'];
    const [limit,setLimit] = useState(10)

  
    const handleClose = ()=>{
        
        setAddGame(false);
        setEditGameData()
        
    }

    const [editGameData, setEditGameData] = useState();

    const [orderBy, setOrderBy] = useState('desc')
    const[emptyRows,setEmptyRos] = useState(0)

    const [offset,setOffset] = useState(0)

    const [GameId, setGameId] = useState(0)

    const [addGame, setAddGame] = useState(false);
    const [game, setGame] = useState([])

    function AddGame(GameId){
        setGameId(GameId)
        setAddGame(true)
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        setEmptyRos(rowsPerPage - Math.min(rowsPerPage, game.length - page * rowsPerPage))
    },[game])

    const [count,setTotalCount] = useState(0)
    const [keyword,setkeyword] = useState('')
    const [gameselement, setGameselement] = React.useState([]);
    const [itemcode, setItemcode] = useState('score')

    React.useEffect(() => {
        // OrderBy:orderBy,Offset:offset,Limit: limit
        let postParam = {
            SortOn: [itemcode],
            Top: limit,
            Order: orderBy,
            Offset: offset, 
            Around: 0,
            Target: 0, 
            // (from before)
            ShowItems: ["DisplayName",'Email']             // (Hardcoded)
        
        }
        Leaderboard(gameId,postParam).then(res => {
            // console.log(res);
            setGames(res.Top);
            setTotalCount(res.TotalCount);
            
        });

        GameElementGetAll(gameId).then(res => {
            //     console.log(res);
            setGameselement(res.Data);
        });
    },[orderBy,page,limit,keyword])


    React.useEffect(() => {
        // OrderBy:orderBy,Offset:offset,Limit: limit
        let postParam = {
            SortOn: ['' + itemcode+ ''],
            Top: 10000,
            Order: orderBy,
            Offset: 0, 
            Around: 0,
            Target: 0, 
            // (from before)
            ShowItems: ["DisplayName",'Email']             // (Hardcoded)
        
        }
        Leaderboard(gameId,postParam).then(res => {
            // console.log(res);
            setGame(res.Top);
            
        });
    },[orderBy,page,limit,itemcode])



    function search(){
        let postParam = {
            SortOn: ['' + itemcode+ ''],
            Top: limit,
            Order: orderBy,
            Offset: offset, 
            Around: 0,
            Target: keyword, 
            // (from before)
            ShowItems: ["DisplayName",'Email']             // (Hardcoded)
        
        }
        Leaderboard(gameId,postParam).then(res => {
            // console.log(res);
            setGames([res.TargetData]);
            
        });
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
                     
                        <div style={{justifyContent : 'space-between',display : 'flex'}}>
                            <div>

                                <input type="text" className="h-100" onChange={(e) => setkeyword(e.target.value)}></input>
                                <button onClick={() => search()} className="btn btn-sm btn-primary glow h-100" style={{ marginRight: 10 }}>
                                    Search
                                </button> 
                            </div>
                            <div>

                                <button className="btn btn-sm btn-success glow h-100">
                                    <CSVLink data={game} headers={tableHead} filename={"leaderboard.csv"} style={{ color: 'black' }}>
                                        Export To Csv
                                    </CSVLink>
                                </button> 
                            </div>
                            <div>
                                <Autocomplete
                                id="tags-outlined"
                                options={gameselement}
                                onChange={(e,value)=>{value ? setItemcode(value.ItemCode) 
                                    : setItemcode( value.ItemCode)}
                            }
                        
                            // onChange={(option) => alert(option.name)}
                                defaultValue={'Score'}
                                getOptionLabel={(option) => option.ItemCode}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Sort on"
                                        variant='outlined'
                                        placeholder="-- select item to sort on --"
                                    />
                                )}
                                style={{ width: width }}
                            />
                            </div>

                        </div>
                        <div class="table-responsive">
                            <table id="users-list-datatable" class="table">
                                <thead>
                                    <tr>
                                    
                                            <th>
                                                AccountId
                                            </th>
                                            <th>
                                            DisplayName
                                            </th>
                                            <th>
                                            Score 
                                                <i onClick={() => setOrderBy(orderBy == 'asc' ? 'desc' : 'asc')} class={'bx bx-' + (orderBy == 'asc' ? 'up' : 'down') +'-arrow-alt'}></i>
                                            </th>
                                            <th>
                                            Email
                                            </th>
                                            <th>
                                                Rank
                                            </th>

                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.map((row) => (
                                        <tr>
                                            <td>{row.AccountId}</td>
                                            <td>{row.DisplayName}</td>
                                            <td>{row.Score}</td>
                                            <td>{row.Email}</td>
                                            <td>{row.Rank}</td>

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