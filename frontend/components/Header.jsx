import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const path = router.asPath.replace("/", "");

  const pages = [
    { key: "home", text: "Home" },
    { key: "wallet", text: "Wallet" },
    { key: "loans", text: "Loans" },
    { key: "help", text: "Help" },
    { key: "preferences", text: "Preferences" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-row h-24 bg-white shadow-md backdrop-blur-md rounded-b-xl">
      <nav className="flex flex-row items-center ml-auto mr-10 space-x-5 text-2xl font-bold">
        {pages.map((page) => (
          <Link
            href={page.key}
            key={page.key}
            className={`cursor-pointer ${
              page.key === path ? "text-blue-500" : "hover:text-gray-500"
            }`}
          >
            {page.text}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
