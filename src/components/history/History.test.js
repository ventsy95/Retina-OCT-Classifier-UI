import React from 'react';
import { render } from '@testing-library/react';
import History from './History';

test('renders learn react link', () => {
  const { getByText } = render(<History />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
