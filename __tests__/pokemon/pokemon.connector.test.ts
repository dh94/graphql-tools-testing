import { PokemonConnector } from "../../src/api/pokemon/pokemon.schema";

describe("Pokemon connector tests", () => {
	let connector: PokemonConnector;

	beforeEach(() => {
		connector = new PokemonConnector();
	});

	describe('getPokemons', () => {
		it('should get - default amount', () => {
			const result = connector.getPokemons({});
			
			expect(result).toHaveLength(20);
		});

		it('should get - requested valid amount', () => {
			const result = connector.getPokemons({ first: 10 });
			
			expect(result).toHaveLength(10);
		});
	});

	describe('findPokemon', () => {
		it('should find by id', () => {
			const result = connector.findPokemon({ id: "001" });

			expect(result).toBeDefined();
			expect(result.name).toBe('Bulbasaur');
		});
	});
});
