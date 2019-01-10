import React from 'react';
import PropTypes from 'prop-types';
import { withItemRequest, withItemStore, withItemCategoryRequest } from '../../helpers';
import {Form, FloatingMenu} from '../../shared';
import {parseFormParams, sortByName} from '../../../helpers';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import GamesIcon from '@material-ui/icons/Games';

/* Form parameters */
const params = {
  name: {
    initialValue: '',
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
    initialValue: 'new',
    formParams: {
      label: 'Type',
      placeholder: 'Type',
      required: true
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['required', 'string', 'in:new,old']
  },
  description: {
    initialValue: '',
    formParams: {
      label: 'Description',
      placeholder: 'Description'
    },
    transformed: value => {return value.length === 0 ? undefined : value},
    validation: ['string', 'between:1,255']
  },
  amount: {
    initialValue: 0,
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
    initialValue: -1,
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
    transformed: value => {return value},
    validation: []
  }
};

class FormContainer extends React.Component {
  componentDidMount(){
    //Fetch accounts
    this.props.withItemCategoryRequest.fetchAll()
    .catch(() => {
      this.props.setAlert("Unable to load item categories.");
    });
  }

  render(){
    const {withRequest, store} = this.props;

    const categories = store.itemCategories;
    //Retrieve accounts for show in select
    let select = [];

    let categoriesList = Object.keys(categories);
    sortByName(categoriesList);
    categoriesList.forEach(id => {
      select.push({label: categories[id].name, value: id});
    });

    //Parse params to reusable component read it
    //and add select options in execution
    const parsedParams = parseFormParams(params, result => {
      result.formParams.item_category_id.select = select;
      result.formParams.type.select = [{label: 'New', value: 'new'}, {label: 'Old', value: 'old'}];
    });

    const onSubmit = (payload, headers) => {
      return withRequest.storeElement(payload, headers);
    };

    const menu = [];
    menu.push({action: '/games', icon: VideogameAssetIcon});

    if(store.isAuth())
      menu.push({action: '/games/' + store.auth.id, icon: GamesIcon});

    return (
      <React.Fragment>
        <Form
          params={parsedParams}
          onSubmit={payload => onSubmit(payload)}
          submitText='Add Game'
          submitSuccessText='Game was Added.'
        />
        <FloatingMenu
          menu={menu}
        />
      </React.Fragment>
    );
  }
}

FormContainer.propTypes = {
  withRequest: PropTypes.object.isRequired,
  withItemCategoryRequest: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const ComponentWithItemRequest = withItemRequest(FormContainer);

const ComponentWithItemCategoryRequest = withItemCategoryRequest(ComponentWithItemRequest, 'withItemCategoryRequest');

const ComponentWithItemStore = withItemStore(ComponentWithItemCategoryRequest);

export default ComponentWithItemStore;