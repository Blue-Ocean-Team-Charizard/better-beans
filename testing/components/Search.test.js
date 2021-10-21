/* eslint-disable no-undef */
import { render, screen, cleanup } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Search from '../../components/Search';

describe('Search.js', () => {
  beforeAll(() => {
    render(<Search />);
  });

  afterAll(() => {
    cleanup();
  });

  it('creates a button that says `Near Me`', () => {
    const button = screen.getByText('Near Me');
    expect(button).toBeInTheDocument();
  });
});
