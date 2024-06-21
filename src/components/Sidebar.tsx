import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-500 text-white p-4">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="text-lg hover:underline">
          Home
        </Link>
        <Link href="/inbox" className="text-lg hover:underline">
          Messagerie
        </Link>
        <Link href="/patients" className="text-lg hover:underline">
          Patients
        </Link>
        <Link href="/calendar" className="text-lg hover:underline">
          Calendrier
        </Link>
        <Link href="/billing" className="text-lg hover:underline">
          Facturation
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
