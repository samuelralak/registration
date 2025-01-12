import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Meteor } from 'meteor/meteor'
import QRCode from 'qrcode.react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import BottomNav from './Shared/BottomNav';
import TopNav from './Shared/TopNav';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        flexGrow: 1,
    },
}));

function Profile(props) {
    window.scrollTo(0, 0);

    if (props.loggingIn) {
        return (
            <p>Loading</p>
        );
    } else {
        const classes = useStyles();
        const [sponsorName, setSponsorName] = useState("Loading");
        const topNavStart = {
            icon: (<SupervisedUserCircleIcon />),
            title: "Profile",
            func: () => {
                props.history.push('/welcome')
            }
        }

        const topNavEnd = (
            <Button color="inherit" onClick={() => { props.history.push('/settings') }}><strong>edit</strong></Button>
        )

        Meteor.call('getUsername', Meteor.user().profile.invitedBy, (err, data) => {
            if (!err) {
                setSponsorName(data)
            }
            else {
                setSponsorName('Not Found')
            }
        })

        return (
            <React.Fragment>
                <CssBaseline />
                <TopNav topNavStart={topNavStart} topNavEnd={topNavEnd} />
                <Toolbar id="back-to-top-anchor" />
                <Container style={{ minHeight: '100vh' }}>
                    <List className={classes.root}
                        subheader={<ListSubheader>Welcome to APAC Blocks!</ListSubheader>}>
                        <Grid container justify="center" alignItems="center">
                            <ListItem>
                                <a href="https://t.me/apacblocks">Click here to join everyone in the Telegram group.</a>
                            </ListItem>
                        </Grid>
                    </List>
                    <Divider />
                    <List className={classes.root}
                        subheader={<ListSubheader>Name</ListSubheader>}>
                        <Grid container justify="center" alignItems="center">
                            <ListItem>
                                <ListItemText id="switch-list-label-darkMode" primary={Meteor.user().profile.realName} />
                            </ListItem>
                        </Grid>
                    </List>
                    <Divider />
                    <List className={classes.root}
                        subheader={<ListSubheader>Telegram</ListSubheader>}>
                        <Grid container justify="center" alignItems="center">
                            <ListItem>
                                <ListItemText id="switch-list-label-darkMode" primary={Meteor.user().profile.telegram} />
                            </ListItem>
                        </Grid>
                    </List>
                    <Divider />
                    <List className={classes.root}
                        subheader={<ListSubheader>BTC address</ListSubheader>}>
                        <Grid container justify="center" alignItems="center">
                            <ListItem>
                                <ListItemText id="switch-list-label-darkMode" secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="caption"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {Meteor.user().profile.btcAddress}
                                        </Typography>
                                    </React.Fragment>} />
                            </ListItem>
                        </Grid>
                    </List>
                    <Divider />
                    <List className={classes.root}
                        subheader={<ListSubheader>Balance</ListSubheader>}>
                        <Grid container justify="center" alignItems="center">
                            <ListItem>
                                <ListItemText id="switch-list-label-darkMode" primary={Meteor.user().profile.balance + " APX"} />
                            </ListItem>
                        </Grid>
                    </List>
                    <Divider />
                    <List className={classes.root}
                        subheader={<ListSubheader>Invited By</ListSubheader>}>
                        <Grid container justify="center" alignItems="center">
                            <ListItem>
                                <ListItemText id="switch-list-label-darkMode" primary={sponsorName} />
                            </ListItem>
                        </Grid>
                    </List>
                    <Divider />
                    <List className={classes.root}
                        subheader={<ListSubheader>Bio</ListSubheader>}>
                        <Grid container justify="center" alignItems="center">
                            <ListItem>
                                <ListItemText id="switch-list-label-darkMode" primary={Meteor.user().profile.bio} />
                            </ListItem>
                        </Grid>
                    </List>
                    <Divider />
                    <List className={classes.root}
                        subheader={<ListSubheader>Use this QR code to invite a new member</ListSubheader>}>
                        <Grid container justify="center" alignItems="center">
                            <ListItem>
                                <QRCode value={'APAC' + Meteor.userId()} size="100%" renderAs='svg' />
                            </ListItem>
                        </Grid>
                    </List>
                    <Divider />
                </Container>
                <BottomNav current="profile" />
            </React.Fragment>
        );
    }
}

export default withTracker((props) => {
    const loggingIn = Meteor.loggingIn();
    const currentUser = Meteor.user() ? Meteor.user() : {};
    return {
        loggingIn,
        currentUser
    }
})(Profile);