import { Route, Switch } from "wouter";
import { AboutPage } from "./routes/about.tsx";
import { HomePage } from "./routes/home.tsx";
import { NotFoundPage } from "./routes/not-found.tsx";

export function Routes() {
	return (
		<Switch>
			<Route path="/" component={HomePage} />
			<Route path="/about" component={AboutPage} />
			<Route component={NotFoundPage} />
		</Switch>
	);
}
