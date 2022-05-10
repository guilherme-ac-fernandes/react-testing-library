import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

// Teste no Pokemon.js
describe('Testes para o componente Pokemon.js para avaliar', () => {
  const pokemon = pokemons[1];

  it('Contém os componentes com as informações do pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(pokemon.name);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(pokemon.type);

    const weight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = pokemon.averageWeight;
    const averageWeight = `Average weight: ${value} ${measurementUnit}`;
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(averageWeight);

    const image = screen.getByRole('img', { name: `${pokemon.name} sprite` });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', pokemon.image);
  });

  it('Verifica a renderização dos mais detalhes do pokemon e a rota', () => {
    const { history } = renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    // Utilização do atributo href proveniente do Stack OverFlow
    // link: https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);

    const stringTitle = `${pokemon.name} Details`;
    const moreDetailsTitle = screen.getByRole('heading', { level: 2, name: stringTitle });
    expect(moreDetailsTitle).toBeInTheDocument();

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
