import React, {useEffect} from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuth } from '../context/authContext';
// import Cookies from 'js-cookie';

const LoginButton = () => {
    const firebaseAuth = firebase.auth();
    const {login} = useAuth();
    const handleGoogleLogin = ()=>{
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
            (credentials)=>{
                if(credentials){
                    credentials.user.getIdToken().then((token)=>{
                        login('true',token)
                        window.location.replace('/dashboard');
                    })

                }
            }
        )
    }
    useEffect(()=>{
        try{
        firebaseAuth.onAuthStateChanged((credentials)=>{
            if(credentials){
                credentials.getIdToken().then((token)=>{
                    login('true',token)
                })
            };
        });
        }
        catch(err){
            console.log(err);
        }
        //eslint-disable-next-line
    }, [])
  return (
    <div>
        <button className='bg-yellow-400 px-2 py-1 rounded-md mt-5' onClick={handleGoogleLogin}>Get Started</button>
    </div>
)};

export default LoginButton;