export default class SwapiService {
    _apiBase = "https://swapi.dev/api";
    _imageBase = "https://starwars-visualguide.com/assets/img";
    
    async getResourse (url) {
    const res = await fetch(`${this._apiBase}${url}`);
  
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    };
  
    const body = await res.json();
    return body;
    };
  
    getAllPeople = async () => {
      const people = await this.getResourse(`/people/`);
      return people.results.map(this._transformPerson);
    };
  
    getPerson = async (id) => {
      const person = await this.getResourse(`/people/${id}/`);
      return this._transformPerson(person);
    };

    getPersonImage = ({id}) => {
      return `${this._imageBase}/characters/${id}.jpg`
    };
  
    getAllPlanets = async () => {
      const planets = await this.getResourse(`/planets/`);
      return planets.results.map(this._transformPlanet);
    };
  
    getPlanet = async (id) => {
      const planet = await this.getResourse(`/planets/${id}/`);
      return this._transformPlanet(planet);
    };

    getPlanetImage = ( {id}) => {
      return  `${this._imageBase}/planets/${id}.jpg`;
    };
  
    getAllStarships = async () => {
      const starships = await this.getResourse(`/starships/`);
      return starships.results.map(this._transformStarship);
    };
  
    getStarship = async (id) => {
      const starship = await this.getResourse(`/starships/${id}/`);
    
      return this._transformStarship(starship);
    };

    getStarshipImage = ({id}) => {
      return `${this._imageBase}/starships/${id}.jpg`
    };

    _extractId = (item) => {
      const idRegExp = /\/([0-9]*)\/$/;
      return item.url.match(idRegExp)[1];
    };

    _transformPlanet = (planet) => {
      return {
          id: this._extractId(planet),
          name: planet.name,
          population: planet.population,
          rotationPeriod: planet.rotation_period,
          diameter: planet.diameter
      }
    };

    _transformStarship = (starship) => {
      return {
        id: this._extractId(starship),
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.cost_in_credits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargoCapacity
      };
    }
  
    _transformPerson = (person) => {
      return {
        id: this._extractId(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birth_year,
        eyeColor: person.eye_color
      }
    }
  }