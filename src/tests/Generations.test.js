import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Generations from '../bonus/Generations';
import App from '../App';

const changeName = (phrase) => {
  const arrayString = phrase.split('-');
  const string1 = arrayString[0][0].toUpperCase() + arrayString[0].slice(1);
  const string2 = arrayString[1].toUpperCase();
  return `${string1} ${string2}`;
};

// Teste no Generations.js
describe('Testes para o componente Generations.js para avaliar', () => {
  it('Avaliar se existe o Generations e muda a rota corretamente', async () => {
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
  });

  it('Avaliar o retorno do fetch - com sucesso', async () => {
    const generations = {
      results: [{
        name: 'generation-i',
        url: 'https://pokeapi.co/api/v2/generation/1/',
      }, {
        name: 'generation-ii',
        url: 'https://pokeapi.co/api/v2/generation/2/',
      }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(generations),
    });

    renderWithRouter(<Generations />);
    expect(global.fetch).toBeCalledTimes(1);

    const loaging = await screen.findByText(/loading/i);
    await waitFor(() => expect(loaging).not.toBeInTheDocument());

    generations.results.forEach(({ name }) => {
      const generationText = screen.getByText(changeName(name));
      expect(generationText).toBeInTheDocument();
    });
  });

  it('Avaliar o retorno do fetch - com erro', async () => {
    const error = 'There was an issue with this fetch';

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockRejectedValue(error),
    });

    renderWithRouter(<Generations />);
    expect(global.fetch).toBeCalledTimes(1);
  });
});
