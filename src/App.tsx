import { AuthProvider } from "contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { isAuthorized } from "utils/token";

const AuthIndex = lazy(() => import("./screens/AuthIndex"));
const MainIndex = lazy(() => import("./screens/MainIndex"));

const queryClient = new QueryClient();

const App = () => {
  const isAuth = isAuthorized();


  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <>
        <Routes>
          <Route
            path="/*"
            element={
              <Suspense fallback={null}>
                <AuthIndex />
              </Suspense>
            }
          />
          {isAuth && (
            <Route
            path="dashboard/*"
            element={
              <Suspense fallback={null}>
                <MainIndex />
              </Suspense>
            }
            />
            )}
        </Routes>
      </>
    </AuthProvider>
  </QueryClientProvider>
  );
}

export default App;
