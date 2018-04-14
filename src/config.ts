const commonConfig: Configuration = {
	server: {
		port: process.env.PORT || '3000',
		graphiql: true,
	},
};

const configuration = {
	/**
	 * Development Environment
	 * ------------------------------------------
	 *
	 * This is the local development environment, which is used by the developoers
	 */
	development: {
		...commonConfig,
	},
	/**
	 * Test Environment
	 * ------------------------------------------
	 *
	 * This environment is used by the unit, migration and database test.
	 */
	test: {
		...commonConfig,
	},
	/**
	 * Production Environment
	 * ------------------------------------------
	 *
	 * This configuration will be used by the cloud servers. You are abel to override
	 * them with the local cloud environment variable to make it even more configurable.
	 */
	production: {
		...commonConfig,
	},
} as Environments;
export default configuration;

export interface Environments {
	development: Configuration;
	test: Configuration;
	production: Configuration;
}

export interface Configuration {
	server: {
		port: string;
		graphiql: boolean;
	};
}
