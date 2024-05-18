import { useMemo } from "react";
import { ReactSelectColorMode } from "./react-select-color-mode.tsx";

const languages = Intl.supportedValuesOf("timeZone").map((timezone) => ({
	value: timezone,
	label: timezone,
}));

export function TimezoneSelect({ defaultValue, ...props }: any) {
	const defaultTimezone = useMemo(
		() => ({ value: defaultValue, label: defaultValue }),
		[defaultValue],
	);

	return (
		<ReactSelectColorMode
			options={languages}
			defaultValue={defaultTimezone}
			{...props}
		/>
	);
}
