import React from 'react';
import { Provider } from 'react-redux';
import { TagCloud } from "react-tagcloud";
import CategoryView from './index';

import renderer from 'react-test-renderer';
import { browserHistory } from 'react-router';
import { shallow, mount, render } from 'enzyme';
import configureStore from 'redux-mock-store';
// import { stub } from 'sinon';

const mockStore = configureStore();
let wrapper;
let store;

const rulesList = [
  {
    "ruleMatchValue": "Interest",
    "ruleMatchType": "contains",
    "ruleFlag": "Yellow",
    "ruleCategory": "Interest"
  }
];

const txlist = [
  {
    "transactionId": "f8d8acd5-51b7-41eb-8a7c-d4fb5093af97",
    "transactionDate": "2016-09-08T19:50:40Z",
    "transactionType": "Deposit",
    "transactionDescription": "‫test‫ "
  }
];

const initialState = {
  transactions: {
    transactionsdata: txlist,
    rulesdata: rulesList
  }
};
beforeEach(() => {
  //creates the store with any initial state or middleware needed  
  store = mockStore(initialState);
  wrapper = mount(<Provider store={store} >
    <CategoryView /></Provider>);
})
describe('Container Login', () => {
  it('should render the container component', () => {

    expect(wrapper.find(CategoryView).length).toEqual(1);
    expect(wrapper.props().store.getState().transactions).toEqual({ transactionsdata: txlist, rulesdata: rulesList });
  });
});

describe('<CategoryView />', () => {
  it('Handle Tag On Click Method', () => {
    expect(wrapper.find(TagCloud)).toHaveLength(1);
    const details = {
      transactionId: '23123324',
      transactionDescription: 'test'
    };
    const highlightedItem = 'Loan';
    wrapper.find(TagCloud).simulate('click', [{ details, highlightedItem }]);
  });
});
