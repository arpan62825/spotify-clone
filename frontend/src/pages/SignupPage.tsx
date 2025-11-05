import { SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const SignupPage = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedOut>
        <UserButton />
      </SignedOut>
    </div>
  );
};

export default SignupPage;
