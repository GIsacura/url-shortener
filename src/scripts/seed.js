const { db } = require("@vercel/postgres");

async function createLinks(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "links" table if it doesn't exist
		const createTable = await client.sql`
			CREATE TABLE IF NOT EXISTS links (
				id SERIAL PRIMARY KEY,
				url VARCHAR(255) NOT NULL UNIQUE,
				shortUrl VARCHAR(255) NOT NULL UNIQUE,
				createdAt DATE DEFAULT CURRENT_DATE
			);
		`;

		console.log(`Created "links" table`);

		return {
			createTable,
		};
	} catch (error) {
		console.error("Error creating links:", error);
		throw error;
	}
}

async function main() {
	const client = await db.connect();
	await createLinks(client);

	await client.end();
}

main().catch((err) => {
	console.error(
		"An error occurred while attempting to seed the database:",
		err
	);
});
