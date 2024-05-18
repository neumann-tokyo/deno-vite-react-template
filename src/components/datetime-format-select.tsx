import { Select } from "@chakra-ui/react";
import { datetimeFormats } from "./datetime-format.tsx";

export function DatetimeFormatSelect(props: any) {
	return (
		<Select {...props}>
			{datetimeFormats.map((df) => (
				<option key={df.value} value={df.value}>
					{df.label}
				</option>
			))}
		</Select>
	);
}
