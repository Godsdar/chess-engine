/* eslint-disable testing-library/no-container, testing-library/no-node-access */
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the board container', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.App')).toBeInTheDocument();
});
