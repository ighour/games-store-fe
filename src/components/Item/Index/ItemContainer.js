import React from 'react';
import PropTypes from 'prop-types';
import { ListRow } from '../../shared';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {formatCurrency} from '../../../helpers';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from "react-router";

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

  onEdit(){
    const {item, history} = this.props;

    history.push(`/games/${item.id}/edit`);
  }

  render(){
    const {item, categories, isOwner} = this.props;

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

    const expandedActions = isOwner(item.user_id) ? [
      {name: 'Edit', icon: <EditIcon/>, onClick: this.onEdit.bind(this)},
      {name: 'Delete', icon: <DeleteIcon/>, onClick: () => this.props.onDelete(item.id)}
    ] : undefined;

    return (
      <ListRow
        primaryText={name}
        secondaryText={category + ' / ' + amount}
        expandButtonAction={this.changeExpanded.bind(this)}
        ExpandButtonIcon={<ExpandMoreIcon/>}
        expandedTexts={expandedTexts}
        expandedActions={expandedActions}
        image={image}
      />
    );
  }
}

ItemContainer.propTypes = {
  item: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  isOwner: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

const ComponentWithRouter = withRouter(ItemContainer);

export default ComponentWithRouter;