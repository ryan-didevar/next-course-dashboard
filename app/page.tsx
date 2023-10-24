import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/authOptions";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <h1>Hello {session?.user!.name}</h1>
      <Link className="text-sky-500" href="/users">
        Users
      </Link>
      <ProductCard />
    </main>
  );
};
export default Home;
/*
 
  <main className="relative h-screen">
      <Image
        alt="Berlin"
        className="object-cover"
        fill
        priority
        sizes="(max-width: 480px) 100vw, (max-width: 780px) 75vw, 33vw"
        src="https://bit.ly/react-cover"
        quality={100}
      />
    </main>
*/
