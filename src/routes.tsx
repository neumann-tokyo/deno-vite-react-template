import { Route, Switch } from "wouter";
import { HomePage } from "./routes/home.tsx";
import { NotFoundPage } from "./routes/not-found.tsx";
import { SettingsEditPage } from "./routes/settings/edit.tsx";
import { SettingsIndexPage } from "./routes/settings/index.tsx";
import { TodosIdEditPage } from "./routes/todos/id/edit.tsx";
import { TodosIdIndexPage } from "./routes/todos/id/index.tsx";
import { TodosIndexPage } from "./routes/todos/index.tsx";
import { TodosNewPage } from "./routes/todos/new.tsx";

export function Routes() {
	return (
		<Switch>
			<Route path="/" component={HomePage} />
			<Route path="/todos" component={TodosIndexPage} />
			<Route path="/todos/new" component={TodosNewPage} />
			<Route path="/todos/:id" component={TodosIdIndexPage} />
			<Route path="/todos/:id/edit" component={TodosIdEditPage} />
			<Route path="/settings" component={SettingsIndexPage} />
			<Route path="/settings/edit" component={SettingsEditPage} />
			<Route component={NotFoundPage} />
		</Switch>
	);
}
