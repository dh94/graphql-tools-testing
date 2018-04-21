import { Request } from 'express';
import { PokemonConnector } from './pokemon/pokemon.connector';

export interface Connectors {
	pokemon: PokemonConnector;
}

export interface GraphQLContext {
	connectors: Connectors;
	req: Request;
}
