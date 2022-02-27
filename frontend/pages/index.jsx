import { useRouter } from "next/router";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const signIn = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
    ethereum.on("accountsChanged", function (accounts) {
      if (accounts.length > 0) {
        setRedirecting(true);
        router.push("/home");
      }
    });
  };

  const validateSession = async () => {
    const selectedAccount = await ethereum.selectedAddress;
    if (selectedAccount) {
      setRedirecting(true);
      router.push("/home");
    }
  };

  validateSession();

  return (
    <main className="flex w-screen h-screen">
      <section className="w-[70vw] bg-[#216de2] rounded-r-xl">
        <h1 className="text-5xl text-white ">Logo here</h1>
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Welcome to xxx!</h1>
        </div>
      </section>
      <section className="w-[30vw] bg-gray-100 flex justify-center items-center">
        <div className="w-full p-10 mx-10 space-y-5 bg-white shadow-lg h-1/2 rounded-xl">
          <h1 className="text-3xl font-bold">
            {redirecting ? "All set!" : "Log in"}
          </h1>
          <p>
            {redirecting
              ? "You will be redirected to the dashboard shortly."
              : "Select the provider you use for your wallet."}
          </p>
          <button
            className="bg-[#216de2] h-12 w-full rounded-lg hover:bg-[#1850a5] text-white font-bold"
            onClick={() => signIn()}
            hidden={redirecting}
          >
            Log in with Metamask
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
