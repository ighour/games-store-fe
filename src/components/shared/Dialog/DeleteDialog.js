import React from 'react';
import PropTypes from 'prop-types';
import Dialog from './Dialog';

class DeleteDialog extends React.Component {
  render() {
    const {open, onCancel, onConfirm, title, text} = this.props;

    return (
      <Dialog
        open={open}
        onCancel={onCancel}
        onConfirm={onConfirm}
        title={title}
        text={text}
        cancelButtonName='Cancel'
        confirmButtonName='Confirm and Delete'
      />
    );
  }
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  text: PropTypes.string
};

DeleteDialog.defaultProps = {
  title: 'Confirm deleting item.',
  text: "Be aware that after deleting you will lose this data forever. Also, deleting an item may affect other items and entities."
};

export default DeleteDialog;