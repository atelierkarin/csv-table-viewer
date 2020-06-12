import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import UploadFileButton from '../UploadFileButton/UploadFileButton'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Topbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Table Viewer
        </Typography>
        <UploadFileButton />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;