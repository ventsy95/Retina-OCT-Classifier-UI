import React from 'react';
import { render } from '@testing-library/react';
import LogIn from './LogIn';

test('renders learn react link', () => {
  const { getByText } = render(<LogIn />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
