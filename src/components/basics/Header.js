import React, {useContext} from 'react';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Logo from './Logo';
import {AuthContext} from '../../context/authContext';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useHistory} from 'react-router-dom';

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
    position: 'relative',
    backgroundColor: appTheme.palette.primary.main,
    height: '20vh',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    boxShadow: '0px 0px',
  },
  icons: {
    color: appTheme.palette.secondary.main
  },
  // button: {
  //   marginLeft: 180,
  // },
  auth: {
    position: 'absolute',
    top: '50%',
  // -ms-transform: translateY(-50%),
    transform: 'translateY(-50%)',
    right: 20
  },
  tabs: {
    width: '31%',
    margin: '0 auto',
    // marginTop: '-50px',
    position: 'absolute',
    top: 50,
    zIndex: 10000,
    left:300
  },
  tabss: {

    width: '50%',
=======


    margin: '0 auto',
    // marginTop: '-50px',
    position: 'absolute',
    top: 50,
    zIndex: 10000,
    left:300
  }
}));



export default function Header() {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSignin, setAnchorElSignin] = React.useState(null);
  const [anchorElSignup, setAnchorElSignup] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log('---tabs---',newValue);
    console.log('---history---',history);
    setValue(newValue);
    if (newValue == 0) {
      history.push('/')
    }else if (newValue == 1) {
      history.push('/create-course')
    } else if (newValue == 2) {
      history.push('/join-course')
    }else if (newValue == 3) {
      history.push('/about-us')
    }
  };
  const handleChanges = (event, newValue) => {
    console.log('---tabs---',newValue);
    console.log('---history---',history);
    setValue(newValue);
    if (newValue == 0) {
      history.push('/')
    }else if (newValue == 1) {
      history.push('/signup')
    } else if (newValue == 2) {
      history.push('/about-us')
    }
  };

  // const handleSignIn = (event) => {
  //   setAnchorElSignin(event.currentTarget);
  //   console.log(anchorElSignin);
  // };

  // const handleSignUp = (event) => {
  //   setAnchorElSignup(event.currentTarget);
  //   console.log(anchorElSignup);
  // };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  //   console.log(anchorEl);
  // };


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
            {/* <MenuIcon /> */}
          </IconButton>
          <Logo />

        </Toolbar>
          <div className={classes.auth}>
                <SignIn anchorElSignin={anchorElSignin} />
            
          </div>
        </AppBar>
      
      </div> 
      <Paper square>
      {context.loggedIn ? (
        <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        // aria-label="disabled tabs example"
        className={classes.tabss}
      >
        <Tab label="Home"/>
        <Tab label="Create Course" />
        <Tab label="Join Course" />
        <Tab label="About Us" />
        </Tabs>
      ): (
        <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChanges}
        // aria-label="disabled tabs example"
        className={classes.tabs}
      >
        <Tab label="Home" />
        <Tab label="SignUp" />
        <Tab label="About Us" />
        </Tabs>
      )}
      
    </Paper>
    </>
  );
}
