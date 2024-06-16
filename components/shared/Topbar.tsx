import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/moryeti-logo.png" alt="logo" width={240} height={72} />
        <span className="px-2 py-1 bg-primary-500 text-base-semibold text-light-1 rounded-full">
          Beta
        </span>
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
