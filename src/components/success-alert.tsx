import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { When } from "react-if";
import { useTimer } from "react-timer-hook";
import spacetime from "spacetime";

export function SuccessAlert({
	title,
	showSeconds = 5,
	description,
	afterAction,
}: {
	title: string;
	showSeconds?: number;
	description?: string;
	afterAction?: () => void;
}) {
	const { isRunning, restart } = useTimer({
		expiryTimestamp: spacetime.now().add(showSeconds, "seconds").toNativeDate(),
	});

	useEffect(() => {
		restart(spacetime.now().add(showSeconds, "seconds").toNativeDate());
	}, [restart, showSeconds]);

	useEffect(() => {
		if (!isRunning && afterAction) {
			afterAction();
		}
	}, [afterAction, isRunning]);

	return (
		<When condition={isRunning}>
			<Alert status="success">
				<AlertIcon />
				<AlertTitle>{title}</AlertTitle>
				<When condition={description}>
					<AlertDescription>{description}</AlertDescription>
				</When>
			</Alert>
		</When>
	);
}
