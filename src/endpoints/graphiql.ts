import { default as graphiqlExpress } from 'graphql-playground-middleware-express';
import { Router } from 'express';

const router = Router();

router.use('/graphiql', graphiqlExpress({
	endpoint: '/graphql',
}),
);

export default router;
