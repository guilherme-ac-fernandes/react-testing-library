import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

// Teste no NotFound.js
describe('Testes para o componente NotFound.js para avaliar', () => {
  it('Se contém o título "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Contém uma imagem específica', () => {
    renderWithRouter(<NotFound />);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altImage = /pikachu crying because the page requested was not found/i;
    const image = screen.getByRole('img', { name: altImage });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', URL);
  });
});
