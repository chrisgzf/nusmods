import * as React from 'react';
import { shallow } from 'enzyme';
import { fireEvent, render } from '@testing-library/react';
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

  describe('Clear search input button', () => {
    it('should render when there is text input', () => {
      const { queryByTestId } = render(
        <SearchBox
          throttle={0}
          useInstantSearch={false}
          isLoading
          value="Some input"
          placeholder="Some placeholder"
          onChange={jest.fn()}
          onSearch={jest.fn()}
        />,
      );
      expect(queryByTestId('removeInputBtn')).toBeInTheDocument();
    });

    it('should not render when there is no text input', () => {
      const { queryByTestId } = render(
        <SearchBox
          throttle={0}
          useInstantSearch={false}
          isLoading
          value=""
          onChange={jest.fn()}
          onSearch={jest.fn()}
        />,
      );
      expect(queryByTestId('removeInputBtn')).not.toBeInTheDocument();
    });

    it('should clear all text when pressed', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <SearchBox
          throttle={0}
          useInstantSearch={false}
          isLoading
          value="Some input"
          placeholder="Some placeholder"
          onChange={onChange}
          onSearch={jest.fn()}
        />,
      );
      fireEvent.click(getByTestId('removeInputBtn'));
      expect(onChange).toBeCalledWith('');
    });
  });

  describe('Search input', () => {
    it('should search when submitted', () => {
      const onSearch = jest.fn();
      const onBlur = jest.fn();
      const onChange = jest.fn();
      // SearchBox.search = jest.fn();
      const { getByRole } = render(
        <SearchBox
          throttle={0}
          useInstantSearch
          isLoading={false}
          value="Some input"
          placeholder="Some placeholder"
          onChange={onChange}
          onSearch={onSearch}
          onBlur={onBlur}
        />,
      );
      const searchInput = getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: 'New input' } });
      expect(onChange).toBeCalledWith('New input');
    });
  });
});
