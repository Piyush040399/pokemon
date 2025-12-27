import PokemonRow from "./PokemonRow";

export default function PokemonTable({ data = [], page, limit, onSelect }) {
  return (
    <table className="w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">S.No</th>
          <th className="p-2 border text-left">Pokemon Name</th>
        </tr>
      </thead>

      <tbody>
        {data?.map((pokemon, index) => (
          <PokemonRow
            key={pokemon.name}
            index={index}
            page={page}
            limit={limit}
            pokemon={pokemon}
            onSelect={onSelect}
          />
        ))}
      </tbody>
    </table>
  );
}
