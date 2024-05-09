import react from "npm:@vitejs/plugin-react";
import { defineConfig } from "npm:vite@5.2.6";
import { dirname } from "https://deno.land/std/path/mod.ts";
import viteDeno from "https://deno.land/x/vite_deno_plugin/mod.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

export default defineConfig({
	plugins: [
		viteDeno({
			importMapFilename: __dirname + "/deno.jsonc",
		}),
		react({
			jsxImportSource: "react",
		}),
	],
	server: {
		host: "0.0.0.0",
		port: 5544,
	},
});
