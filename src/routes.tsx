import { Route, Switch } from "wouter";
import { usePermission } from "./components/can.tsx";
import { HomePage } from "./routes/home.tsx";
import { NotFoundPage } from "./routes/not-found.tsx";
import { NotPermissionPage } from "./routes/not-permission.tsx";
import { RolesIndexPage } from "./routes/roles/index.tsx";
import { SettingsEditPage } from "./routes/settings/edit.tsx";
import { SettingsIndexPage } from "./routes/settings/index.tsx";
import { TodosIdEditPage } from "./routes/todos/id/edit.tsx";
import { TodosIndexPage } from "./routes/todos/index.tsx";
import { TodosNewPage } from "./routes/todos/new.tsx";
import { UsersIndexPage } from "./routes/users/index.tsx";

export function Routes() {
	const canTodos = usePermission("todos");
	const canRoles = usePermission("roles");
	const canUsersManagement = usePermission("users_management");

	return (
		<Switch>
			<Route path="/" component={HomePage} />
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
				path="/todos/:id/edit"
				component={canTodos ? TodosIdEditPage : NotPermissionPage}
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
