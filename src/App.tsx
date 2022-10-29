import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Diagnosa from "./components/Diagnosa";

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <div className="container">
        <Diagnosa />
      </div>
    </QueryClientProvider>
  );
}

export default App;
