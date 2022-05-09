import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
// import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

// Teste no Pokemon.js
describe('Testes para o componente PokemonDetails.js para avaliar', () => {
  const pokemonIndex = 6;
  const pokemon = pokemons[pokemonIndex];

  it('Contém os componentes com as informações do pokemon', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    for (let i = 0; i < pokemonIndex; i += 1) {
      userEvent.click(nextPokemon);
    }

    const moreDetailsLink = screen.queryByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const stringTitle = `${pokemon.name} Details`;
    const moreDetailsTitle = screen.getByRole('heading', { level: 2, name: stringTitle });
    expect(moreDetailsTitle).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading',
      { level: 2, name: /summary/i });
    expect(summaryTitle).toBeInTheDocument();

    const paragraph = screen.getByText(pokemon.summary, { selector: 'p' });
    expect(paragraph).toBeInTheDocument();
  });

  it('Verifica se os mapas foi renderizado corretamente', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    for (let i = 0; i < pokemonIndex; i += 1) {
      userEvent.click(nextPokemon);
    }

    const moreDetailsLink = screen.queryByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const stringMapTitle = `Game Locations of ${pokemon.name}`;
    const mapTitle = screen.getByRole('heading', { level: 2, name: stringMapTitle });
    expect(mapTitle).toBeInTheDocument();

    const altTextImage = `${pokemon.name} location`;
    const imageMaps = screen.getAllByRole('img', { name: altTextImage });
    expect(imageMaps).toHaveLength(pokemon.foundAt.length);

    pokemon.foundAt.forEach(({ location, map }, index) => {
      const locationName = screen.getByText(location);
      expect(locationName).toBeInTheDocument();
      expect(imageMaps[index]).toBeInTheDocument();
      expect(imageMaps[index]).toHaveAttribute('src', map);
    });
  });

  it('Verifica o pokemon pode ser favoritado na página de detalhes', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    for (let i = 0; i < pokemonIndex; i += 1) {
      userEvent.click(nextPokemon);
    }

    const moreDetailsLink = screen.queryByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(checkbox);

    const starName = `${pokemon.name} is marked as favorite`;
    const star = screen.queryByRole('img', { name: starName });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(checkbox);
    expect(star).not.toBeInTheDocument();
  });
});
