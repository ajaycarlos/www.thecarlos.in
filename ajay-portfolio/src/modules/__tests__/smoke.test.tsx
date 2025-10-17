import { render, screen } from '@testing-library/react';
import React from 'react';
import { App } from '../App';

test('renders hero name', () => {
  render(<App />);
  expect(screen.getByText(/Ajay Pulikkal/i)).toBeInTheDocument();
});
