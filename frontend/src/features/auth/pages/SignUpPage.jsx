import { SignUp } from "@clerk/react";

function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </div>
  );
}

export default SignUpPage;