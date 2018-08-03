/* eslint-disable filenames/match-regex */
/* eslint-disable import/no-extraneous-dependencies */

// this file is automatically read by `react-scripts test`

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;
