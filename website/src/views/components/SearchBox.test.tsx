import * as React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './SearchBox';

describe('<SearchBox />', () => {
  it('should render', () => {
    expect(
      shallow(
        <SearchBox
          throttle={0}
          useInstantSearch={false}
          isLoading={false}
          value=""
          onChange={jest.fn()}
          onSearch={jest.fn()}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('should render loading state', () => {
    expect(
      shallow(
        <SearchBox
          throttle={0}
          useInstantSearch={false}
          isLoading
          value=""
          onChange={jest.fn()}
          onSearch={jest.fn()}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('should render with value and placeholder', () => {
    expect(
      shallow(
        <SearchBox
          throttle={0}
          useInstantSearch={false}
          isLoading={false}
          value="Hello world"
          placeholder="Testing testing 123"
          onChange={jest.fn()}
          onSearch={jest.fn()}
        />,
      ),
    ).toMatchSnapshot();
  });
});
