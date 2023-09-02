import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useApp from "hooks/useApp";
import { AuthSignInInput } from "../../types/signIn";
import { signInValidation } from "validators/SignInValidation";
import { Pages } from "enums/pages";
import Loading from "components/common/Loading";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInFirebase } from "../../firebaseIndex";
import { useAuth } from "contexts/AuthContext";

const defaultValues: AuthSignInInput = { email: "", password: "" };

const SignIn: React.FC = () => {
  const { push } = useApp();
  const { setSession } = useAuth();

  const [user, loading, error] = useAuthState(auth);
  const { handleSubmit, register, formState: { isSubmitting } } = useForm<any>({
    resolver: yupResolver(signInValidation),
    mode: "onChange",
    defaultValues
  });

  const onSubmit: SubmitHandler<AuthSignInInput> = async (
    data: AuthSignInInput
  ) => {
    try {
      await signInFirebase(data.email, data.password);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        const userToken = await user.getIdToken();
        localStorage.setItem("token", JSON.stringify(userToken));
        setSession(userToken);
        push(Pages.DASHBOARD);
      }
    } catch (err) {
      //  @TODO should handle error
      console.log(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>error</div>;
  return (
    <div className="d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
      <div
        className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
        style={{ maxWidth: "32rem" }}
      >
        <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 text-center mb-1 mb-lg-5">
            <h1>Sign in</h1>
            <span>Sign in to your Business dashboard.</span>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">email</label>
              <input
                {...register("email")}
                type="email"
                className="form-control form-control-lg"
                placeholder="email"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <div className="form-label">
                <span className="d-flex justify-content-between align-items-center">
                  Password
                  <Link className="text-secondary" to="password-reset">
                    Forgot Password?
                  </Link>
                </span>
              </div>
              <input
                {...register("password")}
                type="password"
                className="form-control form-control-lg"
                placeholder="***************"
              />
            </div>
          </div>
          <div className="col-12 text-center mt-4 g-4">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-lg btn-block btn-light lift text-uppercase"
            >
              SIGN IN
            </button>
          </div>
        </form>
        <div className="col-12 text-center mt-4">
          <span className="">
            Don't have an account?{" "}
            <Link to="/signup" title="Sign in" className="text-secondary">
              &nbsp;Sign up here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
