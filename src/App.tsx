import { AuthProvider } from "contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from './firebaseIndex'
import { query, collection, getDocs, where } from "firebase/firestore";
import Loading from "components/common/Loading";
import useApp from "hooks/useApp";

const AuthIndex = lazy(() => import("./screens/AuthIndex"));
const MainIndex = lazy(() => import("./screens/MainIndex"));

const queryClient = new QueryClient();

const App = () => {
  const { push } = useApp();
  const [user, loading, error] = useAuthState(auth);

  const fetchUserData = async () => {
    
      localStorage.setItem("user", JSON.stringify(user));
      const access: string | null = localStorage.getItem("user");
      if(!access) return;
        const userObj: any = JSON.parse(access)
        let token = userObj.stsTokenManager.accessToken.replace(/['"]+/g, '')
        localStorage.setItem("token", token);

        
    try {
      const queryData = query(collection(db, "users"), where("uid", "==", user?.uid));
      const document = await getDocs(queryData);
      const userData = document.docs[0].data();
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return push("/");
    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(loading) return <Loading />
  if(error) return <div>Error</div>

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
          {user && (
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
