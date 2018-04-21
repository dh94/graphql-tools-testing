import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { schema as rootSchema, resolvers as rootResolvers } from './root/root.schema';
import { schema as pokemonSchema, resolvers as pokemonResolvers, PokemonConnector } from './pokemon/pokemon.schema';

import { Connectors } from './graphql-context';

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
export const schema = [...rootSchema, ...pokemonSchema];
export const resolvers = merge({}, rootResolvers, pokemonResolvers);

export function attachConnectors(context) {
	context.connectors = {
		pokemon: new PokemonConnector(),
	} as Connectors;
}

const executableSchema = makeExecutableSchema({
	typeDefs: schema,
	resolvers,
});

export default executableSchema;
