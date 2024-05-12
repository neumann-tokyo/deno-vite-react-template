import { printf } from "fast-printf";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomEffect } from "jotai-effect";
import { useMemo } from "react";
import { currentUserAtom } from "../atoms/current-user.ts";
import { japaneseMessagesAtom } from "../atoms/i18n/japanese-messages.ts";
import type { LanguageMessage } from "../types.ts";

const currentMessagesAtom = atom<LanguageMessage[] | null>(null);
const transEffect = atomEffect((get, set) => {
	const currentUser = get(currentUserAtom);

	if (currentUser?.language === "ja_JP") {
		set(currentMessagesAtom, get(japaneseMessagesAtom));
	}
});

export function Trans({
	children,
	variables,
}: { children: string; variables?: string[] }) {
	useAtom(transEffect);
	const currentUser = useAtomValue(currentUserAtom);
	const currentMessages = useAtomValue(currentMessagesAtom);
	const message = useMemo(() => {
		const value = currentMessages?.find((m) => m.en === children)?.value;
		if (value) {
			if (variables) {
				return printf(value, ...variables);
			}
			return value;
		}
		return children;
	}, [currentMessages, children, variables]);

	if (!currentUser || currentUser.language === "en_US") {
		return children;
	}

	return message;
}
