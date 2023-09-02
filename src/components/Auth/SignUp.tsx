import { Link } from "react-router-dom";
import useApp from "hooks/useApp";
import { Pages } from "enums/pages";
import { AuthSignUpInput } from "../../types/signUp";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signUpFirebase } from "../../firebaseIndex";
import Loading from "components/common/Loading";
import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";

const defaultValues: AuthSignUpInput = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone_number: ""
};

const Signup: React.FC = () => {
  const { push } = useApp();
  const { setSession } = useAuth();
  const [state, setState] = useState<AuthSignUpInput>({ ...defaultValues });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(auth);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      password,
      password_confirmation
    } = state;
    if (!first_name || !last_name || !email || !password)
      return alert("Please fill all fields");
    if (password.length < 8)
      return alert("Password must be at least 8 characters");
    if (password !== password_confirmation)
      return alert("Passwords do not match");
    console.log("submitting");
    setIsSubmitting(true);
    try {
      await signUpFirebase(first_name, last_name, email, password);
      if (user) {
        console.log(user);
        setSession(user);
        setIsSubmitting(false);
        push(Pages.DASHBOARD);
      }
    } catch (err) {
      //  @TODO should handle error
      console.log(err);
    }
  };

  useEffect(
    () => {
      if (loading) return;
      if (user) push(Pages.DASHBOARD);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading]
  );

  if (loading) return <Loading />;
  if (error) return <div>error</div>;
  return (
    <div className="d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
      <div
        className="w-100 p-3 p-md-2 card border-0 bg-dark text-light"
        style={{ maxWidth: "32rem" }}
      >
        <form className="row g-1 p-3 p-md-4">
          <div className="col-12 text-center mb-1 mb-lg-3">
            <h1>Create your account</h1>
            <span>Free access to our dashboard.</span>
          </div>

          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">Full name</label>
              <input
                onChange={e =>
                  setState({ ...state, first_name: e.target.value })}
                type="text"
                className="form-control form-control-lg"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">&nbsp;</label>
              <input
                onChange={e =>
                  setState({ ...state, last_name: e.target.value })}
                type="text"
                className="form-control form-control-lg"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Email address</label>
              <input
                onChange={e => setState({ ...state, email: e.target.value })}
                type="email"
                className="form-control form-control-lg"
                placeholder="ex@example.com"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Phone Number</label>
              <input
                onChange={e =>
                  setState({ ...state, phone_number: e.target.value })}
                type="text"
                className="form-control form-control-lg"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                onChange={e => setState({ ...state, password: e.target.value })}
                type="password"
                className="form-control form-control-lg"
                placeholder="8+ characters "
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">&nbsp;</label>
              <input
                onChange={e =>
                  setState({ ...state, password_confirmation: e.target.value })}
                type="password"
                className="form-control form-control-lg"
                placeholder="Confirm Password"
              />
            </div>
          </div>
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
            <button
              disabled={isSubmitting}
              onClick={e => handleSignUp(e)}
              className="btn btn-lg btn-block btn-light lift text-uppercase"
            >
              SIGN UP
            </button>
          </div>
          <div className="col-12 text-center mt-4">
            <span className="">
              Already have an account?{" "}
              <Link to="/signin" title="Sign in" className="text-secondary">
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
