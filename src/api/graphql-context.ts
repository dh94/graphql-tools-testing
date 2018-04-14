import { Request } from 'express';

// tslint:disable-next-line:no-empty-interface
export interface Connectors {	
}

export interface GraphQLContext {
	connectors: Connectors;
	req: Request;
}
