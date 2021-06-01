import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import Metatag from '../util/Metatag';

const Auth = () => {
    const history = useHistory();
    if(isAutheticated()) history.push('/');
    const [ failureMessage, setFailureMessage ] = useState('');
    const [ staySignedIn, setStaySignedIn] = useState(false);

    const responseGoogleSuccess = (response) => {
        const userObject = {
            name: response?.profileObj.name,
            imageUrl: response?.profileObj.imageUrl,
            token: response?.tokenId,
            expiresAt: response?.tokenObj.expires_at
        }
        localStorage.setItem('uo', JSON.stringify(userObject));
        history.push('/');
    }
    const responseGoogleFailure = () => {
        setFailureMessage('Authentication Failed please reload the page and try again.');
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Metatag />
            {
                failureMessage ? failureMessage
                : (
                    <div className="flex flex-col justify-center">
                        <GoogleLogin
                            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                            buttonText="Continue with Google"
                            onSuccess={responseGoogleSuccess}
                            onFailure={responseGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={staySignedIn}
                        />
                        <label className="mt-4 flex justify-center items-center">
                            <span className="mr-2">Stay signed in</span>
                        <input type="checkbox" value={staySignedIn} onChange={(e) => setStaySignedIn(e.target.value)} />
                        </label>
                    </div>
                )
            }
        </div>
    )
}

export const isAutheticated = () => {
    const userObject = JSON.parse(localStorage.getItem('uo'));
    if(!userObject) return false;
    if(Math.floor(new Date()) > userObject.expiresAt) {
        localStorage.removeItem('uo');
        return false;
    }
    return userObject;
}

export const googleLogout = () => {
    const history = useHistory();
    const onLogoutSuccess = () => {
        localStorage.removeItem('uo');
        history.push('/auth');

    }
    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
            render={renderProps => (
                <button 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled}
                    className="btn px-2 py-1 ml-2"
                >
                    Logout
                </button>
              )}
        >
        </GoogleLogout>
    );
}

export default Auth;
