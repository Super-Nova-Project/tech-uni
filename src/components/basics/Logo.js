import React from 'react';

import { makeStyles } from '@material-ui/core/styles'; 


const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 200,
  },
}));

export default function Logo() {
  const classes = useStyles();
  return (
    <>
      <img src="logo4.png" alt="logo" className={classes.logo} />
    </>
  )
};