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

  onDelete(id){
    const item = this.props.store.items[id];

    this.props.withRequest.destroy(item)
    .then(() => {
      this.props.store.setAlert("Game was deleted.", "primary");
    })
    .catch(error => {
      let data = error.response.data;
      
      this.props.store.setAlert(data.message);
    })
    .finally(() => {
      this.setState({deleteDialog: false});
    });
  }

  render(){
    const {store, match} = this.props;

    const {currentCategory} = this.state;

    const {items, itemCategories, auth} = store;

    let itemsList = Object.keys(items);

    const user = match.params.user;
    if(user !== undefined){
      itemsList = itemsList.filter(itemId => {
        let item = items[itemId];

        return parseInt(item.user_id) === parseInt(user);
      });
    }

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

    const isOwner = (id) => {
      if(auth.id === undefined || parseInt(auth.id) !== parseInt(id))
        return false;

      return true;
    };

    return (
      <React.Fragment>
        <Tabs
          currentCategory={currentCategory}
          setCurrentCategory={this.setCurrentCategory.bind(this)}
          gamesByCategory={gamesByCategory}
          categories={itemCategories}
          itemsList={itemsList}
        />
        <ListGroup>
          {currentItems.map(item => 
            <ItemContainer
              key={item.id}
              item={item}
              categories={itemCategories}
              isOwner={isOwner.bind(this)}
              onDelete={this.onDelete.bind(this)}
            />
          )}
        </ListGroup>
      </React.Fragment>
    );
  }
}

ItemsContainer.propTypes = {
  store: PropTypes.object.isRequired,
  withRequest: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const ComponentWithItemStore = withItemStore(ItemsContainer);

const ComponentWithItemRequest = withItemRequest(ComponentWithItemStore);

export default ComponentWithItemRequest;