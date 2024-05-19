import {
	Box,
	Button,
	Flex,
	Heading,
	Spinner,
	UnorderedList,
} from "@chakra-ui/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { Else, If, Then } from "react-if";
import { useLocation } from "wouter";
import { jwtTokenAtom } from "../../atoms/current-user.ts";
import { ErrorAlert } from "../../components/error-alert.tsx";
import { Trans } from "../../components/trans.tsx";
import { httpClient } from "../../libs/http-client.ts";
import type { Todo } from "../../types.ts";
import { TodoListItem } from "./_components/todo-list-item.tsx";

const todosAtom = atomWithQuery((get) => ({
	queryKey: ["todos"],
	queryFn: async () =>
		await httpClient({ jwtToken: get(jwtTokenAtom) as string })
			.get("todos")
			.json(),
}));

export function TodosIndexPage() {
	const [{ data, isPending, isError }] = useAtom(todosAtom);
	const [_location, navigate] = useLocation();
	const [parent] = useAutoAnimate();

	return (
		<Flex flexDirection="column" flex="1" gap="1rem">
			<Heading as="h1" size="4xl">
				Todo List
			</Heading>
			<Box>
				<Button colorScheme="blue" onClick={() => navigate("/todos/new")}>
					<Trans>New</Trans>
				</Button>
			</Box>
			<If condition={!data || isPending}>
				<Then>
					<If condition={isError}>
						<Then>
							<ErrorAlert title="Fail to load data" />
						</Then>
						<Else>
							<Spinner />
						</Else>
					</If>
				</Then>
				<Else>
					<UnorderedList ref={parent}>
						{(data as Todo[])?.map((todo) => (
							<TodoListItem todo={todo} key={todo.id} />
						))}
					</UnorderedList>
				</Else>
			</If>
		</Flex>
	);
}
