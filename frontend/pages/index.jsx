const Home = () => {
  const signIn = () => {
    // TODO: Implement linking here
  };

  return (
    <main className="flex w-screen h-screen">
      <section className="w-[70vw]  bg-[#216de2]">
        <h1 className="text-5xl text-white ">Logo here</h1>
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Welcome to xxx!</h1>
        </div>
      </section>
      <section className="w-[30vw] bg-gray-100 flex justify-center items-center">
        <div className="w-full p-10 mx-10 space-y-5 bg-white shadow-lg h-1/2 rounded-xl">
          <h1 className="text-3xl font-bold">Log in</h1>
          <p>Select the provider you use for your wallet.</p>
          <button
            className="bg-[#216de2] h-12 w-full rounded-lg hover:bg-[#1850a5] text-white font-bold"
            onClick={() => signIn()}
          >
            Log in with Metamask
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
