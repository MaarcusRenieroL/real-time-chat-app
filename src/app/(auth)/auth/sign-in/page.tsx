"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";

export default function SignInPage() {
  return (
    <Card>
      <CardHeader className="text-center space-y-5">
        <CardTitle>Welcome to Chat App</CardTitle>
        <CardDescription>
          Please sign in with one of the Auth Providers
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full space-y-5">
        <Button
          className="w-full flex items-center space-x-5"
          onClick={async () => {
            await signIn("google");
            redirect("/chats");
          }}
        >
          <BsGoogle className="h-4 w-4" />
          <span>Sign in with Google</span>
        </Button>
        <Button
          className="w-full flex items-center space-x-5"
          onClick={async () => {
            await signIn("github");
            redirect("/chats");
          }}
        >
          <BsGithub className="h-4 w-4" />
          <span>Sign in with Github</span>
        </Button>
      </CardContent>
    </Card>
  );
}
