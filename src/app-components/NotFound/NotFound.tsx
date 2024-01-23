import React from "react";
import Dashboard from "../Dashboard/Dashboard";
const NotFound = () => {
  return (
    <Dashboard>
      <div id="notFound">
        <h1>
          Упс, май не си на правилното място. Таква страница не съществува :(
        </h1>
        <center>
          {" "}
          <a href="/app">Върни се на началната страница</a>
        </center>
      </div>
    </Dashboard>
  );
};

export default NotFound;
