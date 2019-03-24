import React from 'react';
import { Provider } from 'react-redux';
import CategoryView from './index';
import renderer from 'react-test-renderer';
import { browserHistory } from 'react-router';
import { shallow, mount, render } from 'enzyme';
import configureStore from 'redux-mock-store';
import { mapStateToProps, mapDispatchToProps } from './index';

const initialState = {};

const createMockStore = (getState) => {
  const middlewares = [];
  return configureStore(middlewares)(getState);
};

const mockStore = createMockStore();
// import { BrowserRouter as Router } from 'react-router-dom';

// it('renders without crashing', () => {
//   shallow(<Appointment />);
// });
// const mockStore = configureStore();

// const mockStore = configureStore();

// describe('<CategoryView /> Render', () => {
//   it('should display the Transactions grouped Category type', () => {

//     const viewtrx = shallow(<CategoryView transactions={transactions} rules={rules} />);
//     it('<CategoryView />renders without crashing', () => {
//       const component = () => viewtrx;
//       expect(component).not.toThrow();
//     });
//     // const CategoryViewo = mount(<Router><CategoryView transactions={transactions} rules={rules} /></Router>);
//     // let viewtrx = CategoryViewo.toJSON();
//     // expect(viewtrx).toMatchSnapshot();
//     // const title = <h3>Team standup meeting</h3>;
//     // expect(appointment.contains(title)).toEqual(true);
//   })
// });
describe('<CategoryView />', () => {
  // it('Expect to have unit tests specified---------------', () => {
  //   expect(true).toEqual(false);
  // });
  // it('should render without throwing an error', () => {
  //   expect(shallow(<CategoryView />).exists(<form className='login'></form>)).toBe(true)
  //  })

  const counter = {
    transactionData:
    {
      "transactionId": "85600b98-74ce-4751-b844-839d209c4f3a",
      "transactionDate": "2015-11-05T08:37:42Z",
      "transactionType": "Withdrawal",
      "transactionDescription": "test⁠test‫ erat eros"
    },
    rulesdata: {
      "ruleMatchValue": "Penalization",
      "ruleMatchType": "contains",
      "ruleFlag": "Red",
      "ruleCategory": "Penalization"
    }
  };

  it('render correctly text component', () => {
    const TextInputComponent = renderer.create(
      <Provider store={mockStore}>
        <CategoryView  />
      </Provider>
    ).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
  });

  // it('should show previously rolled value', () => {
  //   const initialState = {
  //     transactionData:
  //     {
  //       "transactionId": "85600b98-74ce-4751-b844-839d209c4f3a",
  //       "transactionDate": "2015-11-05T08:37:42Z",
  //       "transactionType": "Withdrawal",
  //       "transactionDescription": "test⁠test‫ erat eros"
  //     },
  //   };

    // Just call the method directly passing in sample data
    // to make sure it does what it's supposed to
    // expect(mapStateToProps(initialState).transactionData).toEqual(1);
// });

});
