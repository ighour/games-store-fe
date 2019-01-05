import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Typography} from '@material-ui/core';
import logo from '../../../assets/logo.png';

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0'
  },
  avatar: {
    width: '50px',
    height: '50px'
  },
  list: {
    width: '250px',
  }
};

class AppDrawer extends React.Component {
  doAction(action){
    switch(typeof action){
      case 'string':
        this.props.toRoute(action);
        break;
      case 'function':
        action();
        break;
      default:
        throw new Error("MENU_DRAWER_ACTION_UNSUPPORTED");
    }
  }

  render() {
    const { classes, open, toggle, primaryMenu, secondaryMenu } = this.props;

    return (
      <SwipeableDrawer
        open={open}
        onClose={toggle}
        onOpen={toggle}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={toggle}
          onKeyDown={toggle}
        >
          <div className={classes.list}>
            <div className={classes.header}>
              <Avatar alt='Logo' src={logo} className={classes.avatar}/>
              <Typography variant='h6'>Games Store</Typography>
            </div>
            <Divider/>
            <List>
              {primaryMenu.map(item => (
                <ListItem button key={item.text} onClick={() => this.doAction(item.action)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>

            {secondaryMenu && secondaryMenu.length > 0 &&
            <React.Fragment>
              <Divider/>
              
              <List>
                {secondaryMenu.map(item => (
                  <ListItem button key={item.text} onClick={() => this.doAction(item.action)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
            }
          </div>
        </div>
      </SwipeableDrawer>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  toRoute: PropTypes.func.isRequired,
  primaryMenu: PropTypes.array.isRequired,
  secondaryMenu: PropTypes.array
};

const ComponentWithStyles = withStyles(styles)(AppDrawer);

export default withStyles(styles)(ComponentWithStyles);