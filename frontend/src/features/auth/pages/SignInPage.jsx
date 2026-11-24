import { SignIn } from "@clerk/react";

function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        
      />
    </div>
  );
}

export default SignInPage;