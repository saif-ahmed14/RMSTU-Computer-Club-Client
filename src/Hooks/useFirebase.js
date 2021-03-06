import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken } from "firebase/auth";
import initializeAuthentication from '../Pages/Login/Firebase/Firebase.init';

//Initialize firebase app
initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    //Register user
    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);

                //Save user to the database
                saveUser(email, name, 'POST');

                //Send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                })
                    .catch((error) => {

                    });
                history.replace('/');
            })
            .catch((error) => {
                setAuthError(error.message);
            })

            .finally(() => setIsLoading(false));
    }

    //Login user
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const checkAdmin = admin ? '/dashboard' : '/';
                const destination = location?.state?.from || checkAdmin;
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })

            .finally(() => setIsLoading(false));
    }

    //Sign in with google
    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const checkAdmin = admin ? '/dashboard' : '/';
                const destination = location?.state?.from || checkAdmin;
                history.replace(destination);

                setAuthError('');
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT');

            }).catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //Observed user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    })
            } else {
                setUser({});
            }
            setIsLoading(false);
            return () => unsubscribe;
        });
    }, []);

    useEffect(() => {
        fetch(`https://fast-fortress-28219.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.role === 'admin') {
                    setAdmin(true)
                } else {
                    setAdmin(false)
                }
            });
    }, [user.email]);

    //Logout user
    const logOut = () => {
        setIsLoading(true);
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    };

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };

        fetch('https://fast-fortress-28219.herokuapp.com/user', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
    }

    return {
        user,
        token,
        admin,
        isLoading,
        authError,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut,
    }
}

export default useFirebase;