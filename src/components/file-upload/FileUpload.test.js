import React from 'react';
import { render } from '@testing-library/react';
import FileUpload from './FileUpload';

test('renders learn react link', () => {
  const { getByText } = render(<FileUpload />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
