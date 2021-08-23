import pokemonApi from "../api/pokemonApi.js";

// Creamos una array de 650 posiciones vacias
const getPokemons = () => {
  const pokemonsArr = Array.from(Array(650));

  return pokemonsArr.map((_, index) => index + 1);
};

// Mezclamos los 650 de manera aleatoria y devolvemos los primeros 4
const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons()
    .sort(() => Math.random() - 0.5);

  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));

  return pokemons;
};

// Conseguimos los nombres de esos 4 pokemons
const getPokemonNames = async ([a, b, c, d] = []) => {
  const promisesArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`)
  ];

  // Promise.all nos ayuda a disparar varias promesas de manera simultanea
  const [p1, p2, p3, p4] = await Promise.all(promisesArr);

  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id }
  ];
}

export default getPokemonOptions;