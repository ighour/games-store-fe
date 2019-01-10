import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';

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

const FloatingMenuSimple = props => {
  const {classes, IconOne, changeRoute} = props;

  return (
    <div className={classes.fabs}>
      <Fab className={classes.fab} color='primary' onClick={() => changeRoute(0)}>
        <IconOne/>
      </Fab>
    </div>
  );
};

FloatingMenuSimple.propTypes = {
  classes: PropTypes.object.isRequired,
  IconOne: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired
};

const ComponentWithStyles = withStyles(styles)(FloatingMenuSimple);

export default ComponentWithStyles;