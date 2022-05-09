import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import Pokedex from '../components/Pokedex';

// Teste no Pokedex.js
describe('Testes para o componente Pokedex.js para avaliar', () => {
  const pokemons = [
    'Pikachu',
    'Charmander',
    'Caterpie',
    'Ekans',
    'Alakazam',
    'Mew',
    'Rapidash',
    'Snorlax',
    'Dragonair',
    'Pikachu',
  ];

  const filterButtons = [
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];

  it('Se não contém o título "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const homeTitle = screen.getByRole('heading',
      { level: 2, name: /encountered pokémons/i });
    expect(homeTitle).toBeInTheDocument();
  });

  it('Se o pokemon é renderizado ao clicar no próximo e se volta ao início', () => {
    renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon);
      expect(pokemonName).toBeInTheDocument();
      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(nextPokemon);
    });
  });

  it('Se apenas um pokemon é renderizado por vez', () => {
    renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      if (pokemon === 'Pikachu') {
        const pikachuPokemon = screen.getByText(pokemon);
        expect(pikachuPokemon).toBeInTheDocument();
      } else {
        const otherPokemon = screen.queryByText(pokemon);
        expect(otherPokemon).not.toBeInTheDocument();
      }
    });

    // const pokemonNameArray = screen.getAllByTestId('pokemon-name');
    // expect(pokemonNameArray).toHaveLength(1);
  });

  it('Se contém os botões de filtro e sua funcionalidade está correta', () => {
    renderWithRouter(<App />);

    const pokemonNameID = screen.getByTestId('pokemon-name');
    const pokemonTypeID = screen.getByTestId('pokemon-type');

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    filterButtons.forEach((button) => {
      const buttonElement = screen.getByRole('button', { name: button });
      expect(buttonElement).toBeInTheDocument();
    });

    const allFilterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allFilterButtons).toHaveLength(filterButtons.length);

    // Avaliação de tipo com mais de um pokemon
    const firePokemons = ['Charmander', 'Rapidash', 'Charmander'];
    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);

    firePokemons.forEach((firePokemon) => {
      const pokemonName = screen.getByText(firePokemon);
      expect(pokemonName).toBeInTheDocument();

      // Utilização do matcher .toHaveTextContent proveniente do Stack OverFlow
      // link: https://stackoverflow.com/questions/55509875/how-to-query-by-text-string-which-contains-html-tags-using-react-testing-library
      expect(pokemonTypeID).toHaveTextContent(/fire/i);

      userEvent.click(nextPokemon);
    });

    // Avaliação apenas um pokemon por tipo
    const normalButton = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normalButton);

    expect(pokemonNameID).toBeInTheDocument();
    expect(pokemonTypeID).toHaveTextContent(/normal/i);

    expect(pokemonNameID).toHaveTextContent(/snorlax/i);
    userEvent.click(nextPokemon);
    expect(pokemonNameID).toHaveTextContent(/snorlax/i);
  });

  it('Se ao clicar no botão All todos os pokemon remove o filtro', () => {
    renderWithRouter(<App />);

    const pokemonNameID = screen.getByTestId('pokemon-name');
    const pokemonTypeID = screen.getByTestId('pokemon-type');

    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(dragonButton);

    expect(pokemonNameID).toBeInTheDocument();
    expect(pokemonTypeID).toHaveTextContent(/dragon/i);

    expect(pokemonNameID).toHaveTextContent(/dragonair/i);
    userEvent.click(nextPokemon);
    expect(pokemonNameID).toHaveTextContent(/dragonair/i);

    const allPokemon = screen.getByRole('button', { name: /all/i });
    userEvent.click(allPokemon);

    pokemons.forEach((pokemon) => {
      const name = screen.getByText(pokemon);
      expect(name).toBeInTheDocument();
      userEvent.click(nextPokemon);
    });
  });
});
