import React, { createContext, useContext, useState, ReactNode  } from 'react';


interface LoginContextType {
    user: string | null;
    login: (username: string) => void;
    logout: () => void;
}


const LoginContext = createContext<LoginContextType | null>(null);


function UserProvider({ children }: {children: ReactNode}) {

    const [user, setUser] = useState<string | null>(null);

    function login(username: string) {
        setUser(username);
    }

    function logout() {
        setUser(null);
    }

    return( 
        <LoginContext.Provider value={{user, login, logout}}>
            {children}
        </LoginContext.Provider>
    );
}


function useUser() {
    const context = useContext(LoginContext);

    if(!context) {
        throw new Error('useUser can only be used from inside of a UserProvider!');
    }

    return context;
}


export {UserProvider, useUser};