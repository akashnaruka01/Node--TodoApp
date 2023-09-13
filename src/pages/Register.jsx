import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, SetIsAuthenticated, loader, SetLoader } = useContext(Context);

  const submitHandler = async (e) => {
    SetLoader(true);
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/user/new`,
        { name, email, password },
        { withCredentials: true }
      );
      toast.success(data.message);
      SetIsAuthenticated(true);
      SetLoader(false);
    } catch (error) {
      toast.error(error.response.data.message); 
      SetIsAuthenticated(false);
      SetLoader(false);
    }
  };

  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button disabled={loader} type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
