import classNames from "classnames";
import { useLocalStorage } from "react-use";
import { defaultHTML } from "../../../utils/consts";

function ProModal({
  open,
  html,
  onClose,
}: {
  open: boolean;
  html: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [, setStorage] = useLocalStorage("html_content");

  const handleProClick = () => {
    if (html !== defaultHTML) {
      setStorage(html);
    }
  };

  return (
    <>
      <div
        className={classNames(
          "h-screen w-screen bg-black/20 fixed left-0 top-0 z-40",
          {
            "opacity-0 pointer-events-none": !open,
          }
        )}
        onClick={() => onClose(false)}
      ></div>
      <div
        className={classNames(
          "absolute top-0 -translate-y-[calc(100%+16px)] right-0 z-40 w-96 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-75 overflow-hidden",
          {
            "opacity-0 pointer-events-none": !open,
          }
        )}
      >
        <header className="flex items-center text-sm px-4 py-2 border-b border-gray-200 gap-2 bg-gray-100 font-semibold text-gray-700">
          <span className="bg-linear-to-br shadow-green-500/10 dark:shadow-green-500/20 inline-block -skew-x-12 border border-gray-200 from-pink-300 via-green-200 to-yellow-200 text-xs font-bold text-black shadow-lg dark:from-pink-500 dark:via-green-500 dark:to-yellow-500 dark:text-black rounded-lg px-2.5 py-0.5 ">
            PRO
          </span>
          Your free inference quota is exhausted
        </header>
        <main className="px-4 pt-3 pb-4">
          <p className="text-gray-950 text-sm font-semibold flex items-center justify-between">
            Upgrade to a PRO account to activate Inference Providers and
            continue using DeepSite.
          </p>
          <p className="text-sm text-pretty text-gray-500 mt-2">
            It also unlocks thousands of Space apps powered by ZeroGPU for 3d,
            audio, music, video and more!
          </p>
          <a
            href="https://huggingface.co/subscribe/pro"
            target="_blank"
            className="mt-4 bg-black text-white cursor-pointer rounded-full py-2 px-3 text-sm font-medium w-full block text-center hover:bg-gray-800 transition duration-200 ease-in-out"
            onClick={handleProClick}
          >
            Subscribe to PRO ($9/month)
          </a>
        </main>
      </div>
    </>
  );
}

export default ProModal;
