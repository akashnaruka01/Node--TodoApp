import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.scss";

export const server = "https://nodejs-todoapp-605y.onrender.com/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [loader, SetLoader] = useState(false);
  const [user, SetUser] = useState({});

  return (
    <Context.Provider
      value={{ isAuthenticated, SetIsAuthenticated, loader, SetLoader, user, SetUser }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<AppWrapper />);
