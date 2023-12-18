import { useState } from "react";
import AppRoutes from "./components/AppRoutes";
import AuthRoutes from "./components/AuthRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return <>{isAuthenticated ? <AppRoutes /> : <AuthRoutes />}</>;
}

export default App;
