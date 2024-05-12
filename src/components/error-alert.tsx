import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@chakra-ui/react";
import { When } from "react-if";

export function ErrorAlert({
	title,
	description,
}: { title: string; description?: string }) {
	return (
		<Alert status="error">
			<AlertIcon />
			<AlertTitle>{title}</AlertTitle>
			<When condition={description}>
				<AlertDescription>{description}</AlertDescription>
			</When>
		</Alert>
	);
}
