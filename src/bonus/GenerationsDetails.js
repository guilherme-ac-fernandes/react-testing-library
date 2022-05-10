import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import './GenerationsDetails.css';

class GenerationsDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      generation: [],
      loading: true,
    };

    this.getGenerations = this.getGenerations.bind(this);
  }

  componentDidMount() {
    this.getGenerations();
  }

  async getGenerations() {
    this.setState({ loading: true }, async () => {
      try {
        const { match: { params: { id } } } = this.props;
        const URL = `https://pokeapi.co/api/v2/generation/${id}/`;
        const response = await fetch(URL);
        const generation = await response.json();
        this.setState({
          generation,
          loading: false,
        });
      } catch (error) {
        this.setState({ loading: true }, () => {
          console.log(`Erro ao fazer a requisição: ${error}`);
        });
      }
    });
  }

  changeName = (string) => string[0].toUpperCase() + string.slice(1);

  render() {
    const { loading, generation } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h2>
              { `${this.changeName(generation.main_region.name)} Pokemon` }
            </h2>
            <section className="generations-details-pokemon-gen">
              {generation.pokemon_species
                .map((pok, index) => <p key={ index }>{this.changeName(pok.name)}</p>)}
            </section>
          </div>
        )}
      </div>
    );
  }
}

GenerationsDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default GenerationsDetails;
