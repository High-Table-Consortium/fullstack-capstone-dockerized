import Link from "next/link";
import Test from "./Components/Test";
import ExplorePage from "./explore/page";

export default function Home() {
  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link href="/signin" className="text-black">
          Login
        </Link>
      </div>
    </main>
  );
}
