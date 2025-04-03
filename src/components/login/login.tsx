import { useLocalStorage } from "react-use";
import { defaultHTML } from "./../../../utils/consts";

function Login({
  html,
  children,
}: {
  html?: string;
  children?: React.ReactNode;
}) {
  const [, setStorage] = useLocalStorage("html_content");

  const handleClick = () => {
    if (html !== defaultHTML) {
      setStorage(html);
    }
  };

  return (
    <>
      <header className="flex items-center text-sm px-4 py-2 border-b border-gray-200 gap-2 bg-gray-100 font-semibold text-gray-700">
        <span className="text-xs bg-red-500/10 text-red-500 rounded-full pl-1.5 pr-2.5 py-0.5 flex items-center justify-start gap-1.5">
          REQUIRED
        </span>
        Login with Hugging Face
      </header>
      <main className="px-4 py-4 space-y-3">
        {children}
        <a href="/api/login" onClick={handleClick}>
          <img
            src="https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-lg-dark.svg"
            alt="Sign in with Hugging Face"
            className="mx-auto"
          />
        </a>
      </main>
    </>
  );
}

export default Login;
