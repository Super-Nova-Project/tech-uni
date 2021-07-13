import React,{useState, useEffect} from 'react';
import cookie from 'react-cookies';
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import {useHistory} from 'react-router-dom';
//import superagent from 'superagent';
const API_SERVER = 'https://eraser-401.herokuapp.com';
export const AuthContext = React.createContext();

function AuthProvider (props) {
    const history = useHistory()
    const [user, setUser] = useState({
        loggedIn: false,
        user: {},
        login, 
        logout, 
        // validateAction,
        signup
    })
    // const [login, validateToken, setAuthState, logout, validateAction] = useHandlers(user, setUser);

    async function login (username, password)  {
        // send username:password encoded -> add them to the Authorization header
        // prefixed with Basic XXXencoded_valueXXX
        console.log('in login', username);
        const encoded = base64.encode(`${username}:${password}`);
        const result = await fetch(`${API_SERVER}/signin`, {
            method: 'post',
            headers: {Authorization: `Basic ${encoded}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-origin": '*',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Range"
            },
            mode: 'cors',
        });
        // const result = await superagent.post(`${API_SERVER}/signin`).set('Authorization', `Basic ${encoded}`).set('Accept', 'application/json')

        let data = await result.json();
        console.log('in login fun',result);
        validateToken(data.token);
        // verify ==> with the secret
        // decode ==> does not need the secret
    }

    async function signup (userData)  {
        // send username:password encoded -> add them to the 
        // prefixed with Basic XXXencoded_valueXXX
        const obj = {
            ...userData
        }
        const result = await fetch(`${API_SERVER}/signup`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': API_SERVER
            },
            body: JSON.stringify(obj)
        });

        let data = await result.json();
        if(data) validateToken(data.token)
        console.log('ishaq------s-a-d-a-sd',data);
        history.push('/')
        // validateToken(data.token);
        // verify ==> with the secret
        // decode ==> does not need the secret
    }

    function validateToken  (token)  {
        // jwt.verify with the secret.
        const user = jwt.decode(token); // not very recommended
        if (user) {
            setAuthState(true, user, token);
        }
    }

    function setAuthState  (loggedIn, user2, token)  {
        let obj = user2
        setUser(prev =>{return{...prev,loggedIn, user:{...obj}}});
        console.log('11111111111', user2);
        console.log('11111111111', user);
        // add the token to the browser cookies
        cookie.save('auth-token', token);
        cookie.save('userName', user2.firstName);
        
    }

    function logout  ()  {
        setAuthState(false, {}, null);
    }

    useEffect (() => {
        // functional component, useEffect -> inital render
        console.log("component did mount", user)
        const token = cookie.load('auth-token'); // read the cookie from browser
        
        validateToken(token);
    }, [])

    
        return (
            <AuthContext.Provider value={user}>
                {props.children}
            </AuthContext.Provider>
        )
    
}

export default AuthProvider;