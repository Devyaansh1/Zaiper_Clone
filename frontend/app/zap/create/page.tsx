"use client";
import Appbar from "@/components/Appbar";
import LinkButton from "@/components/buttons/LinkButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ZapCell from "@/components/ZapCell";
import { useState } from "react";

export default function () {
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState<
    {
      availableActionId: string;
      availableActionName: string;
    }[]
  >([]);
  return (
    <div>
      <Appbar />
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
        <div className="flex justify-center">
          <ZapCell
            name={selectedTrigger ? selectedTrigger : "Trigger"}
            index={1}
          />
        </div>
        <div className="w-full py-2">
          {selectedActions.map((action, index) => (
            <div className="pt-2 flex justify-center">
              <ZapCell
                name={
                  action.availableActionName
                    ? action.availableActionName
                    : "Action"
                }
                index={index + 2}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="">
            <PrimaryButton
              onClick={() => {
                setSelectedActions((action) => [
                  ...action,
                  {
                    availableActionId: "",
                    availableActionName: "",
                  },
                ]);
              }}
            >
              <div className="text-3xl font-semibold">+</div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
