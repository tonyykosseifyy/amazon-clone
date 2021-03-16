import React, { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { signIn } from '../actions' ;
import { useDispatch , useSelector } from 'react-redux' ;


// Configure Firebase.
const config = {
    apiKey: "AIzaSyBkbYqlHTV7i-6mihF3CUpOJK5lOKkSykA",
    authDomain: "react-auth-b5a1f.firebaseapp.com",
    projectId: "react-auth-b5a1f",
    storageBucket: "react-auth-b5a1f.appspot.com",
    messagingSenderId: "1041337574395",
    appId: "1:1041337574395:web:168c4bc1bb555e0494a15e",
    measurementId: "G-EMB7SCCLL1"
}
firebase.initializeApp(config);
 
const StyledAuth = ({ setUserLog }) => {
  const dispatch = useDispatch() ;
    const userState = useSelector(state => state.user.displayName)
 
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID, 
      firebase.auth.TwitterAuthProvider.PROVIDER_ID, 
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
 
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    console.log('callled')
    if ( !userState ) {
       firebase.auth().onAuthStateChanged(
        (user) => {
          user && dispatch(signIn({
            displayName: user.displayName ,
            email: user.email ,
            photoURL : user.photoURL 
          }))
        }
      );
    }
   
  }) 
    if (!userState) {
      return (
        <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
  }


export default StyledAuth ;