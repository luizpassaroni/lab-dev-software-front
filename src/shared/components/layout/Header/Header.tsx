import { getMe } from "@/modules/auth/queries/getMe";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderUser } from "./HeaderUser";
import { ThemeToggle } from "./ThemeToggle";

const Header = async () => {
  const user = await getMe();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <HeaderLogo />
        <div className="flex flex-1 items-center justify-end gap-3">
          <HeaderSearch />
          <ThemeToggle />
          <HeaderUser user={user} />
        </div>
      </div>
    </header>
  );
};

Header.displayName = "Header";

export { Header };
