import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="text-lg hover:underline">
          Home
        </Link>
        <Link href="/about" className="text-lg hover:underline">
          About
        </Link>
        <Link href="/blog" className="text-lg hover:underline">
          Blog
        </Link>
        <Link href="/docs" className="text-lg hover:underline">
          Docs
        </Link>
        <Link href="/pricing" className="text-lg hover:underline">
          Pricing
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
