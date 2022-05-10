import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import './Generations.css';

class Generations extends React.Component {
  constructor() {
    super();

    this.state = {
      generations: [],
      loading: true,
    }

    this.getLocations = this.getLocations.bind(this);
  }

  componentDidMount() {
    this.getLocations();
  }

  async getLocations() {
    this.setState({ loading: true }, async () => {
      const URL = 'https://pokeapi.co/api/v2/generation';
      const response = await fetch(URL);
      const generations = await response.json();
      const results = generations.results;
      this.setState({ 
        generations: results, 
        loading: false 
      });
    });
  }

  changeName = (phrase) => {
    const arrayString = phrase.split('-');
    const string1 = arrayString[0][0].toUpperCase() + arrayString[0].slice(1);
    const string2 = arrayString[1].toUpperCase();
    return `${string1} ${string2}`;
  }

  render() {
    const { loading, generations } = this.state; 
    return (
      <>
        <h2>{ `Generations` }</h2>
        <div className="generation-container">
          {loading ? (
            <Loading />
          ) : (
            <>
              {generations.map(({ name }, index) => 
              <div key={ index } className="generation-card">
                <p>{this.changeName(name)}</p>
                <Link to={ `pokemons/generations/${index + 1}` }>More details</Link>
              </div>
              )}
            </>
          )} 
        </div>
      </>
    );
  }
}

export default Generations;
