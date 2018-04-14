import { graphqlExpress } from 'apollo-server-express';
import { GraphQLSchema } from "graphql";
import { Router } from 'express';

import schema from '../api/schema';
import { attachConnectors } from '../api/schema';

const router = Router();

router.use('/graphql',
	graphqlExpress((req) => {
		const context = {
			req,
		};
		attachConnectors(context);
		
		return {
			schema: schema as GraphQLSchema,
			context,
		};
	}));

export default router;
