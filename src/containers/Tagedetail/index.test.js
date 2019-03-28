import React from 'react';
import { TagCloud } from "react-tagcloud";
import { shallow, mount } from 'enzyme';
import Tagedetail from './index';
const lcoationdetails = {
  state: {
    match: {
      details: 'ruleMatchValue'
    }
  }
}
const historyMock = { push: jest.fn() };

const wrapper = shallow(<Tagedetail location={lcoationdetails} history={historyMock} />);
const instance = wrapper.instance();
beforeAll(() => {
  Object.defineProperty(global, 'document', {});
})
describe('<Tagedetail /> Component', () => {;

  it('should render without crash', () => {
    expect(wrapper.find(TagCloud)).toHaveLength(1);
    jest.spyOn(instance, 'goback');
    
    wrapper.find('a').simulate('click');
    expect(historyMock.push.mock.calls[0]).toEqual(['/']);

  });
});

describe('Test TagCLoud plugin', () => {

  it('should call go when it is Mouse over', function () {
    expect(wrapper.find(TagCloud)).toHaveLength(1);
    const count = 25;
    wrapper.find(TagCloud).simulate('mouseover', count);
    wrapper.setState({ displaycount: true, count: count });

  });
});

// describe('TagCLoud onClick', () => {

//   it('should call go when Tag has got click over', function () {
//     expect(wrapper.find(TagCloud)).toHaveLength(1);
//     const details = [
//       {
//         transactionId: '23123324',
//         transactionDescription: 'test'
//       },
//       {
//         transactionId: '34324324',
//         transactionDescription: 'testee'
//       },
//     ];
//     const highlightedItem = 'Loan';
//     wrapper.find(TagCloud).simulate('click',  [{ details, highlightedItem }]);
//     wrapper.setState({ highlitedItem: details, displaycount: false });

//   });
// });

