import React from 'react';
import { render } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';

test('renders learn react link', () => {
  const { getByText } = render(<RegistrationForm />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
