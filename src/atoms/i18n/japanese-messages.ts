import { atom } from "jotai";
import type { LanguageMessage } from "../../types.ts";

export const japaneseMessagesAtom = atom<LanguageMessage[]>([
	{
		en: "Settings",
		value: "設定",
	},
	{
		en: "Display Name",
		value: "表示名",
	},
	{
		en: "Language",
		value: "言語",
	},
	{
		en: "Timezone",
		value: "時間帯",
	},
	{
		en: "Toggle Light",
		value: "ライトモードに切り替え",
	},
	{
		en: "Toggle Dark",
		value: "ダークモードに切り替え",
	},
	{
		en: "Edit Profile",
		value: "プロフィールを編集する",
	},
]);
