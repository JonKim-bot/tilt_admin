import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Storage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

const useUser = () => {
  const [user, setUser] = useContext(UserContext);

  React.useEffect(()=>{
      window.localStorage.setItem("user", JSON.stringify(user));
  },[user]);
  const get_user = ()=>{
      return user;
  }

  const set_user = (data)=>{
      setUser(data);
  }

  return {
      user,
      set_user,
      get_user
  };
};

export default useUser;
