import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

// Proveniente do repositóriio pessoal
// Link: https://github.com/guilherme-ac-fernandes/trybe-exercicios/blob/main/02-front-end/bloco-14-testes-automatizados-com-react-testing-library/dia-03-rtl-testando-react-router/exercise-01/src/helpers/renderWithRouter.js
const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>),
    history,
  });
};

export default renderWithRouter;
