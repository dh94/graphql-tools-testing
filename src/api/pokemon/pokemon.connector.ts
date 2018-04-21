import { pokemons } from "../../db/pokemons";

export class PokemonConnector {
	public findPokemon({ id, name }: { id?: string, name?: string}) {
		if (id)
			return pokemons.find(pokemon => pokemon.id === id);
		else if (name)
			return pokemons.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
	}

	public getPokemons({ first }: { first?: number }) {
		if (first)
			return pokemons.slice(0, first);
		else
			return pokemons.slice(0, 20);
	}
}
