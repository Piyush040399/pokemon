export default function PokemonTable({ data, page, limit, onSelect }) {
  return (
    <table className="w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Sr. No</th>
          <th className="p-2 border text-left">Pokémon Name</th>
        </tr>
      </thead>

      <tbody>
        {data.map((pokemon, index) => (
          <tr key={pokemon.name} className="hover:bg-gray-50">
            <td className="p-2 border text-center">
              {(page - 1) * limit + index + 1}
            </td>

            <td
              className="p-2 border text-blue-600 cursor-pointer hover:underline"
              onClick={() => onSelect(pokemon.name)}
            >
              {pokemon.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
