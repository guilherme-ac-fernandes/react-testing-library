import React from 'react';
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

  it('Se ao clicar nos links de navegação é redirecionado para a página correta', () => {
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
  });

  it('Se ao entrar um URL desconhecida vai para página NotFound', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xyz');
    const notFoundTitle = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
