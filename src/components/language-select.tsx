import { Select } from "@chakra-ui/react";

export const languages = [
	{ value: "en_US", label: "English" },
	{ value: "ja_JP", label: "日本語" },
];

export function LanguageSelect(props: any) {
	return (
		<Select {...props}>
			{languages.map((language) => (
				<option key={language.value} value={language.value}>
					{language.label}
				</option>
			))}
		</Select>
	);
}
