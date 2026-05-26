import { BrowserRouter } from "react-router-dom";
import { AppShell } from "./AppShell";

const routerBase =
  import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter
      basename={routerBase}
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
