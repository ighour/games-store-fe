import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar as MaterialAppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1
  },
  title: {
    'text-align': 'left',
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 5,
  },
};

class AppBar extends React.Component {
  render(){
    const { classes, title, toggleDrawer } = this.props;

    return (
      <MaterialAppBar className={classes.root}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </MaterialAppBar>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

const ComponentWithStyles = withStyles(styles)(AppBar);

export default ComponentWithStyles;