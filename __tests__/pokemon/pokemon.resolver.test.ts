import { GraphQLContext } from "../../src/api/graphql-context";
import { attachConnectors } from "../../src/api/schema";
import { graphql } from "graphql";
import { createTestSchema } from "../schema.util";
import { pokemons } from "../../src/db/pokemons";

describe('pokemon resolvers tests', () => {
	let context: GraphQLContext;
	beforeEach(() => {
		context = {} as any;
		attachConnectors(context);
	});

	describe('Query tests', () => {
		describe('pokemon query', () => {
			it('should retreive null when no such pokemon', async () => {
				const schema = createTestSchema();
				const result = await graphql(schema, `
					query {
						pokemon(name: "Daniel") {
							id
						}
					}
				`, {}, context);

				expect(result).toBeDefined();
				expect(result.errors).not.toBeDefined();
				expect(result.data.pokemon).toBeNull;
			});

			it('should retreive pokemon', async () => {
				const schema = createTestSchema();
				const result = await graphql(schema, `
					query {
						pokemon(name: "Pikachu") {
							id
						}
					}
				`, {}, context);

				expect(result).toBeDefined();
				expect(result.errors).not.toBeDefined();
				expect(result.data.pokemon).toBeDefined();
				expect(result.data.pokemon.id).toBe("025");
			});
		});

		describe('pokemons query', () => {
			it('should retreive first amount of pokemons', async () => {
				const schema = createTestSchema();
				const result = await graphql(schema, `
					query {
						pokemons(first: 5) {
							id
						}
					}
				`, {}, context);

				expect(result).toBeDefined();
				expect(result.errors).not.toBeDefined();
				expect(result.data.pokemons).toHaveLength(5);
			});

			it('should retreive first amount of pokemons - first bigger than total amount', async () => {
				const schema = createTestSchema();
				const result = await graphql(schema, `
					query {
						pokemons(first: 1212121) {
							id
						}
					}
				`, {}, context);

				expect(result).toBeDefined();
				expect(result.errors).not.toBeDefined();
				expect(result.data.pokemons).toHaveLength(151);
			});
		});
	});

	describe('Pokemon type tests', () => {
		it('arrays should be empty - source is null ', async () => {
			const schema = createTestSchema(`
				extend type Query {
					nullSource: Pokemon
				}
			`, {
				Query: {
					nullSource() {
						return {};
					},
				},
			});
			const result = await graphql(schema, `
				{
					nullSource {
						types
						resistant
						weaknesses
						evolutions {
							id
						}
					}
				}
			`, {}, context);

			expect(result.errors).toBeUndefined;
			expect(result.data).toBeDefined();
			expect(result.data.nullSource).toBeDefined();
			expect(result.data.nullSource.types).toHaveLength(0);
			expect(result.data.nullSource.resistant).toHaveLength(0);
			expect(result.data.nullSource.weaknesses).toHaveLength(0);
			expect(result.data.nullSource.evolutions).toHaveLength(0);
		});

		it('arrays should have one item ', async () => {
			const schema = createTestSchema(`
				extend type Query {
					oneItem: Pokemon
				}
			`, {
				Query: {
					oneItem() {
						return {
							types: ["Normal"],
							resistant: ["Fire"],
							weaknesses: ["Grass"],
							evolutions: [{ name: "Pikachu" }],
						};
					},
				},
			});
			const result = await graphql(schema, `
				{
					oneItem {
						types
						resistant
						weaknesses
						evolutions {
							name
						}
					}
				}
			`, {}, context);

			expect(result.errors).toBeUndefined;
			expect(result.data).toBeDefined();
			expect(result.data.oneItem).toBeDefined();
			expect(result.data.oneItem.types).toHaveLength(1);
			expect(result.data.oneItem.types[0]).toBe("Normal");
			expect(result.data.oneItem.resistant).toHaveLength(1);
			expect(result.data.oneItem.resistant[0]).toBe("Fire");
			expect(result.data.oneItem.weaknesses).toHaveLength(1);
			expect(result.data.oneItem.weaknesses[0]).toBe("Grass");
			expect(result.data.oneItem.evolutions).toHaveLength(1);
			expect(result.data.oneItem.evolutions[0].name).toBe("Pikachu");
		});

		it('should resolve pokemon correctly', async () => {
			const pikachuSource = {
				id: "025",
				name: "Pikachu",
				types: [ "Electric" ],
				resistant: [ "Electric", "Flying", "Steel" ],
				weaknesses: [ "Ground" ],
				weight: {
					minimum: "5.25kg",
					maximum: "6.75kg",
				},
				height: {
					minimum: "0.35m",
					maximum: "0.45m",
				},
				evolutions: [
					{
						id: 26,
						name: "Raichu",
					},
				],
			};
			const schema = createTestSchema(`
				extend type Query {
					pikachu: Pokemon
				}
			`, {
				Query: {
					pikachu() {
						return pikachuSource;
					},
				},
			});
			const result = await graphql(schema, `
				{
					pikachu {
						id
						name
						weight {
						minimum
						maximum
						}
						height {
						minimum
						maximum
						}
						types
						resistant
						weaknesses
						evolutions {
							id
							name
						}
					}
				}
			`, {}, context);
			
			expect(result.errors).toBeUndefined;
			expect(result.data).toBeDefined();
			
			const pikachu = result.data.pikachu;
			expect(pikachu).toBeDefined();
			expect(pikachu.id).toBe(pikachuSource.id);
			expect(pikachu.name).toBe(pikachuSource.name);
			expect(pikachu.types).toEqual(pikachuSource.types);
			expect(pikachu.resistant).toEqual(pikachuSource.resistant);
			expect(pikachu.weaknesses).toEqual(pikachuSource.weaknesses);
			expect(pikachu.weight).toEqual(pikachuSource.weight);
			expect(pikachu.height).toEqual(pikachuSource.height);
			expect(pikachu.evolutions).toHaveLength(1);
			expect(pikachu.evolutions[0].id).toBe("026");
		});
	});
});
