import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from './Error';

test('renders the error', () => {
  render(<Error error={'test error'} />);
  const errorText = screen.getByText(/test error/i);
  expect(errorText).toBeInTheDocument();
});

test('do not renders the error', () => {
  // Test placeholder
});

