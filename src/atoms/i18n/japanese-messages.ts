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
	{
		en: "Leave the system",
		value: "システムから退会する",
	},
	{
		en: "Are you sure? You can't undo this action afterwards.",
		value: "本当によろしいですか？この操作は取り消すことができません。",
	},
	{
		en: "Leaved",
		value: "退会済み",
	},
	{
		en: "Leave",
		value: "退会する",
	},
	{ en: "Rejected", value: "追放済み" },
	{ en: "Reject", value: "追放する" },
	{
		en: "Cancel",
		value: "キャンセル",
	},
	{
		en: "Actions",
		value: "操作",
	},
	{
		en: "Edit",
		value: "編集",
	},
	{
		en: "Invite new user",
		value: "新しいユーザーを招待する",
	},
	{
		en: "Expired Time",
		value: "有効期限",
	},
	{
		en: "Generate a new invitation link",
		value: "新しい招待リンクを生成する",
	},
	{
		en: "Submit",
		value: "送信",
	},
	{
		en: "Generate",
		value: "生成",
	},
	{
		en: "Set an expire time",
		value: "有効期限を設定する",
	},
	{
		en: "Copy",
		value: "コピー",
	},
	{
		en: "None",
		value: "なし",
	},
	{
		en: "Delete",
		value: "削除",
	},
	{
		en: "Invalid invitation token",
		value: "無効な招待トークン",
	},
	{
		en: "Password length is between 8 and 50",
		value: "Password は 8 から 50 文字の間で入力してください",
	},
	{
		en: "Edit User",
		value: "ユーザーを編集する",
	},
	{
		en: "Change Password",
		value: "パスワードを変更する",
	},
]);
