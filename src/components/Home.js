import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser, loading } = useAuth();
  console.log(currentUser);

  return (
    <>
      <div className="container">
        <div>
          <p> Home </p>
          <h1>
            Logged in as <strong>{currentUser && currentUser.email}</strong>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
