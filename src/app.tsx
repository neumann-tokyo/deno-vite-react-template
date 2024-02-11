import { Routes } from "./routes.tsx";
import { ChakraProvider } from "@chakra-ui/react";

export function App() {
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
}
