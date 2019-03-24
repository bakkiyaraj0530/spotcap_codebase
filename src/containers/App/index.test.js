import React from 'react';
import App from './index';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  shallow(<App />);
});
