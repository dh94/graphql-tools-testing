export interface Pokemon {
	id: string;
		name: string;
		types: string[];
		resistant: string[];
		weaknesses: string[];
		weight: {
			minimum: string,
			maximum: string,
		};
		height: {
			minimum: string;
			maximum: string;
		};
		fleeRate: number;
		evolutions: Evolution[];
}

interface Evolution {
	id: number;
	name: string;
}
