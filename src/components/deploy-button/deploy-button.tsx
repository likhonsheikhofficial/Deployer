/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";
import { FaPowerOff } from "react-icons/fa6";

import SpaceIcon from "@/assets/space.svg";
import Loading from "../loading/loading";
import Login from "../login/login";
import { Auth } from "./../../../utils/types";

const MsgToast = ({ url }: { url: string }) => (
  <div className="w-full flex items-center justify-center gap-3">
    Your space is live!
    <button
      className="bg-black text-sm block text-white rounded-md px-3 py-1.5 hover:bg-gray-900 cursor-pointer"
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      See Space
    </button>
  </div>
);

function DeployButton({
  html,
  error = false,
  auth,
}: {
  html: string;
  error: boolean;
  auth?: Auth;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState<string | undefined>(undefined);

  const [config, setConfig] = useState({
    title: "",
  });

  const createSpace = async () => {
    setLoading(true);

    try {
      const request = await fetch("/api/deploy", {
        method: "POST",
        body: JSON.stringify({
          title: config.title,
          path,
          html,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (response.ok) {
        toast.success(
          <MsgToast
            url={`https://huggingface.co/spaces/${response.path ?? path}`}
          />,
          {
            autoClose: 10000,
          }
        );
        setPath(response.path);
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative flex items-center justify-end">
      {auth && (
        <>
          <button
            className="mr-2 cursor-pointer"
            onClick={() => {
              if (confirm("Are you sure you want to log out?")) {
                // go to /auth/logout page
                window.location.href = "/auth/logout";
              }
            }}
          >
            <FaPowerOff className="text-lg text-red-500" />
          </button>
          <p className="mr-3 text-xs lg:text-sm text-gray-300">
            <span className="max-lg:hidden">Connected as </span>
            <a
              href={`https://huggingface.co/${auth.preferred_username}`}
              target="_blank"
              className="underline hover:text-white"
            >
              {auth.preferred_username}
            </a>
          </p>
        </>
      )}
      <button
        className={classNames(
          "relative cursor-pointer flex-none flex items-center justify-center rounded-md text-xs lg:text-sm font-semibold leading-5 lg:leading-6 py-1.5 px-5 hover:bg-pink-400 text-white shadow-sm dark:shadow-highlight/20",
          {
            "bg-pink-400": open,
            "bg-pink-500": !open,
          }
        )}
        onClick={() => setOpen(!open)}
      >
        {path ? "Update Space" : "Deploy to Space"}
      </button>
      <div
        className={classNames(
          "h-screen w-screen bg-black/20 fixed left-0 top-0 z-10",
          {
            "opacity-0 pointer-events-none": !open,
          }
        )}
        onClick={() => setOpen(false)}
      ></div>
      <div
        className={classNames(
          "absolute top-[calc(100%+8px)] right-0 z-10 w-80 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-75 overflow-hidden",
          {
            "opacity-0 pointer-events-none": !open,
          }
        )}
      >
        {!auth ? (
          <Login html={html}>
            <p className="text-gray-500 text-sm mb-3">
              Host this project for free and share it with your friends.
            </p>
          </Login>
        ) : (
          <>
            <header className="flex items-center text-sm px-4 py-2 border-b border-gray-200 gap-2 bg-gray-100 font-semibold text-gray-700">
              <span className="text-xs bg-pink-500/10 text-pink-500 rounded-full pl-1.5 pr-2.5 py-0.5 flex items-center justify-start gap-1.5">
                <img src={SpaceIcon} alt="Space Icon" className="size-4" />
                Space
              </span>
              Configure Deployment
            </header>
            <main className="px-4 pt-3 pb-4 space-y-3">
              <p className="text-xs text-amber-600 bg-amber-500/10 rounded-md p-2">
                {path ? (
                  <span>
                    Your space is live at{" "}
                    <a
                      href={`https://huggingface.co/spaces/${path}`}
                      target="_blank"
                      className="underline hover:text-amber-700"
                    >
                      huggingface.co/{path}
                    </a>
                    . You can update it by deploying again.
                  </span>
                ) : (
                  "Deploy your project to a space on the Hub. Spaces are a way to share your project with the world."
                )}
              </p>
              {!path && (
                <label className="block">
                  <p className="text-gray-600 text-sm font-medium mb-1.5">
                    Space Title
                  </p>
                  <input
                    type="text"
                    value={config.title}
                    className="mr-2 border rounded-md px-3 py-1.5 border-gray-300 w-full text-sm"
                    placeholder="My Awesome Space"
                    onChange={(e) =>
                      setConfig({ ...config, title: e.target.value })
                    }
                  />
                </label>
              )}
              {error && (
                <p className="text-red-500 text-xs bg-red-500/10 rounded-md p-2">
                  Your code has errors. Fix them before deploying.
                </p>
              )}
              <div className="pt-2 text-right">
                <button
                  disabled={error || loading || !config.title}
                  className="relative rounded-full bg-black px-5 py-2 text-white font-semibold text-xs hover:bg-black/90 transition-all duration-100 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                  onClick={createSpace}
                >
                  {path ? "Update Space" : "Create Space"}
                  {loading && <Loading />}
                </button>
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
}

export default DeployButton;
