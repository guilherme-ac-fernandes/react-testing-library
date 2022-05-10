import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Locations from '../components/Locations';

const changeName = (phrase) => {
  const arrayString = phrase.split('-');
  const arrayChange = arrayString.map((str) => str[0].toUpperCase() + str.slice(1));
  const newPhrase = arrayChange.join(' ');
  return newPhrase;
};

// Teste no Locations.js
describe('Testes para o componente Locations.js para avaliar', () => {
  it('Avaliar se existe o Locations e muda a rota corretamente', async () => {
    renderWithRouter(<App />);

    const locationsLink = screen.getByRole('link', { name: /locations/i });
    expect(locationsLink).toBeInTheDocument();
    userEvent.click(locationsLink);

    const loaging = await screen.findByText(/loading/i);
    expect(loaging).toBeInTheDocument();
    await waitFor(() => expect(loaging).not.toBeInTheDocument());

    const locationsTitle = screen.getByRole('heading',
      { level: 2, name: /locations/i });
    expect(locationsTitle).toBeInTheDocument();
  });

  // Aplicação do teste de forma correta (adição da chave results no objeto a ser mockado)
  // proveniente da ajuda do instrutor Pessini (Turma 20 - Triba A)
  it('Avaliar o retorno do fetch - com sucesso', async () => {
    const location = {
      results: [{
        name: 'great-marsh',
        url: 'https://pokeapi.co/api/v2/location/11/',
      }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(location),
    });

    renderWithRouter(<Locations />);
    expect(global.fetch).toBeCalledTimes(1);

    const loaging = await screen.findByText(/loading/i);
    await waitFor(() => expect(loaging).not.toBeInTheDocument());

    const locationName = changeName(location.results[0].name);
    const locationNameElement = screen.getByText(locationName);
    expect(locationNameElement).toBeInTheDocument();
  });

  it('Avaliar comportamento dos botões', async () => {
    const location = {
      results: [{
        name: 'great-marsh',
        url: 'https://pokeapi.co/api/v2/location/11/',
      }, {
        name: 'sunyshore-city',
        url: 'https://pokeapi.co/api/v2/location/4/',
      }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(location),
    });

    renderWithRouter(<Locations />);
    expect(global.fetch).toBeCalledTimes(1);

    const loaging = await screen.findByText(/loading/i);
    await waitFor(() => expect(loaging).not.toBeInTheDocument());

    const locationName = changeName(location.results[0].name);
    const locationNameElement = screen.getByText(locationName);
    expect(locationNameElement).toBeInTheDocument();

    // Botão Previous
    const previousButton = screen.getByRole('button', { name: /previuos/i });
    expect(previousButton).toBeInTheDocument();
    userEvent.click(previousButton);
    expect(screen.getByText(/great marsh/i)).toBeInTheDocument();
    expect(screen.getByText('1/2')).toBeInTheDocument();
    expect(screen.queryByText(/sunyshore city/i)).not.toBeInTheDocument();

    // Botão Next
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText(/sunyshore city/i)).toBeInTheDocument();
    expect(screen.getByText('2/2')).toBeInTheDocument();
    expect(screen.queryByText(/great marsh/i)).not.toBeInTheDocument();

    // Retornar para localização anterior
    userEvent.click(previousButton);
    expect(screen.getByText(/great marsh/i)).toBeInTheDocument();
    expect(screen.getByText('1/2')).toBeInTheDocument();
    expect(screen.queryByText(/sunyshore city/i)).not.toBeInTheDocument();
  });

  it('Avaliar o retorno do fetch - com erro', async () => {
    const error = 'There was an issue with this fetch';

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockRejectedValue(error),
    });

    renderWithRouter(<Locations />);
    expect(global.fetch).toBeCalledTimes(1);
  });
});
