import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo-mini.png" alt="logo" width={48} height={48} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          <span className=" mr-1 text-primary-500">Mor</span>
          yeti
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <UserButton
          appearance={{ baseTheme: dark }}
          showName={true}
          afterSignOutUrl="/"
        />
      </div>
    </nav>
  );
}

export default Topbar;
