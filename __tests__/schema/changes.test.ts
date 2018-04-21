import { findBreakingChanges } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { readFileSync } from 'fs';
import * as path from 'path';

import { schema } from '../../src/api/schema';

test('schema should not have breaking changes', () => {
	const oldSchemaGQL = [readFileSync(path.join(__dirname, '..', '..', 'src', 'local-schema.gql'), 'utf8')];
	const oldSchema = makeExecutableSchema({
		typeDefs: oldSchemaGQL,
	});

	const currentSchema = makeExecutableSchema({
		typeDefs: schema,
	});

	const breaks = findBreakingChanges(oldSchema, currentSchema);
	expect(breaks).toHaveLength(0);
});
