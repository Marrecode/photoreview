import { createContext, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    const signup = (email, password) => {
        console.log(`Would sign up user with email ${email} and password ${password}`)
    }

    const contextValues = { 
        signup,
        currentUser,
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, 
    AuthContextProvider as default } 