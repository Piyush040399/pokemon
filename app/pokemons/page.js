'use client';

import { useEffect, useState } from "react";
import { fetchPokemonList } from "../lib/api";
import PokemonTable from "./components/PokemonTable";
import Pagination from "./components/Pagination";

const LIMIT = 10;

export default function PokePage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        const res = await fetchPokemonList(page, LIMIT);
        setData(res.results);
        setTotalPages(Math.ceil(res.count / LIMIT));
      } catch (err) {
        setError(err.message);
      }
    }

    loadData();
  }, [page]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>

      <PokemonTable
        data={data}
        page={page}
        limit={LIMIT}
        onSelect={(name) => console.log("Selected:", name)}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}
