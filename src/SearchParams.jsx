import { useState, useEffect } from 'react';
import Pet from './Pet';
import useBreedList from './useBreedList';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
import Results from './Results';

const SearchParams = () => {
  //   const location = 'Farmingdale, NY';
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  useEffect(() => {
    requestPets();
  }, []);
  const requestPets = () => {
    fetch(
      `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    )
      .then((res) => res.json())
      .then((result) => setPets(result.pets));
  };

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            placeholder="Location"
            value={location}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed('');
            }}
            id="animal"
            placeholder="Animal"
            value={animal}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            onChange={(e) => setBreed(e.target.value)}
            id="breed"
            disabled={breeds.length === 0}
            placeholder="breed"
            value={breed}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
