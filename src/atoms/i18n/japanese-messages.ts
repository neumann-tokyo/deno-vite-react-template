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
		en: "Date Format",
		value: "日付形式",
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
	{
		en: "Back",
		value: "戻る",
	},
	{
		en: "Current time",
		value: "現在時刻",
	},
	{
		en: "New",
		value: "新規作成",
	},
	{
		en: "Title",
		value: "タイトル",
	},
]);
