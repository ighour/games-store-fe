import React from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog as MaterialDialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@material-ui/core';

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

class Dialog extends React.Component {
  render() {
    const {open, onCancel, onConfirm, onExtra, title, text, cancelButtonName, confirmButtonName, extraButtonName, children} = this.props;

    const texts = typeof text === 'string' ? [text] : text;

    return (
      <div>
        <MaterialDialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={onCancel}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {title}
          </DialogTitle>
          <DialogContent style={{textAlign: 'justify'}}>
            {texts.map(t =>
              <DialogContentText id="alert-dialog-slide-description" key={t}>
                {t}
              </DialogContentText>  
            )}
          </DialogContent>
          {children &&
          <DialogContent>
            {children}
          </DialogContent>
          }
          <DialogActions>
            <Button onClick={onCancel} color="primary">
              {cancelButtonName}
            </Button>
            {onExtra && extraButtonName &&
            <Button onClick={onExtra} color="primary">
              {extraButtonName}
            </Button>
            }
            {onConfirm && confirmButtonName &&
            <Button onClick={onConfirm} color="primary">
              {confirmButtonName}
            </Button>
            }
          </DialogActions>
        </MaterialDialog>
      </div>
    );
  }
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  onExtra: PropTypes.func,
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  cancelButtonName: PropTypes.string.isRequired,
  confirmButtonName: PropTypes.string,
  extraButtonName: PropTypes.string,
  children: PropTypes.node
};

export default Dialog;