import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { AppShell } from "../app/AppShell";

export function renderApp(initialEntries: string[] = ["/"]) {
  return render(
    <MemoryRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      initialEntries={initialEntries}
    >
      <AppShell />
    </MemoryRouter>,
  );
}

export function renderWithRouter(
  ui: ReactElement,
  initialEntries: string[] = ["/"],
) {
  return render(
    <MemoryRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      initialEntries={initialEntries}
    >
      {ui}
    </MemoryRouter>,
  );
}
