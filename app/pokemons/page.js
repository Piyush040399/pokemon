'use client';

import React, { useEffect, useState } from "react";
import { fetchPokemonList } from "../lib/api";
import PokemonTable from "./components/PokemonTable";
import Pagination from "./components/Pagination";
import Pokemondetails from "./components/Pokemondetails";

const LIMIT = 10;

export default function PokemonPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  // console.log('data--->: ', data);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // console.log('error: ', error);
  const [selected, setSelected] = useState(null);


  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        setIsLoading(true);
        const res = await fetchPokemonList(page, LIMIT);
        console.log('res: ', res);
        setData(res.results);
        setTotalPages(Math.ceil(res.count / LIMIT));
      } catch (err) {
        console.log('err: ', err);
        setError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [page]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pokemons</h1>

      <div className="md:flex md:space-x-6">
        <div className="md:w-2/3">
          {isLoading ? (
            <p className="text-gray-600">...Loading pokemons</p>
          ) : (
            <PokemonTable
              data={data}
              page={page}
              limit={LIMIT}
              onSelect={(name) => setSelected(name)}
            />
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </div>

        <div className="md:w-1/3 mt-6 md:mt-0">
          {selected ? (
            <div className="border p-4 rounded shadow-sm">
              <button
                className="text-lg font-bold text-gray-800 mb-2"
                onClick={() => setSelected(null)}
              >
                X
              </button>

              <Pokemondetails name={selected} />
            </div>
          ) : (
            <p className="text-gray-500">Select a Pokemon to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}
