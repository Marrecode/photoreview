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
          <p>
            you are logged in as{" "}
            <strong>{currentUser && currentUser.email}</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
