import { Robot, Phone, Chats } from "phosphor-react";
import Layout from "../components/Layout";

const Help = () => {
  return (
    <Layout>
      <main className="grid min-h-screen grid-cols-3 gap-10 p-20 pb-40 pt-60 h-fit">
        <section className="p-10 space-y-20 bg-white shadow-lg rounded-xl">
          <h1 className="row-span-1 text-3xl font-bold text-center">
            Got a simple question?
          </h1>
          <div className="flex items-center justify-center">
            <Robot size={200} />
          </div>
          <button className="bg-[#216de2] h-20 w-full rounded-lg hover:bg-[#1850a5] text-white text-2xl font-bold">
            Talk to our chatbot.
          </button>
        </section>
        <section className="p-10 space-y-20 bg-white shadow-lg rounded-xl">
          <h1 className="row-span-1 text-3xl font-bold text-center">
            Have a couple questions?
          </h1>
          <div className="flex items-center justify-center">
            <Chats size={200} />
          </div>
          <button className="bg-[#216de2] h-20 w-full rounded-lg hover:bg-[#1850a5] text-white text-2xl font-bold">
            Talk to a human.
          </button>
        </section>
        <section className="p-10 space-y-20 bg-white shadow-lg rounded-xl">
          <h1 className="row-span-1 text-3xl font-bold text-center">
            Need more help?
          </h1>
          <div className="flex items-center justify-center">
            <Phone size={200} />
          </div>
          <button className="bg-[#216de2] h-20 w-full rounded-lg hover:bg-[#1850a5] text-white text-2xl font-bold">
            Call a human.
          </button>
        </section>
      </main>
    </Layout>
  );
};

export default Help;
