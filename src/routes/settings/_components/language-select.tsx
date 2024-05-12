import { Select } from "@chakra-ui/react";

const languages = [
	{ value: "en_US", label: "English" },
	{ value: "ja_JP", label: "Japanese" },
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
