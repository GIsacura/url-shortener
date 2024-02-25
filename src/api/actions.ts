"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";

export async function createLink(url: string) {
	try {
		const shortUrl = Math.random().toString(36).substring(2, 6);

		await sql`
    INSERT INTO links (url,shortUrl)
    VALUES ( ${url},${shortUrl})
    `;

		return { shortUrl };
	} catch (error) {
		console.log({ error });
	}
}

export async function getLink(shortId: string) {
	try {
		const response = await sql`SELECT * FROM links WHERE shortUrl = ${shortId}`;

		return response;
	} catch (error) {
		console.log({ error });
	}
}
