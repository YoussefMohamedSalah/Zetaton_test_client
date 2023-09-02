import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useApp from "hooks/useApp";
import Loading from "components/common/Loading";
import { Pages } from "enums/pages";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseIndex";

const SignIn = lazy(() => import("../components/Auth/SignIn"));
const Auth = lazy(() => import("../components/Auth/Auth"));

type IState = { initialized: boolean };
const INITIAL_STATE: IState = { initialized: false };

const AuthIndex: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [state, setState] = useState<IState>(INITIAL_STATE);
  const { initialized } = state;
  const { push } = useApp();

  useEffect(
    () => {
      if (user) {
        push(Pages.DASHBOARD);
      } else {
        setState(prevState => ({ ...prevState, initialized: true }));
      }
    },
    // eslint-disable-next-line
    [user, loading]
  );

  if (!initialized) return <Loading />;
  return (
    <div className="main p-2 py-3 p-xl-5 ">
      <div className="body d-flex p-0 p-xl-5">
        <div className="container-xxl">
          <div className="row g-0">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path=":slug/*" element={<Auth />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthIndex;
