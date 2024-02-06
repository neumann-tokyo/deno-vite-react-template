import react from "npm:@vitejs/plugin-react";
import { defineConfig } from "npm:vite@3.2.4";
import { dirname } from "https://deno.land/std/path/mod.ts";
import viteDeno from "https://deno.land/x/vite_deno_plugin/mod.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

export default defineConfig({
	plugins: [
		viteDeno({
			importMapFilename: __dirname + "/deno.json",
		}),
		react({
			jsxImportSource: "react",
		}),
	],
});
