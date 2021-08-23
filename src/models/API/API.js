import React from 'react';
import axios from 'axios';

// const ROOT_URL = "http://prod.cysoft.co/plantation"
const ROOT_URL = "http://34.126.111.174"
// const host = "http://34.126.111.174";
// 
const ROOT_URL_API = ROOT_URL + ""
const postHeaders = {
    "Content-type": "application/x-www-form-urlencoded"
}

// localStorage.setItem('token-tilt','AEaez9UDNAUjTEFWj9nSm2HykmyaGQs3')
const token = localStorage.getItem('token-tilt') == null ? "" : localStorage.getItem('token-tilt');
const clan = localStorage.getItem('clan') == null ? "" : localStorage.getItem('clan');

axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}


/* API Function */

const get_axios_eg = async (url,data={})=>{
    data.Clan = clan;
    return axios.get(ROOT_URL_API + url, {
        params: data,
        header : {
      "Content-type": "application/json"
        }
      })
      .then((res)=>{

        alert(JSON.stringify(res) + "res")
        if(res.status == "200"){
            return res.data;
        }
        else{
            alert(res.errorMessage);
            return false;
        }
    })
    .catch(function (error) {
        if (error.response){
            if(error.response.data.error == 'ErrorInvalidSession'){
                // localStorage.clear()
                // window.location.reload()
            }

            alert(  (error.response.data.errorMessage));   
            //do something
            return;
        }
            //do something other than the other two
            
    })
}
const get_axios_api = async (url , data={}) =>{
    data._method = "GET";
    data.Clan = clan;

    return axios({
        method: 'post',
        url: ROOT_URL_API + url ,
        header : {
            "Content-type": "application/json"
        },
        data // body data here
      }) .then((res)=>{
        if(res.status == "200"){
            return res.data;
        }
        else{
            
            alert(res.errorMessage);
            return false;
        }
    })
    .catch(function (error) {
        if (error.response){
            if(error.response.data.error == 'ErrorInvalidSession'){
                localStorage.clear()
                window.location.reload()
            }
            alert(  (error.response.data.errorMessage));   
            //do something
            return;
        }
            //do something other than the other two
            
    })
}
const get_axios_api_without_overide = async (url , data={}) =>{
    data._method = "GET";

    return axios({
        method: 'get',
        url: ROOT_URL_API + url ,
        header : {
            "Content-type": "application/json"
        },
        data // body data here
      }) .then((res)=>{
        if(res.status == "200"){
            
            return res.data;

        }
        else{
            alert(res.errorMessage);
            return false;
        }
    })
    .catch(function (error) {
        if (error.response){
            
            if(error.response.data.error == 'ErrorLoginNeeded'){
                localStorage.clear()
                window.location.reload()
            }
            alert(  (error.response.data.errorMessage));   
            //do something
            return;
        }
            //do something other than the other two
            
    })
}


const get_axios = async (url,data={})=>{
    data.Clan = clan;

    return axios.get(ROOT_URL_API + url ,data, {
        header: postHeaders
    })

    .then((res)=>{

        if(res.status == "200"){
            return res.data ;
        }
        else{
            alert(res.errorMessage);
            return false;
        }

    })
    .catch(function (error) {
        if (error.response){
            
            if(error.response.data.error == 'ErrorLoginNeeded'){
                localStorage.clear()
                window.location.reload()
            }
            alert(  (error.response.data.errorMessage));   
            //do something
            return;
        }
            //do something other than the other two
            
    })
}

const post_axios = async (url , data={})=>{
    // data.Clan = clan;
    return axios.post(ROOT_URL_API + url ,data, {
        header: postHeaders
    })
    .then((res)=>{

        // alert("res" +JSON.stringify(res));
        if(res.status == "200"){
            res.root_url = ROOT_URL;
            return res.data;
        }
        else{
            // alert(res.errorMessage);
            return false;
        }
    })
    .catch(function (error) {
        if (error.response){
            if(error.response.data.error == 'ErrorLoginNeeded'){
                localStorage.clear()
                window.location.reload()
            }
            alert(  (error.response.data.errorMessage));   
            //do something
            return;
        }
            //do something other than the other two
            
    })
}

/* API Export */

// Authentication
 
export const RegisterAccount = async (data) => { return post_axios('/Client/RegisterAccount',data); }
export const VerifyOTP = async (data) => { return post_axios('/Client/VerifyOTP',data); }
export const ResendOTP = async (data) => { return post_axios('/Client/ResendOTP',data); }

export const ResetPassword = async (data) => { return post_axios('/Client/ResetPassword',data); }
export const loginWithEmail = async (data) => { return post_axios('/Client/LoginWithEmail',data); }

// Account
export const activeGames = async (data) => { return get_axios_api('/Client/Dashboard/ActiveGames',data); }
export const CreateTiltDB = async (data) => { return get_axios_api('/Client/DB/'+data+'/CreateTiltDB?overwrite=false'); }

export const CreateRemoteDB = async (data) => { return get_axios_api('/Client/'+data+'/CreateRemoteDB?overwrite=false'); }
export const TestDB = async (gameId,data) => { return post_axios('/Client/DB/'+gameId+'/TestDB',data); }
export const SaveDB = async (gameId,data) => { return post_axios('/Client/DB/'+gameId+'/SaveDB',data); }
export const HomePage = async (data) => { return get_axios_api('/Client/Dashboard/'+data+'/Home'); }

export const CreateTiltGame = async (data) => { return post_axios('/Client/Dashboard/CreateTiltGame',data); }
export const AddAdmin = async (data) => { return post_axios('/Client/Dashboard/runner/AddAdmin',data); }
export const RemoveAdmin = async (data) => { return post_axios('/Client/Dashboard/runner/RemoveAdmin',data); }

export const GameElementGetAll = async (data) => { return get_axios_api('/Client/GameElements/'+data+'/GetAll'); }
export const CreateElement = async (gameId,data) => { return post_axios('/Client/GameElements/'+gameId+'/Create',data); }
export const DeleteElement = async (gameId,data) => { return post_axios('/Client/GameElements/'+gameId+'/Delete',data); }
export const EditElement = async (gameId,data) => { return post_axios('/Client/GameElements/'+gameId+'/Edit',data); }

export const Leaderboard = async (gameId,data) => { return post_axios('/Client/Players/'+gameId+'/Leaderboard',data); }

export const GetServerLogs = async (gameId,data) => { return post_axios('/Client/Logs/'+gameId+'/GetServerLogs',data); }
export const GetGameLogs = async (gameId,data) => { return post_axios('/Client/Logs/'+gameId+'/GetGameLogs',data); }


export const GameVariablesGetAll = async (gameId) => { return get_axios_api('/Client/GameVariables/'+gameId+'/GetAll'); }

export const GameVariablesSet = async (gameId,data) => { return post_axios('/Client/GameVariables/'+gameId+'/Set',data); }
export const GameVariablesDelete = async (gameId,data) => { return post_axios('/Client/GameVariables/'+gameId+'/Delete',data); }

export const GameVariablesEdit = async (gameId,data) => { return post_axios('/Client/GameVariables/'+gameId+'/Edit',data); }


export const GetPlayerDetails = async (gameId,data) => { return get_axios_api('/Client/Players/'+gameId+'/GetPlayerDetails',data); }

export const Test = async () => { return get_axios('/Admin/Gift/GetGameData')}


