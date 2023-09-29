import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

// frontend part is on render.com

const Header = () => {
  const { isAuthenticated, SetIsAuthenticated, loader, SetLoader } = useContext(Context);

  const logoutHandler = async (e) => {
    SetLoader(true);
    try {
       await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      toast.success("logged out succesfully");
      SetIsAuthenticated(false);
      SetLoader(false);
    } catch (error) {
      toast.error(error.response.data.message);
      SetIsAuthenticated(true);
      SetLoader(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>ToDo APP.</h2>
      </div>
      <article>
        <Link to={"/"}>ToDo</Link>
        {/* <Link to={"/profile"}>Profile</Link> */}

        {isAuthenticated ? (
          <button disabled={loader} className="btn" onClick={logoutHandler}>LogOut</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
