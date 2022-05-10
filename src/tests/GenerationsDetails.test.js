import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import GenerationsDetails from '../components/GenerationsDetails';
import App from '../App';

const changeName = (string) => string[0].toUpperCase() + string.slice(1);

// Teste no GenerationsDetails.js
describe('Testes para o componente GenerationsDetails.js para avaliar', () => {
  const props = {
    match: {
      params: {
        id: '1',
      },
    },
  };

  const pokemonGens = 8;

  it('Avaliar se existe o GenerationsDetails e muda a rota corretamente', async () => {
    renderWithRouter(<App />);

    const generationsLink = screen.getByRole('link', { name: /generations/i });
    expect(generationsLink).toBeInTheDocument();
    userEvent.click(generationsLink);

    const loaging = await screen.findByText(/loading/i);
    expect(loaging).toBeInTheDocument();
    await waitFor(() => expect(loaging).not.toBeInTheDocument());

    const generationsTitle = screen.getByRole('heading',
      { level: 2, name: /generations/i });
    expect(generationsTitle).toBeInTheDocument();

    const moreDetailsLinks = screen.getAllByRole('link', { name: /more details/i });

    expect(moreDetailsLinks).toHaveLength(pokemonGens);

    userEvent.click(moreDetailsLinks[0]);
    await waitFor(() => expect(loaging).not.toBeInTheDocument());

    const pokeTitle = await screen.findByRole('heading', { level: 2, name: /pokemon/i });
    expect(pokeTitle).toBeInTheDocument();
  });

  it('Avaliar se existe o GenerationsDetails e muda a rota corretamente', async () => {
    const generation = {
      main_region: {
        name: 'kanto',
        url: 'https://pokeapi.co/api/v2/region/1/',
      },
      pokemon_species: [{
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
      }, {
        name: 'charmander',
        url: 'https://pokeapi.co/api/v2/pokemon-species/4/',
      }, {
        name: 'squirtle',
        url: 'https://pokeapi.co/api/v2/pokemon-species/7/',
      }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(generation),
    });

    renderWithRouter(<GenerationsDetails { ...props } />);
    expect(global.fetch).toBeCalledTimes(1);

    const loaging = await screen.findByText(/loading/i);
    await waitFor(() => expect(loaging).not.toBeInTheDocument());

    const kantoTitle = `${changeName(generation.main_region.name)} Pokemon`;
    const genTitle = screen.getByRole('heading', { level: 2, name: kantoTitle });
    expect(genTitle).toBeInTheDocument();

    const pokemonName = generation.pokemon_species.map(({ name }) => name);
    pokemonName.forEach((poke) => {
      const pokeElement = screen.getByText(changeName(poke));
      expect(pokeElement).toBeInTheDocument();
    });
  });

  it('Avaliar o retorno do fetch - com erro', async () => {
    const error = 'There was an issue with this fetch';

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockRejectedValue(error),
    });

    renderWithRouter(<GenerationsDetails { ...props } />);
    expect(global.fetch).toBeCalledTimes(1);
  });
});
