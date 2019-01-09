import React from 'react';
import PropTypes from 'prop-types';
import {ListTabs} from '../../../shared';

class TabsContainer extends React.Component {
  render(){
    const {currentCategory, setCurrentCategory, categories, gamesByCategory, itemsList} = this.props;

    const categoriesList = Object.keys(gamesByCategory);

    const elements = [{id: -1, top: 'All', value: false, bottom: itemsList.length + ' games'}];
    categoriesList.forEach(catId => {
      elements.push({
        id: catId,
        top: categories[catId].name,
        bottom: gamesByCategory[catId] !== undefined ? gamesByCategory[catId].length + ' games' : '0 games',
        value: catId
      });
    });

    return (
      <ListTabs
        currentTab={currentCategory}
        setCurrentTab={setCurrentCategory}
        elements={elements}
      />
    );
  }
}

TabsContainer.propTypes = {
  currentCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  setCurrentCategory: PropTypes.func.isRequired,
  gamesByCategory: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  itemsList: PropTypes.array.isRequired
};

export default TabsContainer;