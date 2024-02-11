import { Route, Switch } from "wouter";
import { HomePage } from "./routes/home.tsx";
import { AboutPage } from "./routes/about.tsx";
import { NotFoundPage } from "./routes/not-found.tsx";

export function Routes() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" compoent={AboutPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
