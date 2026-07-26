import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

export default function CompanyBrand({
  priority = false,
}: {
  priority?: boolean;
}) {
  return (
    <Link
      aria-label={`${brand.displayName} home`}
      className="brand"
      href="/"
    >
      <Image
        className="brand-mark"
        src={brand.assets.logoLight}
        alt=""
        width={44}
        height={44}
        priority={priority}
      />
      <span className="brand-copy">
        <strong>{brand.shortName}</strong>
        <span>Technologies</span>
      </span>
    </Link>
  );
}
