import { supabase } from "../utils/supabaseClient";
import { useState } from "react";

const Home = () => {
  const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error !== undefined) {
      alert(error.error_description || error.message);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <input
            className="w-full h-12 px-5 border border-gray-300 rounded-lg"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <input
            className="w-full h-12 px-5 border border-gray-300 rounded-lg"
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button
            className="bg-[#216de2] h-12 w-full rounded-lg hover:bg-[#1850a5] text-white font-bold"
            onClick={() => signIn(username, password)}
          >
            Confirm
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
