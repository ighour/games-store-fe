import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListRow } from '../../../../shared';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {formatCurrency} from '../../../../../helpers';

const Summary = props => {
  const {groupsByName, groupNames, setCurrentGroup} = props;

  return (
    <ListGroup>
      {groupNames.map(groupName =>
        <ListRow
          key={groupName}
          primaryText={groupsByName[groupName].name}
          secondaryText={formatCurrency(groupsByName[groupName].amount)}
          expandButtonAction={() => setCurrentGroup(undefined, groupName)}
          ExpandButtonIcon={<ArrowForwardIcon/>}
        />
      )}
    </ListGroup>
  );
};

Summary.propTypes = {
  groupsByName: PropTypes.object.isRequired,
  groupNames: PropTypes.array.isRequired,
  setCurrentGroup: PropTypes.func.isRequired
};

export default Summary;