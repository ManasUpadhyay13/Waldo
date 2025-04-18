import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <h4 className="font-['Playfair_Display'] text-2xl font-bold cursor-pointer">
        Waldo
      </h4>
    </Link>
  );
};

export default Logo;
