export async function fetchPokemonList(page = 1, limit = 10) {
  const count = (page - 1) * limit;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${count}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  return response.json();
}
