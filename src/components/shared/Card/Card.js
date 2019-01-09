import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
    textAlign: 'left'
  },
  media: {
    height: '100px',
    width: '100px',
    borderRadius: '2%',
    margin: '10px auto'
  }
};

function MediaCard(props) {
  const { classes, imageSrc, imageTitle, title, attributes, buttons } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageSrc}
          title={imageTitle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {attributes.map(a =>
            <Typography component="p" key={a.label}>
              {a.label}: &nbsp; {a.value}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {buttons.map(b =>
          <Button size="small" color="primary" onClick={b.action} key={b.label}>
            {b.label}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  attributes: PropTypes.array.isRequired,
  buttons: PropTypes.array.isRequired
};

export default withStyles(styles)(MediaCard);