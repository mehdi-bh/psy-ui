"use client";

import { signInWithRedirect } from 'aws-amplify/auth';
import { Button } from "@nextui-org/react";

const SignInButton = () => {
  const signIn = async () => {
    try {
      await signInWithRedirect({
        provider: 'Google',
      });
    } catch (error) {
      console.log("Error signing in", error);
    }
  };

  return (
    <Button onClick={signIn}>
      Sign In with Google
    </Button>
  );
};

export default SignInButton;
