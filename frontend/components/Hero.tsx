"use client";
import { useRouter } from "next/navigation";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import Feature from "./Feature";

const Hero = () => {
  const Router = useRouter();

  return (
    <div>
      <div className="flex justify-center">
        <div className="text-5xl font-semibold text-center pt-8 max-w-xl">
          Automate as fast as you can type
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-lg font-medium text-center pt-8 max-w-2xl">
          AI gives you automation superpowers, and Zapier puts them to work.
          Pairing Ai and Zapier helps you turn ideas into workflows and bots
          that work for you
        </div>
      </div>
      <div className="flex justify-center pt-8">
        <div className="flex">
          <PrimaryButton
            onClick={() => {
              Router.push("/signup");
            }}
            size="big"
          >
            Get Started Free
          </PrimaryButton>
          <div className="pl-4">
            <SecondaryButton onClick={() => {}} size="big">
              Contact Sales
            </SecondaryButton>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <Feature title="Free forever" subtitle="for core features" />
        <Feature title="More apps" subtitle="than any other platform" />
        <Feature title="Cutting edge" subtitle="AI features" />
      </div>
    </div>
  );
};

export default Hero;
