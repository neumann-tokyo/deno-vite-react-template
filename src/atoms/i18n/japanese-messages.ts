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
	{
		en: "Roles and Permissions",
		value: "ロールと権限",
	},
	{
		en: "Roles",
		value: "ロール",
	},
	{
		en: "Roles Settings",
		value: "ロール設定",
	},
	{
		en: "Permissions Settings",
		value: "権限設定",
	},
	{ en: "Description", value: "説明" },
	{ en: "Display Order", value: "表示順" },
	{ en: "Add Role", value: "ロール追加" },
	{ en: "Users Management", value: "ユーザー管理" },
	{ en: "Users", value: "ユーザー" },
]);
