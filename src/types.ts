export type User = {
	displayName: string;
	email: string;
	id: number;
	language: string;
	timezone: string;
	datetimeFormat: string;
};

export type LanguageMessage = {
	en: string;
	value: string;
};

export type Todo = {
	id: number;
	title: string;
	finishedAt: string;
};
