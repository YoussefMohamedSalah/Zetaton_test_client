import { Pages } from "enums/pages";
import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";

const SignIn = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));

const Auth: React.FC = () => {
  let { slug } = useParams<{ slug: string }>();

  const renderContent = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return <SignIn />;
      case Pages.SIGNUP:
        return <SignUp />;
      default:
        return <SignIn />;
    }
  };

  return (
    <Suspense fallback={null}>
      {renderContent()}
    </Suspense>
  );
};

export default Auth;
