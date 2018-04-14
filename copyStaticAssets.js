const cpx = require('cpx');

if (process.env.NODE_ENV === "test") {
	cpx.copySync("src/api/**/*.{gql,graphql}", ".output/src/api");
} else {
	cpx.copySync("src/api/**/*.{gql,graphql}", "dist/api");
}