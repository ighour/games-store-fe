import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Grow } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  fabs: {
    display: 'flex',
    flexDirection: 'column-reverse',
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fab: {
    marginTop: '8px',
    '&:last-child': {
      marginTop: 0
    }
  }
});

const FloatingMenu = props => {
  const {classes, open, changeOpen, changeRoute, IconOne, IconTwo, IconThree} = props;

  const MainIcon = open ? <CloseIcon/> : <MoreHorizIcon/>;

  return (
    <div className={classes.fabs}>
      <Fab className={classes.fab} color='primary' onClick={changeOpen}>
        {MainIcon}
      </Fab>

      <Grow in={open} timeout={{enter: 250, exit: 750}}>
        <Fab className={classes.fab} color='secondary' onClick={() => changeRoute(0)}>
          <IconOne/>
        </Fab>
      </Grow>

      <Grow in={open} timeout={{enter: 500, exit: 500}}>
        <Fab className={classes.fab} color='secondary' onClick={() => changeRoute(1)}>
          <IconTwo/>
        </Fab>
      </Grow>

      {IconThree !== undefined ?
        <Grow in={open} timeout={{enter: 750, exit: 250}}>
          <Fab className={classes.fab} color='secondary' onClick={() => changeRoute(2)}>
            <IconThree/>
          </Fab>
        </Grow>
        :
        null
      }
    </div>
  );
};

FloatingMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  changeOpen: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  IconOne: PropTypes.func.isRequired,
  IconTwo: PropTypes.func,
  IconThree: PropTypes.func
};

const ComponentWithStyles = withStyles(styles)(FloatingMenu);

export default ComponentWithStyles;