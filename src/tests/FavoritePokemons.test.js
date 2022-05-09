import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Teste no FavoritePokemons.js
describe('Testes para o componente FavoritePokemons.js para avaliar', () => {
  it('Se não contém pokemon favoritado ao renderizar', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const favoriteTitle = screen.getByRole('heading',
      { level: 2, name: /favorite pokémons/i });
    expect(favoriteTitle).toBeInTheDocument();

    const paragraphText = /No favorite pokemon found/i;
    const paragraphEmpty = screen.getByText(paragraphText, { selector: 'p' });
    expect(paragraphEmpty).toBeInTheDocument();
  });

  it('Se contém pokemon favoritado ao adicionar', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(checkbox);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const favoriteTitle = screen.getByRole('heading',
      { level: 2, name: /favorite pokémons/i });
    expect(favoriteTitle).toBeInTheDocument();

    const pokemonNameArray = screen.getAllByTestId('pokemon-name');
    expect(pokemonNameArray).toHaveLength(1);
  });
});
