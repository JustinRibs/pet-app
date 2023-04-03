import { useState, useEffect } from 'react';

// assign local cache to empty object
const localCache = {};

const useBreedList = (animal) => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    // if no animal param, set breeds to empty array
    if (!animal) {
      setBreeds([]);
      // if local cache has animal already, use that
    } else if (localCache[animal]) {
      setBreeds(localCache[animal]);
      // otherwise, invoke generateBreeds function to make api call
    } else {
      generateBreeds();
    }
    function generateBreeds() {
      setBreeds([]);
      fetch(`https://pets-v2.dev-apis.com/breeds?animal=${animal}`)
        .then((res) => res.json())
        .then((res) => {
          // create key/value for animal in local Cache
          localCache[animal] = res.breeds || [];
          setBreeds(res.breeds);
        });
    }
  }, [animal]);
  return [breeds];
};

export default useBreedList;
