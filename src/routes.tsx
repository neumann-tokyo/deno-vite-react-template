import { useAtomValue } from "jotai";
import { Route, Switch } from "wouter";
import { jwtTokenAtom } from "./atoms/current-user.ts";
import { usePermission } from "./components/can.tsx";
import { HomePage } from "./routes/home.tsx";
import { NotFoundPage } from "./routes/not-found.tsx";
import { NotPermissionPage } from "./routes/not-permission.tsx";
import { RolesIndexPage } from "./routes/roles/index.tsx";
import { SettingsEditPage } from "./routes/settings/edit.tsx";
import { SettingsIndexPage } from "./routes/settings/index.tsx";
import { SignInPage } from "./routes/sign-in.tsx";
import { SignUpPage } from "./routes/sign-up.tsx";
import { TodosIndexPage } from "./routes/todos/index.tsx";
import { TodosNewPage } from "./routes/todos/new.tsx";
import { UsersIndexPage } from "./routes/users/index.tsx";

export function Routes() {
	const canTodos = usePermission("todos");
	const canRoles = usePermission("roles");
	const canUsersManagement = usePermission("users_management");
	const jwtToken = useAtomValue(jwtTokenAtom);

	return (
		<Switch>
			<Route path="/" component={jwtToken == null ? SignInPage : HomePage} />
			<Route path="/sign_up/:identifier" component={SignUpPage} />
			<Route path="/settings" component={SettingsIndexPage} />
			<Route path="/settings/edit" component={SettingsEditPage} />
			<Route
				path="/todos"
				component={canTodos ? TodosIndexPage : NotPermissionPage}
			/>
			<Route
				path="/todos/new"
				component={canTodos ? TodosNewPage : NotPermissionPage}
			/>
			<Route
				path="/roles"
				component={canRoles ? RolesIndexPage : NotPermissionPage}
			/>
			<Route
				path="/users"
				component={canUsersManagement ? UsersIndexPage : NotPermissionPage}
			/>
			<Route component={NotFoundPage} />
		</Switch>
	);
}
