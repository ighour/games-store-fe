import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelActions, ExpansionPanelSummary, ExpansionPanelDetails, IconButton, Typography, Avatar } from '@material-ui/core';

const styles = theme => ({
  panel: {
    width: '100vw',
    maxWidth: '350px',
    marginBottom: '1vh',
    marginRight: '0.5vw',
    marginLeft: '0.5vw'
  },
  panelSummaryContentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  panelSummaryContentWrapperTop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: '-15px',
    marginBottom: '10px'
  },
  panelSummaryContent: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  panelSummaryContentTitle: {
    color: theme.palette.primary.main
  },
  panelDetailsContent: {
    textAlign: 'left'
  },
  panelDetailsContentParameter: {
    color: theme.palette.secondary.main
  },
  panelDetailsContentText: {
    display: 'inline-block'
  },
  image: {
    padding: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  imageTop: {
    marginRight: theme.spacing.unit,
    width: '100%',
    height: 'auto',
    borderRadius: '2%',
    padding: 0
  }
});

const ListRow = props => {
  const {classes, expanded, primaryText, secondaryText, ExpandButtonIcon, expandButtonAction, expandedTexts, expandedActions, image} = props;

  return (
    <ExpansionPanel expanded={expanded} onChange={expandButtonAction} className={classes.panel}>
      <ExpansionPanelSummary expandIcon={ExpandButtonIcon}>
        <div className={image.position === 'top' ? classes.panelSummaryContentWrapperTop : classes.panelSummaryContentWrapper}>
          {image &&
            <Avatar alt={image.name} src={image.src} className={image.position === 'top' ? classes.imageTop : classes.image} onError={e => {if(e.target.src !== image.fallback) e.target.src = image.fallback}}/>
          }
          <div className={classes.panelSummaryContent}>
            <Typography variant="overline" className={classes.panelSummaryContentTitle}>
              {primaryText}
            </Typography>
            
            {secondaryText &&
            <Typography variant="overline" color="textSecondary">
              {secondaryText}
            </Typography>
            }
          </div>
        </div>
      </ExpansionPanelSummary>

      {expandedTexts && expandedTexts.length > 0 &&
      <ExpansionPanelDetails>
        <div className={classes.panelDetailsContent}>
          {expandedTexts.map(text =>
            <React.Fragment key={text.label}>
              <Typography variant="overline" className={classnames(classes.panelDetailsContentParameter, classes.panelDetailsContentText)}>
                {text.label}&nbsp;
              </Typography>
              <Typography color='textSecondary' className={classes.panelDetailsContentText}>
                {text.value}
              </Typography>
              <br/>
            </React.Fragment>  
          )}
        </div>
      </ExpansionPanelDetails>
      }

      {expandedActions && expandedActions.length > 0 &&
      <ExpansionPanelActions>
        {expandedActions.map(action =>
          <IconButton aria-label={action.name} onClick={action.onClick} key={action.name}>
            {action.icon}
          </IconButton>
        )}
      </ExpansionPanelActions>
      }
    </ExpansionPanel>
  );
};

ListRow.propTypes = {
  classes: PropTypes.object.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  expandButtonAction: PropTypes.func.isRequired,
  ExpandButtonIcon: PropTypes.node.isRequired,
  expandedTexts: PropTypes.array,
  expandedActions: PropTypes.array,
  image: PropTypes.object
};

const ComponentWithStyles = withStyles(styles)(ListRow);

export default ComponentWithStyles;