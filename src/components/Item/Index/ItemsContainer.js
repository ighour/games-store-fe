import React from 'react';
import PropTypes from 'prop-types';
import {withItemStore, withItemRequest} from '../../helpers';
import {ListGroup} from '../../shared';
import ItemContainer from './ItemContainer';

class ItemsContainer extends React.Component { 
  componentDidMount(){
    //Fetch accounts
    this.props.withRequest.fetchAll()
    .catch(() => {
      this.props.store.setAlert("Unable to load items.");
    });
  }

  render(){
    const {store} = this.props;

    const {items, itemCategories} = store;

    const itemsList = Object.keys(items);

    return (
      <ListGroup>
        {itemsList.map(itemId => 
          <ItemContainer
            key={itemId}
            item={items[itemId]}
            categories={itemCategories}
          />
        )}
      </ListGroup>
    );
  }
}

ItemsContainer.propTypes = {
  store: PropTypes.object.isRequired,
  withRequest: PropTypes.object.isRequired
};

const ComponentWithItemStore = withItemStore(ItemsContainer);

const ComponentWithItemRequest = withItemRequest(ComponentWithItemStore);

export default ComponentWithItemRequest;