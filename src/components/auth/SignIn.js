import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);


  console.log(`before ${anchorEl}`);
  useEffect(() => {
    setAnchorEl(props.anchorElSignin)
  }, [props.anchorElSignin]);
  console.log(`After ${anchorEl}`);


  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl);
  console.log('-----', open)
  const id = open ? 'signin' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={props.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>sign in successfully</Typography>
      </Popover>
    </div>
  );
}
