import React, {useContext} from 'react';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import { Button } from '@material-ui/core';
import { Switch, Route, Link } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Logo from './Logo';
import {AuthContext} from '../../context/authContext';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const appTheme = createTheme({
  palette: {
    primary: {
      light: '#6179b9',
      main: '#ffffff',
      dark: '#141a2c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f6ee34',
      main: '#9ccac5',
      dark: '#bdb508',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: appTheme.palette.secondary.main
  },

  inputRoot: {
    color: appTheme.palette.primary.light,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  header: {
    backgroundColor: appTheme.palette.primary.main,
    height: '20vh'
  },
  icons: {
    color: appTheme.palette.secondary.main
  },
  button: {
    marginLeft: 180,
  }
}));



export default function Header() {
  const context = useContext(AuthContext); 
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSignin, setAnchorElSignin] = React.useState(null);
  const [anchorElSignup, setAnchorElSignup] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    console.log('---tabs---',newValue);
    setValue(newValue);
  };

  const handleSignIn = (event) => {
    setAnchorElSignin(event.currentTarget);
    console.log(anchorElSignin);
  };

  const handleSignUp = (event) => {
    setAnchorElSignup(event.currentTarget);
    console.log(anchorElSignup);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMenuOpen} onClose={handleMenuClose} >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose} >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" >
          <Badge badgeContent={4} >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" >
          <Badge badgeContent={11} >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuOpen}>
        <IconButton aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" >

          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
    <div className={classes.grow}>
      <AppBar position="static" className={classes.header} >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Logo />

          {/* <div className={classes.grow} /> */}
          <div className={classes.auth}>
                <SignIn anchorElSignin={anchorElSignin} />
            
          </div>
          {/* <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" className={classes.icons}>
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" className={classes.icons}>
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.icons}
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />

            </IconButton>
            <img src="logo1.png" alt="logo" className={classes.title} />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails"  className= {classes.icons}>
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" className= {classes.icons}>
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleMobileMenuOpen} className= {classes.icons} >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.button}>
              <Button variant='contained' color='primary'> Login </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit" >
                <MoreIcon />
              </IconButton>
            </div>
            </div>*/}
          
        {/* {renderMobileMenu} */}
        {/* {renderMenu} */}
        </Toolbar>
        </AppBar>
      
      </div> 
      <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >{context.loggedIn ? (
        <>
        <Link to="/" >
        <Tab label="Home" />
        </Link>
        <Link to="/create-course" >
        <Tab label="Create Course" />
        </Link>
        <Link to="/join-course" >
        <Tab label="Join Course" />
        </Link>
        </>
      ): (
        <>
        <Link to="/" >
        <Tab label="Home" />
        </Link>
        <Link to="/signup" >
        <Tab label="SignUp" />
        </Link>
        </>
      )}
      <Link to="/about-us" >
      <Tab label="About Us" />
      </Link>
      </Tabs>
    </Paper>
    </>
  );
}
