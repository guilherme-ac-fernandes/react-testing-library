import React from 'react';
// import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Teste no GenerationsDetails.js
describe('Testes para o componente GenerationsDetails.js para avaliar', () => {
  it('GenerationsDetails', () => {
    renderWithRouter(<App />);
  });
});
