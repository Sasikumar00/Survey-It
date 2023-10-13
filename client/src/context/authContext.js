import { createContext, useContext, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const firebaseAuth = firebase.auth();
  const [auth, setAuth] = useState(false || Cookies.get('auth')==='true'); 
  const [token, setToken] = useState(Cookies.get('authToken'));

  const login = (auth,token)=>{
    setAuth(auth);
    Cookies.set('auth', auth)
    setToken(token);
    Cookies.set('authToken', token)
  }
  const logout = () =>{
    firebaseAuth
      .signOut()
      .then(() => {
        Cookies.remove('authToken')
        Cookies.remove('auth')
        setAuth(false);
        setToken(null);
        window.location.replace('/');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  }

  return (
    <AuthContext.Provider value={{login, logout, auth, setAuth, token, firebaseAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
