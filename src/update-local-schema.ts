import { introspectionQuery, graphql, printSchema, buildClientSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { writeFileSync } from 'fs';
import * as path from 'path';

import { schema } from './api/schema';

const exeSchema = makeExecutableSchema({
	typeDefs: schema,
});

graphql(exeSchema, introspectionQuery)
	.then(result => {
		console.log('loaded schema:');
		const schemaSDL = printSchema(buildClientSchema(result.data as any));
		console.log(schemaSDL);
		console.log('saving schema to file');
		writeFileSync(path.join(__dirname, '..', 'src', 'local-schema.gql'), schemaSDL);
	});
