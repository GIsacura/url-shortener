"use client";

import { createLink } from "@/api/actions";
import { useFormik } from "formik";
import Head from "next/head";
import { useRef, useState } from "react";

export default function Home() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [shortURL, setShortURL] = useState("");
	const formik = useFormik({
		initialValues: {
			url: "",
		},
		validate: (values) => {
			const errors: any = {};

			if (!values.url) {
				errors.url = "URL is required";
			}

			if (values.url && !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
				errors.url = "URL is invalid";
			}

			return errors;
		},
		onSubmit: async (values) => {
			const url = values.url;
			try {
				const response = await createLink(url || "");
				console.log({ response });

				if (response) {
					setShortURL(`${window.location.origin}/${response.shortUrl}`);
				}
			} catch (error) {
				console.log({ error });
			}
		},
	});

	// const handleSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault();

	// 	const url = inputRef.current?.value;

	// 	try {
	// 		const response = await createLink(url || "");
	// 		console.log({ response });

	// 		if (response) {
	// 			setShortURL(`${window.location.origin}/${response.shortUrl}`);
	// 		}
	// 	} catch (error) {
	// 		console.log({ error });
	// 	}
	// };
	return (
		<div className="min-vh-100 py-0 px-[0.5rem] flex flex-col items-center justify-center h-screen">
			<main className="py-[5rem] px-0 flex flex-col justify-center items-center">
				<h1 className="m-0 text-[4rem] text-center">URL Shortener</h1>

				<p className="text-center text-2xl">Shorten your URLs here</p>

				<div className="flex items-center justify-center flex-col flex-wrap max-w-[800px] mt-12">
					<form
						className="m-4 p-6 text-left text-black border border-slate-[#eaeaea] border-solid rounded-[10px] transition-colors duration-150 ease-in-out border-transition-colors hover:text-blue-600 focus:text-blue-600 active:text-blue-600 hover:border-blue-600 focus:border-blue-600 active:border-blue-600"
						onSubmit={formik.handleSubmit}
					>
						<div className="">
							<input
								ref={inputRef}
								name="url"
								type="text"
								onChange={formik.handleChange}
								value={formik.values.url}
								className="m-0.5 text-xl p-4"
								placeholder="URL"
							/>
							<button className="m-0.5 text-xl p-4">Shorten</button>
						</div>
						{formik.touched.url && formik.errors.url && (
							<p className="text-red-500">{formik.errors.url}</p>
						)}
					</form>
				</div>

				{shortURL && (
					<div className="flex items-center justify-center flex-col sm:flex-row flex-wrap max-w-[800px] mt-12">
						<div className="m-4 p-6 text-left text-[#eaeaea] border border-slate-[#eaeaea] border-solid rounded-[10px] transition-colors duration-150 ease-in-out border-transition-colors ">
							<p className="m-0.5 text-xl p-4">
								Your short-url is:{" "}
								<a
									href={shortURL}
									target="_blank"
									className=" hover:text-blue-600 focus:text-blue-600 active:text-blue-600 hover:border-blue-600 focus:border-blue-600 active:border-blue-600"
								>
									{shortURL}
								</a>
							</p>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
