"use client";
import { useRouter } from "next/navigation";
import LinkButton from "./buttons/LinkButton";
import PrimaryButton from "./buttons/PrimaryButton";

const Appbar = () => {
  const Router = useRouter();

  return (
    <nav className="flex border-b justify-between p-4">
      <div className="flex flex-col justify-center text-2xl font-extrabold">
        zapier
      </div>
      <div className="flex">
        <div className="pr-4">
          <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        </div>
        <div className="pr-4">
          <LinkButton
            onClick={() => {
              Router.push("/login");
            }}
          >
            Login
          </LinkButton>
        </div>
        <PrimaryButton
          onClick={() => {
            Router.push("/signup");
          }}
        >
          Signup
        </PrimaryButton>
      </div>
    </nav>
  );
};

export default Appbar;
