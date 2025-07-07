import { SignIn } from "@clerk/clerk-react";
import "./signInPage.css";
const Signinpage = () => {
  return (
    <div className="signInPage">
      <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl={"/"} />
    </div>
  );
};

export default Signinpage;
