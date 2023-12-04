import React, { useContext } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router';





const Login = () => {

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);

  const history = useNavigate();

  const location = useLocation();

  const { from } = location.state || {from : { pathname:'/'}};

 if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
 }




  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
   
      var token = credential.accessToken;
     
      const {displayName ,email} = result.user;

      const signInUser = { name: displayName,email };

    setLoggedInUser(signInUser);
    storeAuthToken();
    history(from);
   
    }).catch((error) => {
  
  
      const errorMessage = error.message;

      console.error(errorMessage);
    
    
    });


const firebaseConfig = {
  // ...
};

// Initialize Firebase



// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
  }


  const storeAuthToken = () => {

    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
   
      sessionStorage.setItem("token",idToken)

    }).catch(function(error) {
      // Handle error
    });

  }
   
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;