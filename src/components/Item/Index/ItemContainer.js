import React from 'react';
import PropTypes from 'prop-types';
import { ListRow } from '../../shared';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {formatCurrency} from '../../../helpers';

class ItemContainer extends React.Component { 
  constructor(props){
    super(props);
    this.state = {expanded: false};
  }

  changeExpanded(){
    if(this.state.expanded === true)
      this.setState({expanded: false});
    else
      this.setState({expanded: true});
  }

  render(){
    const {item, categories} = this.props;

    const name = item.name;
    const type = item.type;
    const amount = formatCurrency(item.amount);
    const category = item.item_category_id ? categories[item.item_category_id].name : 'No Category';
    const description = item.description;
    const contact = item.relation_user;

    const expandedTexts = [];
    expandedTexts.push({label: 'Contact:', value: contact});
    expandedTexts.push({label: 'Value:', value: amount});
    expandedTexts.push({label: 'Type:', value: type});
    if(description)
      expandedTexts.push({label: 'Description:', value: description});

    const defaultImgPath = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_DEFAULT_GAME_PATH;

    const image = {
      name: 'game',
      src: item.image !== null ? process.env.REACT_APP_API_URL + item.image : defaultImgPath,
      fallback: defaultImgPath,
      position: 'top'
    };

    return (
      <ListRow
        primaryText={name}
        secondaryText={category + ' / ' + amount}
        expandButtonAction={this.changeExpanded.bind(this)}
        ExpandButtonIcon={<ExpandMoreIcon/>}
        expandedTexts={expandedTexts}
        image={image}
      />
    );
  }
}

ItemContainer.propTypes = {
  item: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired
};

export default ItemContainer;