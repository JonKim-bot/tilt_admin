import React, { useState , useEffect } from "react";
import { HomePage, activeGames } from "../../models/API/API";
import AddModal from './AddModal';
import EditGameModal from './EditModal';
import { Link } from 'react-router-dom';


const Games = (props) => {
    const query = new URLSearchParams(props.location.search);
    const gameId = query.get('gameId')
    const [games, setGames] = React.useState([]);
    const [resource, setResource] = useState([])
    const tableHead = ["Category",'DataDump','DefaultValue','Description','Item code','Name'];
    const[ActiveUsersCount,setActiveUsersCount] = useState(0)
    const[DailyUsersCount,setDailyUsersCount] = useState(0)
    
    const[MonthlyUsersCount,setMonthlyUsersCount] = useState(0)
    

    React.useEffect(() => {
        HomePage(gameId).then(res => {
            // setGames(res.Data);
            setDailyUsersCount(res.DailyUsersCount)
            setActiveUsersCount(res.ActiveUsersCount)
            setMonthlyUsersCount(res.MonthlyUsersCount)

        });
    }, []);
    const handleClose = ()=>{
        
        setAddGame(false);
        setEditGameData()
        
    }
    const [editGameData, setEditGameData] = useState();


    const [addGame, setAddGame] = useState(false);
    const [game, setGame] = useState([])

    return (
        
      <div className="content-body">
                              <h1>Dashboard</h1>

      {/* card actions section start */}
      <section id="card-actions">
        {/* Info table about action starts */}
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">MonthlyUsersCount </h4>
                <a className="heading-elements-toggle">
                  <i className="bx bx-dots-vertical font-medium-3" />
                </a>
                <div className="heading-elements">
                  <ul className="list-inline mb-0">
                    <li>
                     
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-content collapse show">
                <div className="card-body">
                  <p>
                    {MonthlyUsersCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">ActiveUsersCount </h4>
                <a className="heading-elements-toggle">
                  <i className="bx bx-dots-vertical font-medium-3" />
                </a>
                <div className="heading-elements">
                  <ul className="list-inline mb-0">
                    <li>
                 
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-content collapse show">
                <div className="card-body">
                  <p>
                    {ActiveUsersCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">DailyUsersCount </h4>
                <a className="heading-elements-toggle">
                  <i className="bx bx-dots-vertical font-medium-3" />
                </a>
                <div className="heading-elements">
                  <ul className="list-inline mb-0">
                    <li>
                     
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-content collapse show">
                <div className="card-body">
                  <p>
                    {DailyUsersCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Collapsible and Refresh Action Ends */}
        {/* Expand And Remove Actions Starts */}
       
        {/* Expand And Remove Actions Ends */}
      </section>
      {/* // card-actions section end */}
    </div>

    );
};

export default Games;