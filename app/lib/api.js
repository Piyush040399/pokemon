export const fetchPokemonList =  async (page = 1, limit = 10) => {
  const count = (page - 1) * limit;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${count}`
  );
  // console.log('response: ', response);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  return response.json();
}

export const fetchPokemonDetails = async (name) => {
  if (!name) throw new Error("Missing Pokémon name");

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  console.log('response===============> ', response);

  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon details `);
  }

  return response.json();
}
