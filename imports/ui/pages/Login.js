import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor'
import TopNav from './Shared/TopNav';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: 80,
        right: theme.spacing(2),
    },
    footer: {
        top: 'auto',
        bottom: 0,
    },
}));

export default function Login(props) {
    if(Meteor.user()){
        props.history.push('/profile');
    }
    const classes = useStyles();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const topNavStart = {
        icon: (<SupervisedUserCircleIcon />),
        title: "Login",
        func: () => {
            props.history.push('/welcome')
        }
    }

    function login() {
        if(userName==undefined|| password == undefined){
            alert('fields cant be empty')
            return
        }
        Meteor.loginWithPassword(userName, password, (err) => {
            if(!err){
                props.history.push('/profile');
            }
            else{
                alert(err)
            }
        })
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <TopNav topNavStart={topNavStart} />
            <Toolbar id="back-to-top-anchor" />
            <Container style={{ minHeight: '100vh' }}>
                <Box my={2}>
                    <TextField
                        id="standard-full-width-uname"
                        label="BTC address or Email"
                        style={{ margin: 8 }}
                        placeholder=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={() => { setUserName(event.target.value) }}
                    />
                    <TextField
                        id="standard-full-width-pw"
                        type="password"
                        label="Password"
                        style={{ margin: 8 }}
                        placeholder=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={() => { setPassword(event.target.value) }}
                    />
                    <Button style={{ marginTop: 10 }} variant="contained" color="primary" onClick={()=>{login()}}>Login</Button>
                </Box>
            </Container>
        </React.Fragment>
    );
}
