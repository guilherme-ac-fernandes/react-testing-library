import React from 'react';
import Button from './Button';
import Loading from './Loading';
import './Locations.css';

class Locations extends React.Component {
  constructor() {
    super();

    this.state = {
      locations: [],
      loading: true,
      position: 0,
      status: {},
    }

    this.getLocations = this.getLocations.bind(this);
  }

  componentDidMount() {
    this.getLocations();
  }

  async getLocations() {
    this.setState({ loading: true }, async () => {
      try {
        const URL = 'https://pokeapi.co/api/v2/location';
        const response = await fetch(URL);
        const locations = await response.json();
        const results = locations.results;
        this.setState({ 
          locations: results, 
          loading: false 
        });
      } catch (error) {
        this.setState({ loading: true }, () => {
          console.log(`Erro ao fazer a requisição: ${error}`)
        });
      }
    })
  }

  onClickUp = () => {
    this.setState((old) => ({
      position: old.position + 1,
    }));
  };

  onClickDown = () => {
    this.setState((old, _) => ({
      position: old.position - 1,
    }));
  }

  changeName = (phrase) => {
    const arrayString = phrase.split('-');
    const arrayChange = arrayString.map((str) => str[0].toUpperCase() + str.slice(1));
    const newPhrase = arrayChange.join(' ');
    return newPhrase;
  }

  render() {
    const { loading, locations, position } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h2>{ `Locations` }</h2>
            <p>{this.changeName(locations[position].name)}</p>
            {/* <img src={ location.url } alt={`${location.name}`}/> */}
            <p>{`${position + 1}/${locations.length}`}</p>
            <div className="locations-button-container">
            <Button
              dataTestId={`location-button`}
              key="Previuos"
              onClick={ this.onClickDown }
              className="location-button"
              disabled={ position === 0 }
              >
              Previuos
            </Button>
            <Button
              dataTestId={`location-button`}
              key="Next"
              onClick={ this.onClickUp }
              className="location-button"
              disabled={ position >= locations.length - 1 }
              >
              Next
            </Button>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default Locations;
