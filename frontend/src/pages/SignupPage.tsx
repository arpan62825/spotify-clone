import {
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";

const SignupPage = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default SignupPage;
