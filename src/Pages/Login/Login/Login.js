import { Button, Container, Grid, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, authError, isLoading, signInWithGoogle } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnChange = event => {
        const field = event.target.name;
        const value = event.target.value;

        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = event => {
        loginUser(loginData.email, loginData.password, location, history);
        event.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }
    return (
        <Container>
            <div className="row d-flex flex-md-row-reverse">
                <div className="col-sm-6 mt-4">
                    <div className="card border-0">
                        <div className="card-body">
                            <div className='image-container'>
                                <img src="https://i.ibb.co/TvYnQYj/user-authentication.png" alt="" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mt-4">
                    <div className="card border-0">
                        <div className="card-body">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h4" gutterBottom sx={{ color: '#3c60e5', textAlign: 'center' }}>Please Login</Typography>
                                    <form onSubmit={handleLoginSubmit}>
                                        <TextField
                                            sx={{ width: "100%", my: 1 }}
                                            // id="standard-basic"
                                            label="Your email"
                                            type="email"
                                            name="email"
                                            onChange={handleOnChange}
                                            placeholder="example@gmail.com"
                                            variant="standard" />
                                        <TextField
                                            sx={{ width: "100%", my: 1 }}
                                            // id="standard-basic"
                                            label="Your password"
                                            placeholder="password"
                                            type="password"
                                            name="password"
                                            onChange={handleOnChange}
                                            variant="standard" />

                                        <Button
                                            variant="contained"
                                            sx={{ width: "100%", mt: 2, mb: 2 }}
                                            type="submit"
                                        >Login</Button>

                                        <NavLink
                                            style={{ textDecoration: 'none' }}
                                            to="/register"
                                        >
                                            <br />
                                            <Button variant="text">Are you new user? Please Register</Button>
                                        </NavLink>
                                        {isLoading && <CircularProgress />}
                                        {
                                            user?.email && <Alert severity="success">Congratulations! You're successfully logged in!</Alert>
                                        }
                                        {
                                            authError && <Alert severity="error">{authError}</Alert>
                                        }
                                    </form>
                                    <Button sx={{ width: "100%", marginTop: 4 }} onClick={handleGoogleSignIn} variant="contained">Google Sign In</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Login;