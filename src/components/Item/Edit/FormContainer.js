import React from 'react';
import PropTypes from 'prop-types';
import { withItemRequest, withItemStore } from '../../helpers';
import {Form} from '../../shared';
import {parseFormParams, sortByName} from '../../../helpers';

/* Form parameters */
const params = {
  name: {
    formParams: {
      label: 'Name',
      placeholder: 'Name',
      autoFocus: true,
      required: true
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['required', 'string', 'between:1,255']
  },
  type: {
    formParams: {
      label: 'Type',
      placeholder: 'Type',
      required: true
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['required', 'string', 'in:new,old']
  },
  description: {
    formParams: {
      label: 'Description',
      placeholder: 'Description'
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['string', 'between:1,255']
  },
  amount: {
    formParams: {
      label: 'Amount',
      required: true,
      type: 'number',
      inputProps: {min: 0, max: 9999999.99, step: 0.01}
    },
    transformed: value => {return Number(value)},
    validation: ['required', 'between:0,9999999.99']
  },
  item_category_id: {
    formParams: {
      label: 'Category',
      placeholder: 'Category',
      required: true
    },
    transformed: value => {return value === -1 ? undefined : parseInt(value)},
    validation: ['integer', 'min:0']
  },
  image: {
    initialValue: '',
    formParams: {
      label: 'Image',
      placeholder: 'Image',
      type: 'file',
      helper: '300x200 png'
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: []
  },
  remove_image: {
    initialValue: false,
    formParams: {
      label: 'Remove Image',
      type: 'checkbox'
    },
    transformed: value => {return value !== true ? undefined : value},
    validation: []
  }
};

class FormContainer extends React.Component {
  componentDidMount(){
    //Check item
    this.checkEntity();
  }

  componentDidUpdate(oldProps){
    if(oldProps.match.params.id !== this.props.match.params.id)
      this.checkEntity();
  }

  checkEntity(){
    const {match, history, store} = this.props;
    const itemId = match.params.id;

    if(itemId === undefined){
      history.push('/games');
      return;
    }

    const item = store.items[itemId];

    if(item === undefined || store.itemCategoriesLoaded === false){
      this.fetchItem(itemId);
      return;
    }
    
  }

  fetchItem(id){
    //Fetch item
    this.props.withRequest.fetch(id)
    .catch(() => {
      this.props.setAlert("Unable to load item.");
      this.props.history.push('/games');
    });
  }

  render(){
    const {withRequest, store, match} = this.props;

    const categories = store.itemCategories;
    //Retrieve accounts for show in select
    let select = [];

    let categoriesList = Object.keys(categories);
    sortByName(categoriesList);
    categoriesList.forEach(id => {
      select.push({label: categories[id].name, value: id});
    });

    //Get current info
    const itemId = match.params.id;
    const item =  store.items[itemId];

    //Parse params to reusable component read it
    //and add select options in execution
    const parsedParams = parseFormParams(params, result => {
      result.formParams.item_category_id.select = select;
      result.formParams.type.select = [{label: 'New', value: 'new'}, {label: 'Old', value: 'old'}];

      result.initialValue.name = item && item.name !== null ? item.name : '';
      result.initialValue.type = item && item.type !== null ? item.type : '';
      result.initialValue.description = item && item.description !== null ? item.description : '';
      result.initialValue.amount = item && item.amount !== null ? item.amount : '';
      result.initialValue.item_category_id = item && item.item_category_id !== null ? item.item_category_id : '';
    });

    const onSubmit = (payload, headers) => {
      return withRequest.update(payload, headers, itemId);
    };

    return (
      <Form
        params={parsedParams}
        onSubmit={onSubmit}
        submitText='Update Game'
        submitSuccessText='Game was Updated.'
      />
    );
  }
}

FormContainer.propTypes = {
  withRequest: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const ComponentWithItemRequest = withItemRequest(FormContainer);

const ComponentWithItemStore = withItemStore(ComponentWithItemRequest);

export default ComponentWithItemStore;