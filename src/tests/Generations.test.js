import React from 'react';
// import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Teste no Generations.js
describe('Testes para o componente Generations.js para avaliar', () => {
  it('Generations', () => {
    renderWithRouter(<App />);
  });
});
