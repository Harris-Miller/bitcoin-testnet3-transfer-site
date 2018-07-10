import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../text-input';

describe('Component TextInput', () => {
  it('renders without crashing', () => {
    shallow(<TextInput id="test" label="I am a Test" />);
  });
});
