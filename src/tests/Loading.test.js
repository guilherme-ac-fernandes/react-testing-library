import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Loading from '../bonus/Loading';

// Teste no Loading.js
describe('Testes para o componente Loading.js para avaliar', () => {
  it('Texto Loading aparece na tela', () => {
    renderWithRouter(<Loading />);

    const loadingTitle = screen.getByRole('heading',
      { level: 4, name: /loading/i });
    expect(loadingTitle).toBeInTheDocument();
  });
});
