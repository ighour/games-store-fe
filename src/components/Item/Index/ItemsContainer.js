import React from 'react';
import PropTypes from 'prop-types';
import {withItemStore, withItemRequest} from '../../helpers';
import {ListGroup} from '../../shared';
import ItemContainer from './ItemContainer';
import Tabs from './Tabs';

class ItemsContainer extends React.Component { 
  constructor(props){
    super(props);
    this.state = {currentCategory: false};
  }

  componentDidMount(){
    //Fetch accounts
    this.props.withRequest.fetchAll()
    .catch(() => {
      this.props.store.setAlert("Unable to load items.");
    });
  }

  setCurrentCategory(event, category){
    this.setState({currentCategory: category});
  }

  render(){
    const {store} = this.props;

    const {currentCategory} = this.state;

    const {items, itemCategories} = store;

    const itemsList = Object.keys(items);

    const gamesByCategory = itemsList.reduce((carrier, id) => {
      let item = items[id];

      let categoryId = item.item_category_id;
      
      if(!carrier.hasOwnProperty(categoryId))
        carrier[categoryId] = [item];
      else
        carrier[categoryId].push(item);

      return carrier;
    }, {});

    const allGames = itemsList.reduce((carrier, id) => {
      let item = items[id];

      carrier.push(item);

      return carrier;
    }, []);

    const currentItems = currentCategory === false ? allGames : (gamesByCategory[currentCategory] !== undefined ? gamesByCategory[currentCategory] : []);

    return (
      <React.Fragment>
        <Tabs
          currentCategory={currentCategory}
          setCurrentCategory={this.setCurrentCategory.bind(this)}
          gamesByCategory={gamesByCategory}
          categories={itemCategories}
          items={items}
        />
        <ListGroup>
          {currentItems.map(item => 
            <ItemContainer
              key={item.id}
              item={item}
              categories={itemCategories}
            />
          )}
        </ListGroup>
      </React.Fragment>
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