/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import classNames from "classnames";
import { toast, ToastContainer } from "react-toastify";
import { FaPowerOff } from "react-icons/fa6";
import 'react-toastify/dist/ReactToastify.css';

import SpaceIcon from "@/assets/space.svg";
import Loading from "../loading/loading";
import Login from "../login/login";
import { Auth } from "./../../../utils/types";
import { deployProviders, deploymentConfig } from '../../../utils/constants';

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

export const DeployButton = ({ code, onDeploy }: { code: string; onDeploy?: () => void }) => {
  const [deploying, setDeploying] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('');

  const handleDeploy = async (providerId: string) => {
    setDeploying(true);
    setSelectedProvider(providerId);

    try {
      let deployUrl = '';
      
      switch(providerId) {
        case 'vercel':
          deployUrl = await deployToVercel(code);
          break;
        case 'netlify':
          deployUrl = await deployToNetlify(code);
          break;
        case 'github':
          deployUrl = await deployToGitHub(code);
          break;
      }

      toast.success(
        <div className="flex items-center gap-2">
          <span>Deployment successful!</span>
          <a 
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 px-3 py-1 rounded hover:bg-white/20"
          >
            View Site
          </a>
        </div>
      );

      onDeploy?.();
    } catch (error) {
      toast.error('Deployment failed. Please try again.');
    } finally {
      setDeploying(false);
      setSelectedProvider('');
    }
  };

  const deploymentStatus = useCallback(async (deployUrl: string) => {
    return new Promise((resolve) => {
      const checkStatus = setInterval(async () => {
        try {
          const response = await fetch(deployUrl);
          if (response.ok) {
            clearInterval(checkStatus);
            resolve(true);
          }
        } catch (error) {
          console.error('Status check failed:', error);
        }
      }, 5000);
    });
  }, []);

  const handleDeployWithPreview = async (providerId: string) => {
    setDeploying(true);
    try {
      const previewUrl = await handleDeploy(providerId);
      if (previewUrl) {
        await deploymentStatus(previewUrl);
        toast.success(<MsgToast url={previewUrl} />);
      }
    } catch (error) {
      toast.error('Deployment failed');
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {deployProviders.map((provider) => (
        <button
          key={provider.id}
          onClick={() => handleDeploy(provider.id)}
          disabled={deploying}
          className={`
            flex items-center gap-3 p-4 rounded-lg border border-white/10
            hover:bg-white/5 transition-all relative overflow-hidden
            ${deploying && selectedProvider === provider.id ? 'animate-pulse' : ''}
          `}
        >
          <img src={provider.icon} alt={provider.name} className="w-6 h-6" />
          <div className="flex flex-col items-start">
            <span className="font-medium">{provider.name}</span>
            <span className="text-sm text-white/60">{provider.description}</span>
          </div>
          {deploying && selectedProvider === provider.id && (
            <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
