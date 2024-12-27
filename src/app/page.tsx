"use client";

import {
  LoginLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  const user = useKindeBrowserClient().getUser();
  return (
    <div>
      <h1>Real Time Chat App</h1>
      <LoginLink>Sign In</LoginLink>
      <RegisterLink>Sign Up</RegisterLink>
      <br />
      <div> {JSON.stringify(user)}</div>
    </div>
  );
}
