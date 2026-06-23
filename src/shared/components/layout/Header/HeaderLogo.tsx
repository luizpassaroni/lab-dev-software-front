import Image from "next/image";
import Link from "next/link";

const HeaderLogo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.svg"
        alt="Plot Twist"
        width={59}
        height={36}
        priority
      />
    </Link>
  );
};

HeaderLogo.displayName = "HeaderLogo";

export { HeaderLogo };
