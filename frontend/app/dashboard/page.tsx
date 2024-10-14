"use client";
import Appbar from "@/components/Appbar";
import DarkButton from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import LinkButton from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
    };
  };
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    zaps,
  };
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
  const Router = useRouter();

  return (
    <div className="p-8 max-w-screen-lg w-full">
      <div className="flex">
        <div className="flex-1">Name</div>
        <div className="flex-1">Last Edit</div>
        <div className="flex-1">Running</div>
        <div className="flex-1">Go</div>
      </div>
      {zaps.map((zap) => (
        <div className="flex border-b border-t py-4">
          <div className="flex-1">
            {zap.trigger.type.name} {zap.actions.map((x) => x.type.name + " ")}
          </div>
          <div className="flex-1">{zap.id}</div>
          <div className="flex-1">09 Oct, 2024</div>
          <div className="flex-1">
            <LinkButton
              onClick={() => {
                Router.push("/zap/" + zap.id);
              }}
            >
              Go
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function () {
  const { loading, zaps } = useZaps();
  const Router = useRouter();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg w-full">
          <div className="flex justify-between pr-8">
            <div className="text-xl font-bold">My Zaps</div>
            <DarkButton
              onClick={() => {
                Router.push("/zap/create");
              }}
            >
              Create Zap
            </DarkButton>
          </div>
        </div>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex justify-center">
          <ZapTable zaps={zaps} />
        </div>
      )}
    </div>
  );
}
