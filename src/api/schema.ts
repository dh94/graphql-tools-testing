import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { schema as rootSchema, resolvers as rootResolvers } from './root/root.schema';

import { Connectors } from './graphql-context';

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
export const schema = [...rootSchema];
export const resolvers = merge({}, rootResolvers);

export function attachConnectors(context) {
	context.connectors = {
	} as Connectors;
}

const executableSchema = makeExecutableSchema({
	typeDefs: schema,
	resolvers,
});

export default executableSchema;
