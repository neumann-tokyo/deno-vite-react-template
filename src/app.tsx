import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "./layout.tsx";

export function App() {
	return (
		<ChakraProvider>
			<Layout />
		</ChakraProvider>
	);
}
