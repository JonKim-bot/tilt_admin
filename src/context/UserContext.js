import React, { createContext, useState } from "react";

export const UserContext = React.createContext();

const storage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const UserContextProvider = (props) => {
    const [user, setUser] = useState(storage);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
