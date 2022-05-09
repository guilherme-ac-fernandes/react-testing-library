import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

// Teste no App.js
describe('Testes para o componente About.js para avaliar', () => {
  it('Contém um título com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading',
      { level: 2, name: /about pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph1 = /This application simulates a Pokédex/i;
    const paragraph2 = /One can filter Pokémons by type/i;
    const paragraphs = [paragraph1, paragraph2];

    paragraphs.forEach((paragraph) => {
      const paragraphElement = screen.getByText(paragraph);
      expect(paragraphElement).toBeInTheDocument();
    });
  });

  it('Contém uma imagem específica', () => {
    renderWithRouter(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', URL);
  });
});
