import React from 'react';
// import { waitFor, screen } from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Teste no App.js
describe('Testes para o componente App.js para avaliar', () => {
  it('Contém um conjunto de itens de navegação', () => {
    const links = ['Home', 'About', 'Favorite Pokémons'];
    renderWithRouter(<App />);

    links.forEach((link) => {
      const linkElement = screen.getByRole('link', { name: link });
      expect(linkElement).toBeInTheDocument();
    });
  });

  it('Se ao clicar nos links de navegação vai para a página correta', async () => {
    renderWithRouter(<App />);

    // About
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const aboutTitle = screen.getByRole('heading',
      { level: 2, name: /about pokédex/i });
    expect(aboutTitle).toBeInTheDocument();

    // Home
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const homeTitle = screen.getByRole('heading',
      { level: 2, name: /encountered pokémons/i });
    expect(homeTitle).toBeInTheDocument();

    // Favorites Pokemon
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const favoriteTitle = screen.getByRole('heading',
      { level: 2, name: /favorite pokémons/i });
    expect(favoriteTitle).toBeInTheDocument();

    // Locations
    // const locationsLink = screen.getByRole('link', { name: /locations/i });
    // expect(locationsLink).toBeInTheDocument();
    // userEvent.click(locationsLink);

    // const loading = await screen.findByText(/loading/i);
    // await waitFor(() => expect(loading).not.toBeInTheDocument());

    // const locationsTitle = screen.getByRole('heading',
    //   { level: 2, name: /locations/i });
    // expect(locationsTitle).toBeInTheDocument();

    // Generations
    // const generationsLink = screen.getByRole('link', { name: /generations/i });
    // expect(generationsLink).toBeInTheDocument();
    // userEvent.click(generationsLink);

    // await waitFor(() => expect(loading).not.toBeInTheDocument());

    // const generationsTitle = screen.getByRole('heading',
    //   { level: 2, name: /generations/i });
    // expect(generationsTitle).toBeInTheDocument();
  });

  it('Se ao entrar um URL desconhecida vai para página NotFound', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xyz');
    const notFoundTitle = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
