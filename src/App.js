import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';
import { auth } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';


//component import
import Post from './components/Post';

//file import
import InstaLogo from './assets/logo/instalogo.png';


//material-ui modal styling function
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes =  useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
    
  const [ posts, setPosts ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);
  const [ openSignInModal, setOpenSignInModal ] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in.... 🛩 
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out.....
        setUser(null);
      }
    })

    return () => {
      // perform cleanup action
      unsubscribe();
    }
  }, [user, username]);

  //useEffect runs a piece of code based on a specific condition 😊
  
  useEffect(() => {
    //code comes here
    db.collection('posts').onSnapshot(snapshot => {
      // every single time a database changes (post is added), this code fires up
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpenModal(false);
  }

  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    setOpenSignInModal(false);
  }
  
  return (
    <div className="app">
      {/* Sign up modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className={"modal_input_box"}>
            <form className={"app_signup"}>
              <img className={"app_headerImage"} src={InstaLogo} alt="logo" />
              
              <Input 
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" onClick={signUp}>Sign up</Button>
            </form>
          </div>
        </div>
      </Modal>

      {/* Sign in modal */}
      <Modal
        open={openSignInModal}
        onClose={() => setOpenSignInModal(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className={"modal_input_box"}>
            <form className={"app_signup"}>
              <img className={"app_headerImage"} src={InstaLogo} alt="logo" />
              
              <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" onClick={signIn}>Sign in</Button>
            </form>
          </div>
        </div>
      </Modal>
      
      {/*Header*/}
      <div className={"app_header"}>
        <img 
          className={"app_headerImage"}
          src={InstaLogo}
          alt="Instagram logo"
        />

        {user ? (
          <div className={"sign_up_box"}>
            <Button onClick={() => auth.signOut()}>
              Logout
            </Button>
          </div>
        ): (
          <div className={"sign_up_box"}>
            <Button onClick={() => setOpenSignInModal(true)}>
              Sign in 
            </Button>

            <Button onClick={() => setOpenModal(true)}>
              Sign up
            </Button>
          </div>
        )}
      </div>
    
      {/*Posts*/} 
      { 
        posts.map(({id, post}) => (
          <Post 
            key={id}
            username={post.username} 
            caption={post.caption} 
            imageUrl={post.imageUrl} 
          />
        ))
      }
    </div> 
  );
}

export default App;
