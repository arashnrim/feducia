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
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-row h-24 shadow-md rounded-b-xl">
      <nav className="flex items-center ml-auto mr-10">
        <ul className="flex flex-row space-x-5 text-2xl font-bold">
          {pages.map((page) => (
            <Link
              href={page.key}
              key={page.key}
              className={
                "cursor-pointer " +
                (path === page.key ? "text-blue-500" : "hover:text-gray-600")
              }
            >
              {page.text}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
