import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    console.log(
      `Would sign up user with email ${email} and password ${password}`
    );
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const contextValues = {
    signup,
    currentUser,
    loading,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={contextValues}>
      {loading && <ClipLoader color={"black"} />}
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuth, AuthContextProvider as default };
