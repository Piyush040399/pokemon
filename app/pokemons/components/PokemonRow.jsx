export default function PokemonRow({ index, page, limit, pokemon, onSelect }) {
  return (
    <tr key={pokemon.name} className="hover:bg-gray-50">
      <td className="p-2 border text-center">{(page - 1) * limit + index + 1}</td>

      <td
        className="p-2 border text-blue-600 cursor-pointer hover:underline"
        onClick={() => onSelect(pokemon?.name)}
      >
        {pokemon?.name}
      </td>
    </tr>
  );
}
