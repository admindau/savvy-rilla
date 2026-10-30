import Image from "next/image";
import Link from "next/link";
import ProductLogo from "@/components/product-logo";
import { products } from "@/lib/products";
import { brand } from "@/lib/brand";

type GraphicKind = "portfolio" | "company" | "capabilities" | "insights" | "contact";

// Portfolio tiles provide shortcuts; the other illustrations are decorative.
export default function PageGraphic({ kind, directAccess = false }: { kind: GraphicKind; directAccess?: boolean }) {
  return (
    <div className={`page-graphic page-graphic-${kind}`} aria-hidden={kind !== "portfolio" || undefined}>
      <div className="graphic-caption"><span />{kind === "portfolio" ? "The product family" : kind === "company" ? "Our starting point" : kind === "capabilities" ? "The operating model" : kind === "insights" ? "The working notebook" : "An open conversation"}</div>
      {kind === "portfolio" ? (
        <div className="graphic-portfolio">
          {products.map(product => <Link key={product.slug} className="graphic-product" href={directAccess ? product.url : `/products/${product.slug}`} target={directAccess ? "_blank" : undefined} rel={directAccess ? "noreferrer" : undefined} aria-label={directAccess ? `Visit ${product.shortName} (opens in a new tab)` : `Explore ${product.shortName}`}><ProductLogo product={product} decorative sizes="64px" /><span>{product.shortName}</span></Link>)}
        </div>
      ) : kind === "company" ? (
        <div className="graphic-place">
          <div className="graphic-place-rings" />
          <Image src={brand.assets.logoLight} alt="" width={112} height={112} sizes="112px" />
          <strong>Juba</strong><span>South Sudan · Built for the world</span>
        </div>
      ) : kind === "capabilities" ? (
        <div className="graphic-workflow">
          {["Discover", "Design", "Build", "Operate"].map((step,index) => <div key={step}><span>0{index+1}</span><strong>{step}</strong><i>{index === 3 ? "↻" : "↗"}</i></div>)}
          <p>One team. From first idea to everyday use.</p>
        </div>
      ) : kind === "insights" ? (
        <div className="graphic-notebook"><span>FIELD NOTES / SRT</span><div className="graphic-note-lines" /><strong>Build.<br />Learn.<br /><em>Improve.</em></strong><span>Ideas shaped by the work.</span></div>
      ) : (
        <div className="graphic-conversation"><div className="graphic-message">A useful idea starts<br />with a conversation.<span>↗</span></div><div className="graphic-reply"><i /><i /><i /></div><span>Products · Partnerships · Possibility</span></div>
      )}
    </div>
  );
}
