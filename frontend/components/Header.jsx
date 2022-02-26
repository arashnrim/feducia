import Link from "next/link";
import { useRouter } from "next/router";
import { House, Wallet, Money, Question, Gear } from "phosphor-react";

const Header = () => {
  const router = useRouter();
  const path = router.asPath.replace("/", "");

  const pages = [
    { key: "home", text: "Home", icon: <House weight="bold" /> },
    { key: "wallet", text: "Wallet", icon: <Wallet weight="bold" /> },
    { key: "loans", text: "Loans", icon: <Money weight="bold" /> },
    { key: "help", text: "Help", icon: <Question weight="bold" /> },
    { key: "preferences", text: "Preferences", icon: <Gear weight="bold" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-row h-24 bg-white shadow-md backdrop-blur-md rounded-b-xl">
      <nav className="flex flex-row items-center ml-auto mr-10 space-x-8">
        {pages.map((page) => (
          <Link href={page.key} key={page.key} passHref>
            <div className="flex flex-col items-center font-bold cursor-pointer">
              <span className="text-2xl">{page.icon}</span>
              {page.text}
            </div>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
