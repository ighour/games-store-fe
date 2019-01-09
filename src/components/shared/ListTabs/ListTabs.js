import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs as MaterialTabs, Tab } from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main
  },
  tabsRoot: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  tab: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  }
});

const ListTabs = props => {
  const {classes, currentTab, setCurrentTab, elements} = props;

  return (
    <AppBar position='sticky' className={classes.root}>
      <MaterialTabs
        value={currentTab}
        onChange={setCurrentTab}
        variant='scrollable'
        scrollButtons="auto"
        classes={{ root: classes.tabsRoot }}
      >

        {elements.map(element => 
          <Tab
            key={element.id}
            icon={element.top}
            label={element.bottom}
            value={element.value}
            className={classes.tab}
          />  
        )}

      </MaterialTabs>
    </AppBar>
  );
};

ListTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  currentTab: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  setCurrentTab: PropTypes.func.isRequired,
  elements: PropTypes.array.isRequired
};

const ComponentWithStyles = withStyles(styles)(ListTabs);

export default ComponentWithStyles;