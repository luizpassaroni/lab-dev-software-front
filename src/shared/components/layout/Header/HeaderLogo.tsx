import Image from "next/image";
import Link from "next/link";
import { HeaderBrandWord } from "./HeaderBrandWord";

const HeaderLogo = () => {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src="/images/logo.svg"
        alt="Plot Twist"
        width={59}
        height={36}
        className="transition-[filter] dark:invert"
        priority
      />
      <HeaderBrandWord />
    </Link>
  );
};

HeaderLogo.displayName = "HeaderLogo";

export { HeaderLogo };
