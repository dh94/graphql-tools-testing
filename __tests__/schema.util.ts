import { makeExecutableSchema } from 'graphql-tools';
import { schema, resolvers, attachConnectors } from '../src/api/schema';
import { merge } from 'lodash';

export function createTestSchema(testTypeDef = '', testResolvers = {}) {
	return makeExecutableSchema({
		typeDefs: [...schema, testTypeDef],
		resolvers: merge({}, resolvers, testResolvers),
	});
}

describe("util", () => {
	it('blabla');
});
