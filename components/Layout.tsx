import Link from "next/link";
import { useRouter } from "next/router";
import { default as HTMLHead } from "next/head";

import type { ReactElement } from "react";

export default function Layout({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <div>
      <Head />
      <Header />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}

function Head(): ReactElement {
  return (
    <HTMLHead>
      <title>MLoot</title>
      <meta name="title" content="MLoot" />
      <meta
        name="description"
        content="MLoot is randomly generated with 12 english mnemonic words and stored on chain."
      />

      {/* OG + Faceook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.mlootproject.com/" />
      <meta property="og:title" content="MLoot" />
      <meta
        property="og:description"
        content="MLoot is randomly generated with 12 english mnemonic words and stored on chain."
      />
      <meta property="og:image" content="https://mlootproject.com/meta.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.mlootproject.com/" />
      <meta property="twitter:title" content="MLoot" />
      <meta
        property="twitter:description"
        content="MLoot is randomly generated with 12 english mnemonic words and stored on chain."
      />
      <meta property="twitter:image" content="https://mlootproject.com/meta.png" />

      {/* Font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </HTMLHead>
  );
}

/**
 * Header
 * @returns {ReactElement} Header
 */
function Header() {
  // Collect current path for active links
  const { pathname } = useRouter();
  // All links
  const links = [
    { name: "FAQ", path: "/faq" },
    { name: "Resources", path: "/resources" },
  ];

  return (
    <div className="flex flex-row px-5 py-5 m-auto justify-around justify-items-center">
      <div className="text-3xl hover:opacity-80">
        <Link href="/">
          <a className="">MLoot</a>
        </Link>
      </div>

      <div className="flex text-gray-500 text-2xl justify-end flex-row">
          {/*<Link href="/faq" >*/}
          {/*    <a className="m-2"> FAQ </a>*/}
          {/*</Link>*/}
          <Link href="/mint">
              <a className="m-2"> Mint </a>
          </Link>
      </div>
    </div>
  );
}

/**
 * Footer component
 * @returns {ReactElement} Footer
 */
function Footer(): ReactElement {
  return (
    <div className="text-center p-4">
      <p>
        This website is{" "}
        <a
          href="https://github.com/mlootproject/website"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-source
        </a>
        .
      </p>
    </div>
  );
}
