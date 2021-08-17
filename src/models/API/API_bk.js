import axios from 'axios';

const host = "http://34.126.111.174";
const access_endpoint_link = host + "/";

const format_request = (postparam) => {
    // if (postparam) {
    //     let token = window.localStorage.getItem("token");
    //     if (token) {
    //         postparam["token"] = token;
    //     }
    // }
    let body = "";
    for (let k in postparam) {
        body += encodeURI(k) + "=" + encodeURI(postparam[k]) + "&";
    }
    var postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    };
    return postOptions;
};

export const loginWithEmail = (postparam) => {
    return axios.post(access_endpoint_link + "Client/LoginWithEmail", postparam, {
        headers: {}
    });
};

export const activeGames = () => {
    var user = window.localStorage.getItem("user");
    if (user != undefined) {
        user = JSON.parse(user);
        var sessionToken = user.SessionTicket;

        return axios.get(access_endpoint_link + "Client/Dashboard/ActiveGames", {
            headers: {
                Authorization: "Bearer "+sessionToken
            }
        });
    }

    return false;

}