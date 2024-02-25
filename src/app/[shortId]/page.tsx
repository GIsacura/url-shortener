"use server";
import { getLink } from "@/api/actions";
import { redirect } from "next/navigation";

const getData = async (params: { shortId: string }) => {
	const { shortId } = params;

	const data = await getLink(shortId);

	return data?.rows[0]?.url || null;
};

const ShortIdPage = async ({ params }: { params: { shortId: string } }) => {
	const url = await getData(params);
	if (!url) {
		redirect("/");
	} else {
		redirect(url);
	}

	return <div></div>;
};

export default ShortIdPage;
