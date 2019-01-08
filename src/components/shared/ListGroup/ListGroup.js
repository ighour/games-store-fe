import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing.unit
  }
});

const ListGroup = props => {
  const {classes, children} = props;

  return (
    <div
      className={classes.list}
    >
      {children}
    </div>
  );
};

ListGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

const ComponentWithStyles = withStyles(styles)(ListGroup);

export default ComponentWithStyles;