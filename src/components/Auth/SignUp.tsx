import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useApp from "hooks/useApp";
import { useAuth } from "contexts/AuthContext";
import { Pages } from "enums/pages";
import { AuthSignUpInput } from "../../types/signUp";
import { useSignUp } from "framework/auth/signUp";
import { signUpValidation } from "validators/SignUpValidation";

const defaultValues: AuthSignUpInput = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  phone_number: ""
};

const Signup: React.FC = () => {
  const { setSession } = useAuth();
  const { push } = useApp();
  const { handleSubmit, register, formState: { isSubmitting } } = useForm<any>({
    resolver: yupResolver(signUpValidation),
    mode: "onChange",
    defaultValues
  });
  const { mutateAsync } = useSignUp();

  const onSubmit: SubmitHandler<AuthSignUpInput> = async (
    data: AuthSignUpInput
  ) => {
    try {
      const result = await mutateAsync(data);
      setSession(result);
      localStorage.setItem("session", JSON.stringify(result));
      localStorage.setItem("access_token", result.access);
      push(Pages.DASHBOARD);
    } catch (err) {
      //  @TODO should handle error
      console.log(err);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
      <div
        className="w-100 p-3 p-md-2 card border-0 bg-dark text-light"
        style={{ maxWidth: "32rem" }}
      >
        <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 text-center mb-1 mb-lg-3">
            <h1>Create your account</h1>
            <span>Free access to our dashboard.</span>
          </div>

          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">Full name</label>
              <input
                {...register("first_name")}
                type="text"
                className="form-control form-control-lg"
                placeholder="John"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">&nbsp;</label>
              <input
                {...register("last_name")}
                type="text"
                className="form-control form-control-lg"
                placeholder="Parker"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Email address</label>
              <input
                {...register("email")}
                type="email"
                className="form-control form-control-lg"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Phone Number</label>
              <input
                {...register("phone_number")}
                type="text"
                className="form-control form-control-lg"
                placeholder="phone number"
              />
            </div>
          </div>
          {/* ------------------------------ */}
          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                {...register("password")}
                type="text"
                className="form-control form-control-lg"
                placeholder="8+ characters "
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">&nbsp;</label>
              <input
                {...register("confirm_password")}
                type="text"
                className="form-control form-control-lg"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          {/* ------------------------------ */}

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I accept the{" "}
                <a
                  href="#!"
                  title="Terms and Conditions"
                  className="text-secondary"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            {/* <Link to="sign-in" className="btn btn-lg btn-block btn-light lift text-uppercase">
              SIGN UP
            </Link> */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-lg btn-block btn-light lift text-uppercase"
            >
              SIGN UP
            </button>
          </div>
          <div className="col-12 text-center mt-4">
            <span className="">
              Already have an account?{" "}
              <Link to="/" title="Sign in" className="text-secondary">
                &nbsp;Sign in here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
