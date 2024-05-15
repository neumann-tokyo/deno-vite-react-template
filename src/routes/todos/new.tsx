import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";
import { useEffect } from "react";
import { When } from "react-if";
import { useLocation } from "wouter";
import { jwtTokenAtom } from "../../atoms/current-user.ts";
import { ErrorAlert } from "../../components/error-alert.tsx";
import { Trans } from "../../components/trans.tsx";
import { httpClient } from "../../libs/http-client.ts";

const createNewTodoAtom = atomWithMutation((get) => ({
	mutationKey: ["create-todo"],
	mutationFn: async (data: {
		title: string;
	}) =>
		await httpClient({
			jwtToken: get(jwtTokenAtom),
		})
			.post("todos", { json: data })
			.json(),
}));

export function TodosNewPage() {
	const [{ mutate, isPending, isError, isSuccess }] =
		useAtom(createNewTodoAtom);
	const [_, navigate] = useLocation();
	const [queryClient] = useAtom(queryClientAtom);

	useEffect(() => {
		if (isSuccess) {
			navigate("/todos");
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		}
	}, [isSuccess, navigate, queryClient]);

	const onSubmit = (e: any) => {
		e.preventDefault();

		mutate({ title: e.target.title.value });
	};

	return (
		<Flex flexDirection="column" gap="1rem">
			<Heading as="h1" size="4xl">
				Todo New
			</Heading>
			<When condition={isError}>
				<ErrorAlert title="Fail!" />
			</When>
			<form onSubmit={onSubmit}>
				<Flex flexDirection="column" gap="1rem">
					<FormControl>
						<FormLabel>
							<Trans>Title</Trans>
						</FormLabel>
						<Input name="title" maxLength={200} required />
					</FormControl>
					<Flex gap="0.5rem">
						<Button colorScheme="blue" type="submit" isLoading={isPending}>
							Save
						</Button>
						<Button type="button" onClick={() => navigate("/todos")}>
							<Trans>Back</Trans>
						</Button>
					</Flex>
				</Flex>
			</form>
		</Flex>
	);
}
