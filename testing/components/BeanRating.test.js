/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import BeanRating from '../../components/BeanRating';

describe('Home', () => {
  it('renders a heading', () => {
    render(<BeanRating rating={5} />);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
