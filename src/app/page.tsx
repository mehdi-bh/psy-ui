"use client";

import SignInButton from "@/src/components/SignInButton";

import 'aws-amplify/auth/enable-oauth-listener';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { useState, useEffect } from "react";
import { stringify } from "json5";

export default function Home() {
  const [user, setUser] = useState<string>("qweqwe");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      const userAttributes = await fetchUserAttributes();
      setUser(stringify(userAttributes) || "qweqwe");
    };

    fetchUser();

    const listener = async ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          const user = await getCurrentUser();
          const userAttributes = await fetchUserAttributes();
          setUser(stringify(userAttributes) || "qweqwe");
          console.log({ user, userAttributes });
          break;
        case "signInWithRedirect_failure":
          // handle sign in failure
          break;
        case "customOAuthState":
          const state = payload.data; // this will be customState provided on signInWithRedirect function
          console.log(state);
          break;
      }
    };

    Hub.listen("auth", listener);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl">Welcome to the Home Page</h1>
      <SignInButton />
      <div>{user}</div>
    </div>
  );
}
