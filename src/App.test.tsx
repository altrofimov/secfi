import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the application', () => {
  render(<App />);
  const header = screen.getByText(/Currency Exchange/i);
  expect(header).toBeInTheDocument();
});

test('renders the Exchange Form', () => {
  // test placeholder
});

test('renders the Exchange Rate', () => {
  // test placeholder
});

test('renders the Chart', () => {
  // test placeholder
});

test('renders the error', () => {
  // test placeholder
});

test('changes the Currencies', () => {
  // test placeholder
});

test('converts the Currencies Values', () => {
  // test placeholder
});
