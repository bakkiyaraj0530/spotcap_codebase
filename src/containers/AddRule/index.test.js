import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import AddRule from './index';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock'

// import ReactTestUtils from 'react-dom/test-utils';
import { spy } from 'sinon';
import configureStore from 'redux-mock-store';
import { wait } from 'react-testing-library';

const createMockStore = (getState) => {
    const middlewares = [];
    return configureStore(middlewares)(getState);
};

const mockStore = createMockStore();

const TextInputComponent = renderer.create(
    <Provider store={mockStore}>
        <AddRule />
    </Provider>
).toJSON();
expect(TextInputComponent).toMatchSnapshot();


const historyMock = { push: jest.fn() };
const wrapper = shallow(<AddRule history={historyMock} />);
const instance = wrapper.instance();

describe('<AddRule /> Component', () => {
    it('should render without crash', () => {

        // console.log(wrapper.debug());
        expect(wrapper.find('a')).toHaveLength(1);

        jest.spyOn(instance, 'gotoHome');
        wrapper.find('a').simulate('click');

        expect(historyMock.push.mock.calls[0]).toEqual(['/']);

    });

    it('calls onSubmit prop function when form is submitted', () => {
        afterEach(() => {
            // restore fetch() to its native implementation
            fetchMock.restore()
          })
        jest.spyOn(instance, 'handleSubmit');
        wrapper.instance().forceUpdate();
        const form = wrapper.find('form');
        form.simulate('submit', {
            preventDefault: () => { }
        });
        wrapper.setState({ matchvalue: '', matchtype: '', matchflag: '', matchcategory: '', success: true, });
    });
});



