import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import Sidebar from "./SideBar";

const Header = () => {
  return (
    <header className="mt-10 mb-10 flex justify-between gap-5">
      <div className="flex items-center gap-10">
        <Sidebar/>

        <Link href="/">
          <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        </Link>

        <Link href="/my-profile">
          <Image src="/icons/user-fill.svg" alt="My Profile" width={40} height={40} />
        </Link>
      </div>

      <SearchBar />

      <ul className="flex flex-row items-center gap-8">
        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className="mb-0"
          >
            <Button>Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
