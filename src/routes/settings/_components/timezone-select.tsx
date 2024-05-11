import { useMemo } from "react";
import Select from "react-select";

const languages = Intl.supportedValuesOf("timeZone").map((timezone) => ({
	value: timezone,
	label: timezone,
}));

export function TimezoneSelect({
	name,
	defaultValue,
}: { name: string; defaultValue: string }) {
	const defaultTimezone = useMemo(
		() => ({ value: defaultValue, label: defaultValue }),
		[defaultValue],
	);

	return (
		<Select options={languages} defaultValue={defaultTimezone} name={name} />
	);
}
