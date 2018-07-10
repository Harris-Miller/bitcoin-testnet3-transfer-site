import React from 'react';
import { shallow } from 'enzyme';
import Fab from '../fab';

describe('Component Fab', () => {
  it('renders without crashing', () => {
    shallow(<Fab />);
  });
});
