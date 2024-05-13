import { useAtomValue } from "jotai";
import { useMemo } from "react";
import spacetime from "spacetime";
import { currentUserAtom } from "../atoms/current-user.ts";

export const timeFormat = "{time} {second}s";
export const defaultDateFormat = "{month} {date-ordinal} {year}";
export const defaultDateFormatName = "US (January 1th 2024)";
export const datetimeFormats = [
	{
		value: defaultDateFormat,
		label: defaultDateFormatName,
	},
	{
		value: "{date-ordinal} {month} {year}",
		label: "UK (1th January 2024)",
	},
	{
		value: "{year}年{iso-month}月{date-pad}日",
		label: "日本 (2024年01月01日)",
	},
];
export enum FormatType {
	Date = "date",
	Time = "time",
	DateTime = "datetime",
}

export function formatName(value?: string) {
	return (
		datetimeFormats.find((df) => df.value === value)?.label ??
		defaultDateFormatName
	);
}

// children is iso8601 datetime string
export function DatetimeFormat({
	formatType,
	children,
}: { formatType: FormatType; children: string }) {
	const currentUser = useAtomValue(currentUserAtom);
	const formattedTime = useMemo(() => {
		const time = spacetime(children).goto(
			currentUser?.timezone ?? "Asia/Tokyo",
		);
		const dateFormat = currentUser?.datetimeFormat ?? defaultDateFormat;

		switch (formatType) {
			case FormatType.Date:
				return time.format(dateFormat);
			case FormatType.Time:
				return time.format(timeFormat);
			case FormatType.DateTime:
				return time.format(`${dateFormat} ${timeFormat}`);
		}
	}, [
		children,
		currentUser?.timezone,
		currentUser?.datetimeFormat,
		formatType,
	]);

	return formattedTime;
}
