import Pet from './Pet';

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            key={pet.id}
            breed={breed.id}
            animal={pet.animal}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            name={pet.name}
          />
        ))
      )}
    </div>
  );
};
export default Results;
