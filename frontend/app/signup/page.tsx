"use client";
import Appbar from "@/components/Appbar";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CheckFeature from "@/components/CheckFeature";
import Input from "@/components/Input";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Router = useRouter();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
          <div className="flex-1  px-4 pt-20">
            <div className="font-semibold text-3xl pb-4">
              Join millions worldwide who automate their work using Zapier
            </div>
            <div className="pb-6 pt-4">
              <CheckFeature label="Easy setup, no coding required" />
            </div>
            <div className="pb-6">
              <CheckFeature label="Free forever for core feature" />
            </div>
            <div className="pb-6">
              <CheckFeature label="14-day trail of premium feature & apps" />
            </div>
          </div>
          <div className="flex-1 mt-12 pt-6 pb-6 border rounded px-4">
            <Input
              label="Name"
              placeholder="Enter Your Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              placeholder="Enter Your Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              placeholder="Enter Your Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="pt-4">
              <PrimaryButton
                size="big"
                onClick={async () => {
                  const res = await axios.post(
                    `${BACKEND_URL}/api/v1/user/signup`,
                    {
                      username: email,
                      password,
                      name,
                    }
                  );
                  Router.push("/login");
                }}
              >
                Get Started Free
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
