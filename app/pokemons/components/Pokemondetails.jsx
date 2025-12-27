"use client";

import { useEffect, useState } from "react";
import { fetchPokemonDetails } from "../../lib/api";

export default function Pokemondetails({ name }) {
	const [data, setData] = useState(null);
	const [activeTypeIndex, setActiveTypeIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;

		 const loadData = async () => {
			try {
				setError(null);
				setLoading(true);
				const res = await fetchPokemonDetails(name);
				if (!mounted) return;
				setData(res);
				setActiveTypeIndex(0);
			} catch (err) {
                console.log('err: ', err);
				if (!mounted) return;
				setError(err.message);
			} finally {
				if (!mounted) return;

				setLoading(false);
			}
		}

		if (name) loadData();

		return () => {
			mounted = false;
		};
	}, [name]);

	if (loading) return <p className="text-gray-600">...Loading details</p>;
	if (error) return <p className="text-red-500">{error}</p>;
	if (!data) return null;

	const types = data?.types?.map((t) => t?.type?.name);
	const gameIndicesCount = data?.game_indices?.length ?? 0;
	const movesCount = data?.moves?.length ?? 0;

	return (
		<div>
			<div className="flex items-center space-x-3 mb-3">
				{data.sprites?.front_default && (
					<img src={data?.sprites?.front_default} alt={name} className="w-16 h-16" />
				)}
				<div>
					<h2 className="text-lg font-semibold capitalize">{name}</h2>
					<p className="text-sm text-gray-500">ID: {data.id}</p>
				</div>
			</div>

			<div>
				<div className="flex space-x-2 mb-3">
					{types?.map((t, idx) => (
						<button
							key={t}
							onClick={() => setActiveTypeIndex(idx)}
							className={`px-3 py-1 rounded border ${idx === activeTypeIndex ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
						>
							{t}
						</button>
					))}
				</div>

				<div className="bg-gray-50 p-3 rounded">
					<p> <strong>Game Indices:</strong> {gameIndicesCount} </p>

					<p> <strong>Total Moves:</strong> {movesCount}</p>

					<div className="mt-3">
						<h3 className="font-medium">Stats</h3>
						<ul className="text-sm">
							{data?.stats?.map((s) => (
								<li key={s?.stat?.name}> {s?.stat?.name}: {s?.base_stat}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

