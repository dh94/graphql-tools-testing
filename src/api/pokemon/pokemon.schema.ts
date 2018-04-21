import { readFileSync } from 'fs';
import { GraphQLContext } from '../graphql-context';
import { Pokemon } from './pokemon.types';

export * from './pokemon.connector';
export const schema = [readFileSync(__dirname + '/pokemon.gql', 'utf8')];

export const resolvers = {
	Query: {
		pokemon(root, args, { connectors }: GraphQLContext) {
			return connectors.pokemon.findPokemon(args);
		},
		pokemons(root, args, { connectors }: GraphQLContext) {
			return connectors.pokemon.getPokemons(args);
		},
	},
	Pokemon: {
		types: (root) => root.types || [],
		resistant: (root) => root.resistant || [],
		weaknesses: (root) => root.weaknesses || [],
		evolutions(root: Pokemon, args, { connectors }: GraphQLContext) {
			return (root.evolutions || []).map(evolution => connectors.pokemon.findPokemon({ name: evolution.name }));
		},
	},
};
