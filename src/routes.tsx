import { Route, Switch } from "wouter";
import { HomePage } from "./routes/home.tsx";
import { AboutPage } from "./routes/about.tsx";

export function Routes() {
  return (
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/about">
        <AboutPage />
      </Route>
    </Switch>
  );
}
