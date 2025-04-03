/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { deployProviders } from '../../../utils/constants';
import { deployToVercel, deployToNetlify, deployToGitHub } from '../../../utils/deployment';

interface DeployButtonProps {
  code: string;
  onDeploy?: () => void;
}

export const DeployButton = ({ code, onDeploy }: DeployButtonProps) => {
  const [deploying, setDeploying] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('');

  const handleDeploy = async (providerId: string) => {
    setDeploying(true);
    setSelectedProvider(providerId);

    try {
      let result;
      switch(providerId) {
        case 'vercel':
          result = await deployToVercel(code);
          break;
        case 'netlify':
          result = await deployToNetlify(code);
          break;
        case 'github':
          result = await deployToGitHub(code);
          break;
        default:
          throw new Error('Invalid provider');
      }

      if (result.success) {
        toast.success(
          <div className="flex items-center gap-2">
            <span>Deployment successful!</span>
            <a 
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 px-3 py-1 rounded hover:bg-white/20"
            >
              View Site
            </a>
          </div>
        );
        onDeploy?.();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(`Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDeploying(false);
      setSelectedProvider('');
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
