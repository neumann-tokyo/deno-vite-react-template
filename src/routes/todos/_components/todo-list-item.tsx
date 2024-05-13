import { Button, Flex, ListItem } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";
import { Else, If, Then } from "react-if";
import { jwtTokenAtom } from "../../../atoms/current-user.ts";
import {
	DatetimeFormat,
	FormatType,
} from "../../../components/datetime-format.tsx";
import { httpClient } from "../../../libs/http-client.ts";
import type { Todo } from "../../../types.ts";

const doneTodoAtom = atomWithMutation((get) => ({
	mutationKey: ["done-todo"],
	mutationFn: (data: {
		id: number;
	}) => {
		return httpClient({
			jwtToken: get(jwtTokenAtom),
		})
			.post(`todos/${data.id}/finish`)
			.json();
	},
	onSuccess: (res) => {
		const queryClient = get(queryClientAtom);
		queryClient.invalidateQueries({ queryKey: ["todos"] });
	},
}));

export function TodoListItem({ todo }: { todo: Todo }) {
	const [{ mutate, isPending }] = useAtom(doneTodoAtom);
	const onFinish = (e: any) => {
		e.preventDefault();

		mutate({
			id: todo.id,
		});
	};

	return (
		<ListItem key={todo.id} mb="0.5rem">
			<Flex justifyContent="space-between" width="500px">
				<span>{todo.title}</span>
				<If condition={todo.finishedAt}>
					<Then>
						<DatetimeFormat formatType={FormatType.DateTime}>
							{todo.finishedAt}
						</DatetimeFormat>
					</Then>
					<Else>
						<Button
							type="button"
							size="xs"
							colorScheme="blue"
							onClick={onFinish}
						>
							Done
						</Button>
					</Else>
				</If>
			</Flex>
		</ListItem>
	);
}
